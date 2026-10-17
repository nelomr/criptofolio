# repository-leak-guardrail Specification

## Purpose
TBD - created by archiving change anonymize-real-fixtures. Update Purpose after archive.
## Requirements
### Requirement: Leak scanner configuration
The repository SHALL provide one scanner configuration that extends the scanner's default secret rules and adds project rules for XRP, Stellar, Cardano payment and stake, Hedera account, EVM address, EVM transaction hash, bare 64-hex hash, Solana address and Solana signature identifiers. Each project rule SHALL allowlist only the synthetic marker for its shape and MUST NOT allowlist fixture directories by path.

#### Scenario: Unmarked identifier flagged
- **WHEN** a value of each covered shape without its synthetic marker is added to a tracked file, including a fixture file
- **THEN** the scanner reports a finding from the rule for that shape

#### Scenario: Marked synthetic identifier accepted
- **WHEN** a value of each covered shape carrying its synthetic marker is present
- **THEN** the scanner reports no finding for it

#### Scenario: Clean tree
- **WHEN** the scanner runs over an export of the tracked tree
- **THEN** it reports zero findings

### Requirement: Pre-commit enforcement
The pre-commit hook SHALL run the scanner over staged changes before any other check and SHALL fail the commit on any finding. If the scanner binary is not available, the hook MUST fail with installation guidance and MUST NOT skip the scan.

#### Scenario: Staged leak blocks commit
- **WHEN** a commit stages an unmarked covered identifier
- **THEN** the hook exits non-zero and the commit is rejected

#### Scenario: Missing scanner blocks commit
- **WHEN** the scanner binary is absent from `PATH`
- **THEN** the hook exits non-zero with an installation hint

### Requirement: Local build and cache output ignored
Build and cache directories that can capture local data, including `.vite/` and `.turbo/`, SHALL be ignored by version control and SHALL NOT contain tracked files.

#### Scenario: No tracked cache files
- **WHEN** the tracked file list is checked against those directories
- **THEN** no tracked file is under them

