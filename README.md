# Content Hub

Content Hub is where creating content, managing social media, leading your team, and growing your brand becomes as easy as watching your content is for your fans.

Leave routine, chaos, and high AI service fees behind. Create more, manage with ease, and grow your brand faster.

---

## Documentation

The [`docs`](./docs) directory contains project documentation. It is the single place for team conventions, development processes, architecture notes, and other guidelines needed to work consistently on Content Hub.

### Workflows

The [`docs/workflows`](./docs/workflows) directory contains documented development and repository workflows. These documents explain how to perform recurring tasks and keep the development process consistent.

- [Git Workflow](./docs/workflows/git-workflow.md) — branch, commit, Pull Request, review, and merge conventions.
- [GitHub Repository Settings](./docs/workflows/github-repository-settings.md) — required Pull Request and merge settings for the repository.

---

## Quickstart

```bash
# Install dependencies
bun i
# Enable the Husky hooks
chmod +x .husky/commit-msg .husky/pre-commit .husky/pre-push
```