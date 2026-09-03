# Frontend Utilities: CSS

[Back to README](../../../README.md)

---

## Import

```ts
import { cn } from "@packages/frontend-utils/css";
```

## Usage

`cn` combines class names and passes the resulting string to
`tailwind-merge`.

```ts
const className = cn(
  "px-2 py-1",
  "text-sm",
  { "font-bold": isActive },
  ["rounded", isDisabled && "opacity-50"],
);
```

## Arguments

Supported values:

- strings;
- numbers;
- booleans;
- `null`;
- `undefined`;
- nested arrays;
- objects with class names as keys.

Falsy object values are ignored:

```ts
cn({
  "font-bold": true,
  hidden: false,
});
```

The result is:

```text
font-bold
```

`tailwind-merge` resolves conflicting Tailwind classes in the final result.

---

[↑ Back to top](#frontend-utilities-css)