# fresh-clone-bootstrap Specification

## Purpose
TBD - created by archiving change anonymize-real-fixtures. Update Purpose after archive.
## Requirements
### Requirement: Clean-clone bootstrap
A fresh clone of the repository, containing no `.env` file, no database file and an empty data directory, SHALL install with the frozen lockfile, typecheck, pass its tests and build, using the Node version pinned in `engines`.

#### Scenario: Install, typecheck, test, build
- **WHEN** the repository is cloned into a new empty directory and `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test` and `pnpm build` are run
- **THEN** every command exits zero

#### Scenario: No local state in clone
- **WHEN** the clone is inspected before any command runs
- **THEN** it contains no `.env` file and no `*.db` or `*.duckdb*` file

### Requirement: Backend boot and sample ingestion
The built backend SHALL boot from a clean clone with `CRIPTOFOLIO_DATA_DIR` pointing to an empty directory and no environment file, SHALL report healthy, and SHALL ingest the sample CSV fixture through the ingestion endpoint.

#### Scenario: Healthy boot
- **WHEN** the backend starts against an empty data directory
- **THEN** `GET /api/health` reports ok

#### Scenario: Sample ingestion
- **WHEN** the sample CSV is mapped and posted to the ingestion endpoint
- **THEN** the response indicates success with at least one persisted row and zero rejected rows

### Requirement: Repeatable verification script
The repository SHALL provide a committed script that performs the clean-clone verification, including a leak scan of the clone with a negative control (zero findings) and a positive control (a freshly generated unmarked identifier is flagged). The script SHALL contain no data values, SHALL fail fast on an unsupported Node version, and SHALL stop the backend by PID and remove its temporary directories on exit.

#### Scenario: Script passes on a clean tree
- **WHEN** the script is run on a clean tree with the pinned Node version
- **THEN** it exits zero

#### Scenario: Wrong Node version
- **WHEN** the script is run with a Node version outside `engines`
- **THEN** it exits non-zero before cloning

#### Scenario: Positive control failure detected
- **WHEN** the scanner does not flag the generated unmarked identifier
- **THEN** the script exits non-zero

