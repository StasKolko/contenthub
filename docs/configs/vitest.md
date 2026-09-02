# Vitest Configuration

[Back to README](../../README.md)

---

## Purpose

Content Hub uses the shared `@configs/vitest` package to keep Vitest setup,
test environments, and coverage rules consistent across workspaces.

The configuration is intentionally strict. Coverage uses the V8 provider and
requires 100% statements, branches, functions, and lines for included source
files.

## Configuration Structure

The reusable configuration is located in:

```text
configs/vitest/src/create-vitest-config.ts
```

It exports environment-specific factories:

| Factory | Environment |
|---|---|
| `createBackendConfig` | `node` |
| `createEdgeConfig` | `edge-runtime` |
| `createHappyDomConfig` | `happy-dom` |
| `createFrontendConfig` | `happy-dom` with SolidJS |

Use the factory that matches the runtime of the code under test.

```ts
import { createEdgeConfig } from "@configs/vitest";

export default createEdgeConfig();
```

## Overrides

Factories accept optional Vite/Vitest configuration overrides. Use them when
a workspace needs to extend the shared setup with workspace-specific plugins,
options, or test behavior.

```ts
import { createFrontendConfig } from "@configs/vitest";

export default createFrontendConfig({
  test: {
    setupFiles: ["./test-setup.ts"],
  },
});
```

Overrides are merged into the shared configuration; they should remain limited
to settings that are genuinely specific to the workspace.

## Coverage Rules

The shared configuration:

- uses the V8 coverage provider;
- keeps coverage disabled for ordinary test runs;
- enables coverage through `vitest run --coverage`;
- requires 100% statements, branches, functions, and lines;
- checks coverage per file;
- excludes non-test helper files inside `_test` and `_tests` directories;
- excludes test files themselves;
- excludes declaration and type-only files;
- excludes entry points such as `index.ts`, `run.ts`, and `init.ts`.

The default coverage include pattern is:

```text
src/**/*.{ts,tsx}
```

## Running Tests

From the repository root:

```bash
bun run test:run
bun run test:coverage
```

A workspace may use the shared factory and add only the configuration needed
for its own runtime or test setup.

---

[↑ Back to top](#vitest-configuration)
