# Git Workflow

Standardized Git and GitHub workflow for Content Hub.

[Back to README](../../README.md)

---

## Table of Contents

- [Purpose](#purpose)
- [Main Branch](#main-branch)
- [Unified Type System](#unified-type-system)
  - [Naming Rules](#naming-rules)
  - [Allowed Types](#allowed-types)
  - [Type Selection Algorithm](#type-selection-algorithm)
- [Scope](#scope)
  - [How to Determine the Scope](#how-to-determine-the-scope)
  - [Scope Rules](#scope-rules)
- [Description Rules](#description-rules)
- [Breaking Changes](#breaking-changes)
- [Commit Frequency and Size](#commit-frequency-and-size)
  - [Recommended Approach](#recommended-approach)
  - [What Should Not Be a Separate Commit](#what-should-not-be-a-separate-commit)
- [Pull Requests](#pull-requests)
  - [Pull Request Requirements](#pull-request-requirements)
  - [Pull Request Example](#pull-request-example)
- [Pull Request Verification](#pull-request-verification)
- [Merging Pull Requests](#merging-pull-requests)

---

## Purpose

This document defines a consistent workflow for branches, commits, Pull Requests, reviews, and merges in the Content Hub repository.

The workflow is based on the following principles:

- changes are made in isolated branches;
- every change is easy to understand and review;
- one Pull Request solves one logical task;
- naming and formatting are consistent across the repository;
- `main` always contains the stable state of the project;
- the repository has one source of truth for Git and GitHub conventions.

---

## Main Branch

- **Name:** `main`
- **Purpose:** Contains the stable state of the project.
- **Workflow:** Changes must be made in separate branches and merged into `main` through Pull Requests.

Direct pushes to `main` are **STRICTLY PROHIBITED**.

---

## Unified Type System

The same type and scope format is used for branches, commits, and Pull Request titles:

```text
Branch:        <type>/<scope>/<short-description>
Commit:        <type>(<scope>): <description>
Pull Request:  <type>(<scope>): <description>
```

The type of a branch and Pull Request describes the primary purpose of the task. The type of each commit describes the specific change made within that task.

Example:

```text
Branch:        feat/hub/content-editor
Commit:        feat(hub): add content editor
Commit:        feat(hub): add editor layout
Commit:        feat(hub): add editor fields
Commit:        test(hub): add editor validation tests
Commit:        fix(hub): handle empty editor content
Pull Request:  feat(hub): add content editor
```

### Naming Rules

Branch names, commit messages, and Pull Request titles must:

- be written in English;
- use lowercase letters;
- use `kebab-case` where applicable;
- be short and clear;
- contain no spaces;
- describe an action;
- avoid vague descriptions.

### Allowed Types

| Type | Purpose |
|---|---|
| `feat` | Adds a new feature or capability |
| `fix` | Fixes an existing bug or incorrect behavior |
| `docs` | Changes documentation |
| `style` | Changes formatting or code style without changing behavior |
| `refactor` | Changes internal code structure without changing behavior |
| `perf` | Improves performance |
| `test` | Adds or changes tests |
| `build` | Changes the build system, package manager, or dependencies |
| `ci` | Changes CI/CD or GitHub Actions |
| `chore` | Performs technical maintenance or changes repository configuration |
| `revert` | Reverts a previous change |

### Type Selection Algorithm

Choose the type according to the primary purpose of the change.

```text
Does the change revert previous work?
├── Yes → revert
└── No
    │
    ├── Does it add a new feature or capability?
    │   └── Yes → feat
    │
    ├── Does it fix an existing bug or incorrect behavior?
    │   └── Yes → fix
    │
    ├── Does it change documentation only?
    │   └── Yes → docs
    │
    ├── Does it improve performance?
    │   └── Yes → perf
    │
    ├── Does it add or change tests?
    │   └── Yes → test
    │
    ├── Does it change CI/CD or GitHub Actions?
    │   └── Yes → ci
    │
    ├── Does it change the build system, package manager, or dependencies?
    │   └── Yes → build
    │
    ├── Does it change formatting or code style only?
    │   └── Yes → style
    │
    ├── Does it change the internal structure without changing behavior?
    │   └── Yes → refactor
    │
    └── Otherwise → chore
```

If a change could belong to multiple types, select the type that best describes its primary purpose.

---

## Scope

The `scope` identifies the main application, package, subsystem, or repository area affected by the change.

### How to Determine the Scope

Choose the smallest meaningful project area that fully describes the change.

| Changed Area | Scope |
|---|---|
| `apps/hub` | `hub` |
| `apps/admin` | `admin` |
| `apps/api` | `api` |
| `packages/ui` | `ui` |
| `packages/utils-shared` | `utils-shared` |
| `docs/workflows` | `workflow` |
| Root-level repository files | `repo` |
| GitHub Actions and CI/CD | `github` |
| Build configuration and dependencies | `build` |

### Scope Rules

1. The scope is mandatory for every commit, Pull Request title, and branch.
2. A multi-word scope must use `kebab-case`.
3. The scope must not contain `/`.
4. The scope must represent an application, package, subsystem, or repository area.
5. Multiple scopes must not be listed.
6. Use `repo` when the change affects the repository as a whole.
7. If no suitable scope exists, use `repo` temporarily.
8. If a task affects multiple areas, choose the primary area.
9. Mention additional affected areas in the Pull Request description.

---

## Description Rules

These rules apply to:

- branch descriptions;
- commit descriptions;
- Pull Request titles.

Descriptions must:

- be written in English;
- start with a lowercase letter;
- be short and specific;
- describe an action;
- use the imperative form where possible;
- not end with a period;
- avoid unnecessary details;
- avoid vague wording.

Good examples:

```text
add content editor
handle expired session
document repository workflow
configure shared types
validate commit messages
```

Bad examples:

```text
Added some changes
Update files
Work in progress
Fix stuff
Changes
Update
```

---

## Breaking Changes

If a change breaks backward compatibility, add `!` after the type or scope:

```text
feat(api)!: change content generation contract
```

A breaking change may also be documented in the commit body:

```text
BREAKING CHANGE: generation request format has changed
```

Every breaking change must be described separately in the Pull Request.

---

## Commit Frequency and Size

Commits should be created frequently.

Each commit should represent one small task or one logically complete change.

The goal is not to create as many commits as possible. The goal is to create commits that are:

- clear;
- focused;
- logically complete;
- easy to review;
- easy to understand;
- easy to revert;
- separated by responsibility.

### Recommended Approach

Do not wait until an entire large feature is finished before creating one large commit.

Split a large task into small logical steps.

For example, adding a content editor may be split into:

```text
feat(hub): add editor layout
feat(hub): add editor fields
test(hub): add editor validation tests
fix(hub): handle empty editor content
docs(hub): document editor usage
```

Each commit should contain only the files required for its specific purpose.

### What Should Not Be a Separate Commit

Do not create separate commits for:

- every individual line change;
- temporary experiments;
- unfinished code;
- unrelated formatting changes;
- unrelated refactoring;
- files unrelated to the current task;
- changes that cannot be explained independently.

A commit should be small but logically complete.

---

## Pull Requests

### Pull Request Requirements

Every Pull Request must:

- solve one logical task;
- have a title using the Conventional Commits format;
- use a mandatory scope;
- contain a clear description;
- list the main changes;
- list the completed checks;
- contain no unrelated changes;
- be based on the latest `main`.

A Pull Request may contain several small commits:

```text
feat(hub): add editor layout
feat(hub): add editor fields
test(hub): add editor validation tests
fix(hub): handle empty editor content
```

However, the Pull Request must have one title describing its primary purpose:

```text
feat(hub): add content editor
```

After squash merging, this title becomes the final commit message in `main`.

### Pull Request Example

#### Title

```text
feat(hub): add content editor
```

#### Description

```md
## Summary

- Add the first version of the content editor
- Add title and body fields
- Add basic validation
- Add editor state management

## Motivation

Users need a dedicated workspace for creating and editing content before publication.

## Changes

- Add the content editor view
- Add reusable editor fields
- Add validation for required fields
- Add save action handling

## Testing

- [ ] Unit tests
- [ ] Type checking
- [ ] Linting
- [ ] Manual testing

## Screenshots

Not applicable.

## Checklist

- [ ] The branch is based on the latest `main`
- [ ] The changes are limited to this task
- [ ] The code follows project standards
- [ ] Documentation was updated if required
- [ ] No secrets or local files were committed
```

---

## Pull Request Verification

Before creating a Pull Request, check the repository status:

```bash
git status
```

View all changes compared with `main`:

```bash
git diff main...HEAD
```

View the commits in the current branch:

```bash
git log --oneline --decorate main..HEAD
```

Make sure that the branch contains only the changes related to the current task.

If `main` has changed since the working branch was created:

```bash
git switch main
git pull --ff-only origin main
git switch feat/hub/content-editor
git rebase main
```

After rebasing, update the remote branch:

```bash
git push --force-with-lease
```

`--force-with-lease` is safer than `--force` because Git checks whether new changes have appeared in the remote branch.

---

## Merging Pull Requests

Content Hub uses:

```text
Squash and merge
```

All commits from the working branch are combined into one commit in `main`.

For example, a working branch may contain:

```text
feat(hub): add editor layout
test(hub): add editor tests
fix(hub): handle empty content
docs(hub): document editor usage
```

The Pull Request title is:

```text
feat(hub): add content editor
```

After squash merging, `main` contains one final commit:

```text
feat(hub): add content editor
```

After the Pull Request is merged, GitHub automatically deletes the working branch.

---

[↑ Back to top](#git-workflow)