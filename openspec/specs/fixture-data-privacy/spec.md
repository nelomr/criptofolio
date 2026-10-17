# fixture-data-privacy Specification

## Purpose
TBD - created by archiving change anonymize-real-fixtures. Update Purpose after archive.
## Requirements
### Requirement: Synthetic marked identifiers
Every on-chain address, transaction hash and signature in a tracked test fixture SHALL be a synthetic value that cannot resolve to any account or transaction on a public ledger or explorer, and SHALL carry the marker defined for its identifier shape so that the leak scanner can distinguish it from an unmarked value.

#### Scenario: Marked identifiers per shape
- **WHEN** a tracked fixture contains an XRP, Stellar, EVM, Cardano payment, Cardano stake, Hedera or Solana identifier, or a bare 64-hex transaction hash
- **THEN** the identifier matches the allowlisted marker pattern configured for its shape in the leak scanner configuration

#### Scenario: Unmarked identifier is rejected
- **WHEN** an identifier of one of those shapes without its marker is present in any tracked fixture
- **THEN** the leak scan over the tracked tree reports a finding

### Requirement: Format fidelity of synthetic identifiers
Synthetic identifiers SHALL preserve the alphabet, length, encoding and structural shape of the identifier kind they replace, and the same logical identifier SHALL map to the same synthetic value everywhere it appears in the tracked tree.

#### Scenario: Shape preserved
- **WHEN** a fixture identifier is validated against the length and alphabet of its kind (for example 40 hex digits after `0x` for an EVM address, UUID version 4 shape for a UUID)
- **THEN** the validation passes

#### Scenario: Cross-reference equality preserved
- **WHEN** two fixture rows reference the same logical identifier (for example legs sharing a reference ID, or the same ID in a TypeScript fixture and a CSV fixture)
- **THEN** both rows contain the identical synthetic value

### Requirement: Source conventions preserved in fixtures
Each source's fixture rows SHALL keep that source's declared conventions exactly as declared in its `sourceProfile`, including fee placement, gross versus net totals, multi-leg rows, and conventions mixed inside one file, and fixtures MUST NOT be normalized toward a shape shared by all sources.

#### Scenario: Declared conventions still asserted
- **WHEN** the suites that consume the fixtures run
- **THEN** each source's fee, gross/net and multi-leg assertions pass against that source's own profile semantics

#### Scenario: Chronological ordering invariants preserved
- **WHEN** fixture rows are ordered by timestamp and `tx_id` per asset
- **THEN** the resulting per-asset order and each account's custody order are the same as the order the fixtures declare, and no internal transfer pair becomes a taxable disposal

### Requirement: No local paths or provenance claims
No tracked file SHALL contain an absolute local filesystem path of a developer machine, and no tracked file SHALL state or imply that fixture rows or amounts originate from any person's exports or activity. Fixture headers SHALL state only the intent of the fixture and the requirement to preserve each source's layout and conventions.

#### Scenario: No absolute user path
- **WHEN** the tracked tree is searched for absolute home-directory paths
- **THEN** no match is found

#### Scenario: No provenance wording
- **WHEN** the tracked tree is searched for wording that claims fixture data is personal, real or taken verbatim from an account
- **THEN** every hit is a generic statement about exchange export formats that makes no claim about the fixtures

#### Scenario: Fixture naming
- **WHEN** fixture files and exported fixture constants are listed
- **THEN** none has a name that claims the rows are real data

### Requirement: Production source comments carry no fixture values
Comments in production source files SHALL NOT quote identifier, datetime, quantity or amount values taken from fixtures; they SHALL explain only the non-obvious reason behind the code.

#### Scenario: Production comments neutral
- **WHEN** the comments in production source files are read
- **THEN** they contain no fixture identifier, datetime or amount literal, and the production-source edits made to remove fixture values are comment-only with behavior unchanged

### Requirement: Consuming suites are non-vacuous
Every suite that consumes the fixtures SHALL fail when the production behavior it targets is deliberately broken, and its assertions SHALL be written against the fixture's literal values, not against snapshots of production output.

#### Scenario: Deliberate break turns the targeted assertion red
- **WHEN** a production defect covered by a consuming suite is introduced on a line the suite reaches
- **THEN** the named assertion of that suite fails for the intended reason, and passes again once the defect is removed

### Requirement: Archived change documents are clean
Documents under `openspec/changes/archive/` SHALL satisfy the same identifier, path and provenance requirements as the tracked tree.

#### Scenario: Archive sweep
- **WHEN** the archived change directory is searched with the same checks applied to the tracked tree
- **THEN** no match is found

