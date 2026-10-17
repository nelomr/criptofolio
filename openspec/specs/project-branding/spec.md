# Project Branding Specification

## Purpose

Project identity: the name, copyright-free thematic assets, multi-language documentation, and positioning.
## Requirements
### Requirement: Thematic Copyright-Free Assets
The application SHALL include a custom favicon and application logo based on the provided `favicon.png` and `favicon.svg` assets.

#### Scenario: Tab Favicon
- **WHEN** user loads the application in a browser
- **THEN** they MUST see the new `favicon.png` in the browser tab

#### Scenario: Application Logo
- **WHEN** user views the application UI
- **THEN** they MUST see the geometric dragon mark from `favicon.svg` or `favicon.png` displayed in the header/branding areas without drop shadows or legacy wrappers

### Requirement: Multi-language Documentation
The repository SHALL provide documentation in both English and Spanish, with English as the primary default.

#### Scenario: English Default
- **WHEN** a user visits the repository root
- **THEN** they MUST see the `README.md` written in English
- **AND** a prominent navigation link MUST point to the Spanish version

#### Scenario: Spanish Version
- **WHEN** a user navigates to `README.es.md`
- **THEN** they MUST see the documentation translated to Spanish
- **AND** a prominent navigation link MUST point back to the English version

### Requirement: Marketing Positioning
The English README SHALL highlight the robust FIFO data presentation system and its architecture ready for AI Agent integration.

#### Scenario: Feature Discovery
- **WHEN** a developer reads the README features section
- **THEN** they MUST find clear references to the FIFO data logic and Mastra/Vercel AI SDK integration readiness

### Requirement: Project Identity
The repository and application SHALL use "Criptofolio" (display) and "criptofolio" (package) as its primary identifier, and every workspace package SHALL be published under the `@criptofolio/` scope.

#### Scenario: Application Loading
- **WHEN** user loads the application in a browser
- **THEN** the browser tab title MUST display "Criptofolio"

#### Scenario: Workspace package scope
- **WHEN** the `name` field of every workspace `package.json` is read
- **THEN** each internal package name MUST start with `@criptofolio/`
- **AND** every import, path alias, project reference and workspace filter that names an internal package MUST use that scope

### Requirement: Brand-derived runtime identifiers
Every runtime identifier derived from the product name SHALL use the current name: the data-directory environment variable `CRIPTOFOLIO_DATA_DIR`, the ledger database file `criptofolio_ledger.db`, the vault database file `criptofolio.db`, the OS keychain service `criptofolio`, the vault verifier value `criptofolio_vault_ok`, the log redaction censor `[CONFIDENTIAL_CRIPTOFOLIO]`, and tax report download file names. The analytical database file name, which carries no brand, SHALL remain `fiscal.duckdb`.

#### Scenario: Data directory from the new variable
- **WHEN** `CRIPTOFOLIO_DATA_DIR` is set to an empty directory and the backend starts
- **THEN** `criptofolio_ledger.db` and `criptofolio.db` are created in that directory

#### Scenario: Default database file names
- **WHEN** no data-directory override and no per-database path override is set
- **THEN** the ledger path ends in `criptofolio_ledger.db`, the vault path ends in `criptofolio.db`, and the analytical path ends in `fiscal.duckdb`

#### Scenario: Tax report download name
- **WHEN** a tax report is downloaded
- **THEN** its file name starts with `criptofolio-`

