# Scripts Utilities: Project Root

[Back to README](../../../README.md)

---

## Import

```ts
import {
  findProjectRoot,
  ProjectRootNotFoundError,
} from "@packages/scripts-utils/project-root";
```

## API

```ts
findProjectRoot(): string;
```

Returns the repository root directory by searching for `bun.lock` from the
current module directory upwards.

Throws `ProjectRootNotFoundError` when the project root cannot be found.

---

[↑ Back to top](#scripts-utilities-project-root)