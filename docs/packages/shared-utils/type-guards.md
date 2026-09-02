# Shared Utilities: Type Guards

[Back to README](../../../README.md)

---

## Purpose

`@packages/shared-utils/type-guards` provides small, reusable runtime
predicates for narrowing values in TypeScript code.

This page is intentionally a compact API snapshot. It is useful when you need
to quickly check which guards are available without reading the implementation.

## Import

```ts
import {
  hasCharacters,
  hasTrimmedCharacters,
  isArray,
  isArrayBuffer,
  isArrayBufferView,
  isArrayOf,
  isAsyncIterable,
  isBigInt,
  isBlankString,
  isBoolean,
  isDataView,
  isDate,
  isDigit,
  isDigits,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isError,
  isEven,
  isFiniteNumber,
  isFunction,
  isInRange,
  isInteger,
  isIterable,
  isMap,
  isNaNValue,
  isNegativeNumber,
  isNull,
  isNullish,
  isNumber,
  isObject,
  isObjectLike,
  isOdd,
  isPlainObject,
  isPositiveNumber,
  isPromise,
  isPromiseLike,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isValidDate,
  isWeakMap,
  isWeakSet,
} from "@packages/shared-utils/type-guards";
```

## API snapshot

```ts
// Nullish
isUndefined(value: unknown): value is undefined;
isNull(value: unknown): value is null;
isNullish(value: unknown): value is null | undefined;

// Boolean
isBoolean(value: unknown): value is boolean;

// Symbol and bigint
isSymbol(value: unknown): value is symbol;
isBigInt(value: unknown): value is bigint;

// Numbers
isNumber(value: unknown): value is number;
isFiniteNumber(value: unknown): value is number;
isNaNValue(value: unknown): value is number; // value is NaN
isInteger(value: unknown): value is number;
isEven(value: unknown): value is number;
isOdd(value: unknown): value is number;
isPositiveNumber(value: unknown): value is number;
isNegativeNumber(value: unknown): value is number;
isInRange<T extends { value: unknown; min: number; max: number }>(
  args: T,
): args is T & { value: number }; // inclusive range

// Strings
isString(value: unknown): value is string;
isEmptyString(value: unknown): value is string;
isBlankString(value: unknown): value is string;
isDigit(value: unknown): value is string; // one ASCII digit
isDigits(value: unknown): value is string; // one or more ASCII digits
hasCharacters(value: unknown): value is string; // length > 0
hasTrimmedCharacters(value: unknown): value is string; // non-whitespace content

// Objects and functions
isObject(value: unknown): value is object;
isObjectLike(value: unknown): value is object | ((...args: never[]) => unknown);
isPlainObject(value: unknown): value is Record<PropertyKey, unknown>;
isEmptyObject(value: unknown): value is Record<PropertyKey, never>;
isFunction(value: unknown): value is (...args: never[]) => unknown;

// Arrays
isArray(value: unknown): value is unknown[];
isEmptyArray(value: unknown): value is [];
isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[];

// Built-ins
isDate(value: unknown): value is Date;
isValidDate(value: unknown): value is Date; // valid timestamp
isRegExp(value: unknown): value is RegExp;
isError(value: unknown): value is Error;
isPromise(value: unknown): value is Promise<unknown>;

// Map and set
isMap(value: unknown): value is Map<unknown, unknown>;
isWeakMap(value: unknown): value is WeakMap<object, unknown>;
isSet(value: unknown): value is Set<unknown>;
isWeakSet(value: unknown): value is WeakSet<object>;

// Array buffers
isArrayBuffer(value: unknown): value is ArrayBuffer;
isDataView(value: unknown): value is DataView;
isTypedArray(value: unknown): value is Exclude<ArrayBufferView, DataView>;
isArrayBufferView(value: unknown): value is ArrayBufferView;

// Iterables and thenables
isIterable<T = unknown>(value: unknown): value is Iterable<T>;
isAsyncIterable<T = unknown>(value: unknown): value is AsyncIterable<T>;
isPromiseLike(value: unknown): value is PromiseLike<unknown>;
```

## Notes

- `isBlankString` treats an empty or whitespace-only string as blank.
- `isDigits` accepts ASCII digits only (`0`–`9`) and requires at least one
  character.
- `isInRange` uses inclusive `min` and `max` bounds and accepts finite numbers
  only.
- `isPlainObject` accepts objects whose prototype is `Object.prototype` or
  `null`.
- `isPromiseLike` checks for a callable `then` property, so it also recognizes
  compatible thenables.

---

[↑ Back to top](#shared-utilities-type-guards)
