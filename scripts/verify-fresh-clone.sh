#!/usr/bin/env bash
# Verifies that the committed tree bootstraps from nothing: clone, install, typecheck, test, build,
# leak scan, boot against an empty data directory, and ingest a sample CSV.
#
# It clones (rather than copies) so ignored files, local databases and env files are absent by
# construction, which means it exercises committed state only. Run it before publishing and before
# each release; it needs Node at or above the version pinned in package.json `engines`, and gitleaks.
#
# Usage: scripts/verify-fresh-clone.sh [path-or-url-of-repository-to-clone]

set -euo pipefail

SOURCE_REPO="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
HEALTH_TIMEOUT_SECONDS=90

log() { printf '\n==> %s\n' "$*"; }
die() { printf 'FAIL: %s\n' "$*" >&2; exit 1; }

REQUIRED_NODE="$(node -p "require('${SOURCE_REPO}/package.json').engines.node.replace(/^[^0-9]*/, '')" 2>/dev/null)" \
  || die "could not read engines.node from ${SOURCE_REPO}/package.json"
CURRENT_NODE="$(node -v | sed 's/^v//')"
if [ "$(printf '%s\n%s\n' "$REQUIRED_NODE" "$CURRENT_NODE" | sort -V | head -n1)" != "$REQUIRED_NODE" ]; then
  die "Node ${CURRENT_NODE} is older than the pinned ${REQUIRED_NODE}; put the pinned Node first on PATH"
fi

command -v gitleaks >/dev/null 2>&1 || die "gitleaks is required (see README prerequisites)"
command -v curl >/dev/null 2>&1 || die "curl is required"

WORK_DIR="$(mktemp -d)"
DATA_DIR="$(mktemp -d)"
BACKEND_PID=""

cleanup() {
  local status=$?
  if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
    kill "$BACKEND_PID" 2>/dev/null || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
  rm -rf "$WORK_DIR" "$DATA_DIR"
  if [ "$status" -eq 0 ]; then echo "PASS: fresh-clone verification succeeded"; else echo "FAIL: exit status $status" >&2; fi
  exit "$status"
}
trap cleanup EXIT

CLONE="$WORK_DIR/clone"

log "Cloning ${SOURCE_REPO}"
git clone --quiet "$SOURCE_REPO" "$CLONE"

log "Checking the clone carries no env file or database"
STRAY="$(find "$CLONE" -path "$CLONE/.git" -prune -o \( -name '.env' -o -name '.env.*' -o -name '*.db' -o -name '*.duckdb*' \) -type f ! -name '*.example' -print)"
[ -z "$STRAY" ] || die "unexpected local state in a fresh clone: ${STRAY}"

log "Leak scan of the clone (negative control: no findings)"
gitleaks dir "$CLONE" --config "$CLONE/.gitleaks.toml" --no-banner --redact \
  || die "the clone has leak findings"

log "Leak scan positive control: a freshly generated unmarked address must be flagged"
PROBE="$CLONE/leak-probe.txt"
node -e "
const { randomInt } = require('node:crypto');
const hex = '0123456789abcdef';
let v = '0x';
for (let i = 0; i < 40; i++) v += hex[randomInt(hex.length)];
require('node:fs').writeFileSync(process.argv[1], 'address: ' + v + '\n');
" "$PROBE"
if gitleaks dir "$CLONE" --config "$CLONE/.gitleaks.toml" --no-banner --redact >/dev/null 2>&1; then
  die "positive control failed: an unmarked address was not flagged, so the scanner proves nothing"
fi
rm -f "$PROBE"

cd "$CLONE"

log "Installing, typechecking, testing and building"
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build

log "Booting the backend on an empty data directory"
PORT="$(node -e "
const s = require('node:net').createServer();
s.listen(0, '127.0.0.1', () => { console.log(s.address().port); s.close(); });
")"
# The backend's `build` script only typechecks (tsconfig.base.json sets noEmit), so there is no dist to
# run; it is started from source the way `dev` does, minus the env file.
env CRIPTOFOLIO_DATA_DIR="$DATA_DIR" PORT="$PORT" \
  node --import tsx apps/backend/src/index.ts >"$WORK_DIR/backend.log" 2>&1 &
BACKEND_PID=$!

DEADLINE=$(( $(date +%s) + HEALTH_TIMEOUT_SECONDS ))
until curl -fsS "http://127.0.0.1:${PORT}/api/health" >/dev/null 2>&1; do
  kill -0 "$BACKEND_PID" 2>/dev/null || { cat "$WORK_DIR/backend.log" >&2; die "backend exited before reporting healthy"; }
  [ "$(date +%s)" -lt "$DEADLINE" ] || { cat "$WORK_DIR/backend.log" >&2; die "backend not healthy within ${HEALTH_TIMEOUT_SECONDS}s"; }
  sleep 1
done

log "Checking the empty data directory holds exactly the expected database files"
for required in criptofolio_ledger.db criptofolio.db; do
  [ -f "$DATA_DIR/$required" ] || die "$required was not created in the data directory"
done
for entry in $(ls -A "$DATA_DIR"); do
  case "$entry" in
    criptofolio_ledger.db|criptofolio_ledger.db-shm|criptofolio_ledger.db-wal|criptofolio.db|fiscal.duckdb|fiscal.duckdb.wal|data) ;;
    *) die "unexpected entry in the data directory: ${entry}" ;;
  esac
done

log "Ingesting the sample CSV through the same pipeline as the end-to-end suite"
BODY="$WORK_DIR/ingest-body.json"
HELPER="$CLONE/apps/backend/.verify-ingest.mts"
cat >"$HELPER" <<'EOF'
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import Papa from 'papaparse';
import {
  detectSourceProfile,
  guessColumnMapping,
  mapToEntity,
  normalizeTransactionDirection,
} from '@criptofolio/core-domain';

const [csvPath, outPath] = process.argv.slice(2);
const parsed = Papa.parse(fs.readFileSync(csvPath, 'utf-8'), { header: false, skipEmptyLines: 'greedy' });
const rawRows = parsed.data as string[][];
const headers = rawRows[0];
const detection = detectSourceProfile([...headers]);
if (detection.kind !== 'RESOLVED') throw new Error(`profile not resolved: ${detection.kind}`);
const mapping = guessColumnMapping([...headers]);
const accountId = randomUUID();

const rows = rawRows.slice(1).map((cells) => {
  const record: Record<string, unknown> = {};
  headers.forEach((h, i) => { record[h] = cells[i]; });
  const mapped = mapToEntity({ ...record }, mapping, 0, 'SPOT').mappedData;
  const directed = normalizeTransactionDirection(
    { ...mapped, tx_type: mapped.tx_type ?? null, metadata: mapped.metadata ?? {} },
    'UTC',
  );
  return { ...directed, account_id: accountId };
});

fs.writeFileSync(
  outPath,
  JSON.stringify({ rows, market: 'spot', sourceProfileId: detection.profileId, timezone: 'UTC' }),
);
EOF
"$CLONE/node_modules/.bin/tsx" "$HELPER" "$CLONE/packages/database/tests/fixtures/kraken_spot_and_earn.csv" "$BODY"
rm -f "$HELPER"

RESPONSE="$(curl -fsS -X POST "http://127.0.0.1:${PORT}/api/ingestion/transactions" \
  -H 'Content-Type: application/json' --data-binary @"$BODY")" \
  || { cat "$WORK_DIR/backend.log" >&2; die "ingestion request failed"; }

node -e "
const r = JSON.parse(process.argv[1]);
if (r.status !== 'success') { console.error('status:', r.status); process.exit(1); }
if (!(r.processedCount > 0)) { console.error('no rows persisted'); process.exit(1); }
if (Array.isArray(r.rejected) && r.rejected.length > 0) { console.error('rejected rows:', r.rejected.length); process.exit(1); }
console.log('ingested', r.processedCount, 'rows, none rejected');
" "$RESPONSE" || die "ingestion outcome was not a clean success: ${RESPONSE}"
