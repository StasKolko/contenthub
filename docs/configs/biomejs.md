# Biome Configuration

[Back to README](../../README.md)

---

## Purpose

Content Hub uses [Biome](https://biomejs.dev/) as the central tool for code formatting, linting, and lightweight source assistance.

The configuration is intentionally strict. Its purpose is to:

- keep the codebase consistent;
- detect common correctness and security issues early;
- enforce accessibility and maintainability standards;
- reduce subjective code-style decisions;
- provide one shared configuration for the entire monorepo.

---

## Configuration Structure

Biome normally expects a single configuration file in the repository root:

```text
biome.json
```

The repository configuration is split into smaller, focused files located in:

```text
configs/biomejs/src
```

The reusable configuration is published as the workspace package:

```text
@configs/biomejs
```

The root `biome.json` imports these configuration modules through the package exports.

This structure keeps the configuration modular and makes it easier to maintain separate concerns such as:

- formatter settings;
- JavaScript and TypeScript settings;
- CSS, HTML, JSON, GraphQL, and Grit settings;
- accessibility, correctness, security, style, and performance rules;
- repository file handling and overrides.

The root `biome.json` remains the single entry point used by Biome.

---

## Running Biome

Install dependencies from the repository root:

```bash
bun install
```

Run the configured check with automatic fixes:

```bash
bun run check:biome:fix
```

This command runs:

```bash
biome check --write
```

It formats files and applies safe automatic lint fixes.

Biome is also used by the repository Git hooks. The hooks are intentionally kept as integration points for formatting, linting, type checking, testing, and build validation.

---

## Configuration Principles

The configuration follows several principles:

1. **One source of truth**  
   All repository-wide Biome settings are connected to the root `biome.json`.

2. **Modular configuration**  
   Rules are split by responsibility instead of being stored in one large file.

3. **Strict defaults**  
   Most correctness, security, accessibility, and style rules are enabled as errors.

4. **Explicit exceptions**  
   Framework-specific or intentionally unsupported rules are disabled explicitly and documented where necessary.

5. **Repository-wide consistency**  
   The same standards apply across applications, packages, contracts, scripts, and configuration files.

6. **Safe automation**  
   Biome may apply safe formatting and lint fixes, but every resulting change must still be reviewed.

---

## Version Policy

The Biome version is intentionally fixed in the root `package.json`.

Biome updates must not be performed casually. A version update can change:

- formatting output;
- linting behavior;
- rule names or defaults;
- parser behavior;
- supported configuration options;
- generated changes across the whole repository.

Before updating Biome:

1. Read the complete release notes and migration information.
2. Review all changes between the current and proposed versions.
3. Install the new version in an isolated branch.
4. Run formatting, linting, type checking, tests, and builds.
5. Review the complete diff produced by the update.
6. Update the lockfile only after the new version has been validated.

A Biome update should be treated as a repository-wide change, not as a routine dependency update.