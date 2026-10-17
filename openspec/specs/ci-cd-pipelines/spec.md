# Ci Cd Pipelines Specification

## Purpose

CI path adaptation for the monorepo layout, and the CD deployment step.
## Requirements
### Requirement: CI Pipeline Path Adaptation
The continuous integration pipeline SHALL target the new `apps/frontend/` directory for all build, lint, and test steps.

#### Scenario: CI test execution
- **WHEN** the CI pipeline triggers on a pull request
- **THEN** it navigates to `apps/frontend/` to run `vitest` and `eslint`/`vue-tsc` checks successfully.

### Requirement: CD Pipeline Deployment
The continuous deployment pipeline SHALL build the frontend application from its new location and deploy the resulting artifacts.

#### Scenario: Production build and deploy
- **WHEN** a release is triggered
- **THEN** the pipeline runs `pnpm build` within `apps/frontend/` and deploys the generated `dist/` directory correctly.

### Requirement: Required leak-scan job
The CI pipeline SHALL include a `leak-scan` job that runs the scanner with the repository's scanner configuration over the full git history, and SHALL fail the pipeline on any finding. The scanner binary MUST be pinned to an exact version and verified against a pinned checksum before it runs, and the job SHALL be configured as a required check for merging.

#### Scenario: Leak in a pull request
- **WHEN** a pull request introduces an unmarked covered identifier, even if a later commit in the same pull request removes it
- **THEN** the `leak-scan` job fails

#### Scenario: Hook bypassed
- **WHEN** a commit reaches CI without having run the pre-commit hook
- **THEN** the `leak-scan` job still detects any leak it contains

#### Scenario: Checksum mismatch
- **WHEN** the downloaded scanner binary does not match the pinned checksum
- **THEN** the job fails before the scanner runs

#### Scenario: Clean pipeline
- **WHEN** no finding exists in the history
- **THEN** the `leak-scan` job passes alongside the existing quality job

