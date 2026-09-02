# Shared Utilities: Errors

[Back to README](../../../README.md)

---

## Purpose

`@packages/shared-utils/errors` provides the shared application error class
used to represent predictable errors with a stable error kind, optional cause,
and optional context.

## Import

```ts
import { AppError } from "@packages/shared-utils/errors";
import type { AppErrorParams } from "@packages/shared-utils/errors";
```

## API snapshot

```ts
type AppErrorParams = {
  kind: string;
  message: string;
  cause?: unknown;
  context?: Record<string, unknown> | undefined;
};

class AppError extends Error {
  readonly kind: string;
  readonly context?: Record<string, unknown> | undefined;

  constructor(params: AppErrorParams);
}
```

## Error cause

Use `cause` when the application error wraps another error:

```ts
import { AppError } from "@packages/shared-utils/errors";

try {
  await loadUser();
} catch (cause) {
  throw new AppError({
    kind: "USER_LOAD_ERROR",
    message: "Unable to load user",
    cause,
  });
}
```

The original value is available through the standard `error.cause` property.

## Custom errors

`AppError` can be extended when a domain-specific error class is useful:

```ts
import { AppError } from "@packages/shared-utils/errors";

class UserNotFoundError extends AppError {}

throw new UserNotFoundError({
  kind: "USER_NOT_FOUND",
  message: "User was not found",
});
```

The error name is based on the class name. In this example,
`error.name` is `"UserNotFoundError"`.

## Guidelines

- Use `kind` values that are stable and descriptive.
- Keep `message` suitable for logs and debugging.
- Use `context` for structured diagnostic information.
- Do not place secrets, passwords, tokens, or other sensitive data in
  `context`.
- Preserve the original failure in `cause` when wrapping an unknown error.

---

[↑ Back to top](#shared-utilities-errors)