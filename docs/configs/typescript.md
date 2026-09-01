# TypeScript Configuration

[Back to README](../../README.md)

---

## Purpose

Content Hub uses shared TypeScript configuration packages so that applications,
packages, contracts, and repository tools do not need to repeat the same
compiler options in every `tsconfig.json` file.

---

## Configuration Structure

The reusable configurations are located in:

```text
configs/typescript/src
```

They are exposed through the `@configs/typescript` package:

```text
configs/typescript/package.json
```

Available entry points are:

| Entry point | Intended use |
|---|---|
| `@configs/typescript/base` | Universal starting point for repository TypeScript projects |
| `@configs/typescript/backend` | Backend code that runs in the Bun environment |
| `@configs/typescript/frontend` | Browser and SolidJS frontend code |
| `@configs/typescript/vite` | Vite configuration and related tooling files |

A workspace should extend the most specific configuration that matches its
runtime and then add only workspace-specific settings.

---

## Configuration Inheritance

The inheritance hierarchy is:

```text
base.json
├── backend.json
├── frontend.json
└── vite.json
```

`base.json` contains the common compiler behavior. The specialized
configurations inherit it and add environment-specific settings.

This means that changes to the base configuration affect every configuration
that extends it. Such changes must therefore be reviewed as repository-wide
changes.

---

## Base Configuration

Use `@configs/typescript/base` when a workspace does not require browser or
Bun-specific types, or when a workspace needs to build its own specialized
configuration on top of the shared defaults.

The base configuration provides:

- `ESNext` as the compilation target and standard library;
- bundler-oriented module resolution;
- JSON module support;
- verbatim module syntax;
- isolated module processing;
- strict type checking;
- no output generation from TypeScript;
- consistent casing checks;
- unused code checks;
- unchecked indexed access checks;
- exact optional property types;
- protection against unchecked side-effect imports;
- erasable TypeScript syntax only.

The base configuration is intentionally environment-neutral. It does not add
DOM or Bun runtime libraries. A workspace should extend a specialized config
when it needs those environment types.

Example:

```json
{
  "extends": "@configs/typescript/base"
}
```

---

## Backend Configuration

Use `@configs/typescript/backend` for backend code running in Bun.

It extends the base configuration and adds:

- Bun runtime types;
- Vitest global types for tests;
- preserved module syntax for the backend toolchain;
- full library checking by setting `skipLibCheck` to `false`.

The backend configuration does not add DOM types. This helps prevent browser
APIs from being used accidentally in server-side code.

Example:

```json
{
  "extends": "@configs/typescript/backend"
}
```

If a backend workspace uses a runtime or framework with its own required types,
those types should be added in the workspace configuration rather than copied
into the shared backend configuration without a repository-wide reason.

---

## Frontend Configuration

Use `@configs/typescript/frontend` for browser-based frontend applications.
The configuration is prepared for SolidJS.

It extends the base configuration and adds:

- DOM and iterable DOM libraries;
- Vite client types;
- Vitest global types;
- preserved JSX syntax;
- `solid-js` as the JSX import source;
- defined class-field semantics.

The `jsxImportSource` option allows SolidJS JSX files to be type-checked using
the SolidJS JSX types without repeating the setting in every frontend
workspace.

Example:

```json
{
  "extends": "@configs/typescript/frontend"
}
```

This configuration is frontend-specific because browser APIs and SolidJS JSX
semantics do not belong in the universal base configuration or in backend
projects.

---

## Vite Configuration

Use `@configs/typescript/vite` for Vite configuration files and related Vite
tooling code.

It extends the base configuration and adds Bun types. This provides the
runtime types commonly needed by Vite configuration files while avoiding the
browser JSX settings used by application code.

Example:

```json
{
  "extends": "@configs/typescript/vite"
}
```

The Vite configuration should be used for files such as `vite.config.ts`.
Application source code should use the frontend configuration instead.

---

## Choosing a Configuration

Use this decision process:

```text
Does the code run in a browser and use SolidJS JSX?
├── Yes → @configs/typescript/frontend
└── No
    │
    ├── Does it run as backend code in Bun?
    │   └── Yes → @configs/typescript/backend
    │
    ├── Is it a Vite configuration or Vite tooling file?
    │   └── Yes → @configs/typescript/vite
    │
    └── Otherwise → @configs/typescript/base
```

The most specific configuration should be selected first. Do not use the
frontend configuration merely because a workspace is built with Vite: Vite
configuration files and frontend application code have different runtime and
JSX requirements.

---

## Workspace Usage

A workspace `tsconfig.json` should normally contain only the shared extension
and workspace-specific settings, for example:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@configs/typescript/frontend",
  "include": ["src"]
}
```

Workspace-specific options may be added when required, including:

- `include` and `exclude` patterns;
- path aliases;
- project references;
- framework-specific types;
- declaration or build settings for a package with a special publishing flow.

Do not duplicate options already provided by the shared configuration unless a
workspace intentionally overrides them.

---

## Validation

Install dependencies from the repository root:

```bash
bun install
```

Run the repository type check:

```bash
bun run check:type
```

Run TypeScript directly for an individual workspace when needed:

```bash
bunx tsc --noEmit -p path/to/tsconfig.json
```

The exact command may differ when a workspace provides its own scripts. The
important requirement is that every workspace validates its effective
configuration, not only the shared configuration files themselves.

---

## Configuration Principles

The TypeScript configuration follows these principles:

1. **One shared source of truth**  
   Common compiler behavior is maintained in `@configs/typescript/base`.

2. **Explicit environment boundaries**  
   Browser, Bun, and Vite types are enabled only where they are needed.

3. **Strict defaults**  
   New workspaces inherit strict checking instead of opting into it later.

4. **Minimal workspace configuration**  
   Workspaces extend a shared configuration instead of copying compiler
   options.

5. **Intentional overrides**  
   An override should be documented when it changes the expected repository
   behavior.

6. **Repository-wide review**  
   Changes to `base.json` can affect every workspace and require broader
   validation.

---

[↑ Back to top](#typescript-configuration)
