# Content Hub

Content Hub is where creating content, managing social media, leading your team, and growing your brand becomes as easy as watching your content is for your fans.

Leave routine, chaos, and high AI service fees behind. Create more, manage with ease, and grow your brand faster.

---

## Navigation

- [Project Structure](#project-structure)
- [Documentation](#documentation)
  - [Workflows](#workflows)
    - [Git Workflow](./docs/workflows/git-workflow.md)
    - [GitHub Repository Settings](./docs/workflows/github-repository-settings.md)
  - [Configuration](#configuration)
    - [Biome Configuration](./docs/configs/biomejs.md)
    - [TypeScript Configuration](./docs/configs/typescript.md)
    - [Vitest Configuration](./docs/configs/vitest.md)
  - [Packages](#packages)
    - [Frontend Utilities](#frontend-utilities)
      - [CSS](./docs/packages/frontend-utils/css.md)
    - [Scripts Utilities](#scripts-utilities)
      - [Project Root](./docs/packages/scripts-utils/project-root.md)
    - [Shared Utilities](#shared-utilities)
      - [Errors](./docs/packages/shared-utils/errors.md)
      - [Type Guards](./docs/packages/shared-utils/type-guards.md)
- [Quickstart](#quickstart)

---

## Project Structure

Content Hub is organized as a monorepo:

```text
apps/       Applications and user-facing services
configs/    Shared configuration packages
contracts/  Shared API and data contracts
docs/       Project documentation
packages/   Reusable application packages
scripts/    Development and repository scripts
```

The repository uses `Bun` workspaces to manage applications, packages, configurations, contracts, and scripts from a single root.

---

## Documentation

The [`docs`](./docs) directory contains project documentation. It is the single place for team conventions, development processes, architecture notes, and other guidelines needed to work consistently on Content Hub.

### Workflows

The [`docs/workflows`](./docs/workflows) directory contains documented development and repository workflows. These documents explain how to perform recurring tasks and keep the development process consistent.

- [Git Workflow](./docs/workflows/git-workflow.md) — branch, commit, Pull Request, review, and merge conventions.
- [GitHub Repository Settings](./docs/workflows/github-repository-settings.md) — required Pull Request and merge settings for the repository.


### Configuration

The [`docs/configs`](./docs/configs) directory contains documentation for shared repository configuration.

- [Biome Configuration](./docs/configs/biomejs.md) — formatting, linting, configuration structure, usage, and upgrade policy.
- [TypeScript Configuration](./docs/configs/typescript.md) — shared compiler configurations for base, backend, frontend, and Vite workspaces.
- [Vitest Configuration](./docs/configs/vitest.md) — shared test environments, configuration overrides, and strict coverage rules.

### Packages

The docs/packages directory contains compact API references for reusable packages.

#### Frontend Utilities

The [packages/frontend-utils](./packages/frontend-utils) package contains
small reusable utilities for frontend applications.

- [CSS](./docs/packages/frontend-utils/css.md) — class name composition and
  Tailwind class merging.

#### Scripts Utilities

The [packages/scripts-utils](./packages/scripts-utils) package contains
reusable utilities for development and repository scripts.

- [Project Root](./docs/packages/scripts-utils/project-root.md) — finding the
  repository root directory.

#### Shared Utilities

The [packages/shared-utils](./packages/shared-utils) package contains reusable utility functions shared across the repository.

- [Errors](./docs/packages/shared-utils/errors.md) — shared application
  errors, error causes, and structured error context.
- [Type Guards](./docs/packages/shared-utils/type-guards.md) — available runtime predicates and their TypeScript signatures.

---

## Quickstart

```bash
# Install dependencies
bun i
# Enable the Husky hooks
chmod +x .husky/commit-msg .husky/pre-commit .husky/pre-push
```

---

[↑ Back to top](#content-hub)