# GitHub Repository Settings

This document defines the GitHub repository settings. The settings are configured in the repository under **Settings → General → Pull Requests**.

The goal is to make the merge process predictable, preserve a clean history, and remove temporary branches after their Pull Requests are merged.

[Back to README](../../README.md)

---

## Required Settings

| Setting | Required state |
|---|---|
| Allow merge commits | Disabled |
| Allow squash merging | Enabled |
| Default commit message | Pull request title |
| Allow rebase merging | Disabled |
| Always suggest updating pull request branches | Disabled |
| Allow auto-merge | Disabled |
| Automatically delete head branches | Enabled |

---

## Why Each Setting Is Required

### Allow merge commits — disabled

Merge commits are disabled to prevent unnecessary merge commits in `main`. This keeps the history linear and easier to read.

### Allow squash merging — enabled

Squash merging combines all Pull Request commits into one commit in `main`. This matches the Git workflow and ensures that the final commit has one clear message describing the logical task.

### Default commit message — Pull request title

The Pull Request title is used as the default squash commit message. Because titles follow the required Conventional Commits format, the resulting commit in `main` also follows the repository standard.

Example:

```text
feat(hub): add content editor
```

### Allow rebase merging — disabled

Rebase merging is disabled because Content Hub uses squash and merge as the single standard merge strategy. This avoids having multiple merge strategies and keeps the history uniform.

### Always suggest updating pull request branches — disabled

This option is disabled because updating a branch should be an intentional developer action. Before merging, the author or reviewer should explicitly update the branch from the latest `main` when necessary and verify the resulting changes.

### Allow auto-merge — disabled

Auto-merge is disabled so that Pull Requests are merged deliberately by a team member after review and required checks have been completed. This prevents a Pull Request from being merged without a final confirmation.

### Automatically delete head branches — enabled

This option automatically deletes the working branch after the Pull Request is merged. It prevents obsolete branches from accumulating while keeping the merged changes available in the repository history.

---

## Relation to the Git Workflow

These settings support the rules documented in the [Git Workflow](./git-workflow.md):

- changes are merged into `main` through Pull Requests;
- Pull Requests use one logical task and one standardized title;
- squash and merge is the only permitted merge strategy;
- merged working branches are deleted automatically.

Repository administrators should verify these settings after repository creation and whenever repository permissions or merge policies change.
