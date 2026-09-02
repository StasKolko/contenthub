// ╔════════════════════════════════════════════════════════════════╗
// ║                           TYPES                               ║
// ╚════════════════════════════════════════════════════════════════╝

type AnyFunction = (...args: never[]) => unknown;
type TypedArray = Exclude<ArrayBufferView, DataView>;

// ╔════════════════════════════════════════════════════════════════╗
// ║                        OBJECT BASICS                           ║
// ╚════════════════════════════════════════════════════════════════╝

function isObject(value: unknown): value is object {
  return value !== null && typeof value === "object";
}

function isObjectLike(value: unknown): value is object | AnyFunction {
  return (
    value !== null && (typeof value === "object" || typeof value === "function")
  );
}

function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (!isObject(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function isEmptyObject(value: unknown): value is Record<PropertyKey, never> {
  return isPlainObject(value) && Reflect.ownKeys(value).length === 0;
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                           FUNCTION                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                            ARRAY                               ║
// ╚════════════════════════════════════════════════════════════════╝

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isEmptyArray(value: unknown): value is [] {
  return isArray(value) && value.length === 0;
}

function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T,
): value is T[] {
  return isArray(value) && value.every(guard);
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                          BUILT-INS                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === "[object Date]";
}

function isValidDate(value: unknown): value is Date {
  return isDate(value) && !Number.isNaN(value.getTime());
}

function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}

function isError(value: unknown): value is Error {
  return Object.prototype.toString.call(value) === "[object Error]";
}

function isPromise(value: unknown): value is Promise<unknown> {
  return Object.prototype.toString.call(value) === "[object Promise]";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             MAP                                ║
// ╚════════════════════════════════════════════════════════════════╝

function isMap(value: unknown): value is Map<unknown, unknown> {
  return value instanceof Map;
}

function isWeakMap(value: unknown): value is WeakMap<object, unknown> {
  return value instanceof WeakMap;
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             SET                                ║
// ╚════════════════════════════════════════════════════════════════╝

function isSet(value: unknown): value is Set<unknown> {
  return value instanceof Set;
}

function isWeakSet(value: unknown): value is WeakSet<object> {
  return value instanceof WeakSet;
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                         ARRAY BUFFER                           ║
// ╚════════════════════════════════════════════════════════════════╝

function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return value instanceof ArrayBuffer;
}

function isDataView(value: unknown): value is DataView {
  return value instanceof DataView;
}

function isTypedArray(value: unknown): value is TypedArray {
  return ArrayBuffer.isView(value) && !isDataView(value);
}

function isArrayBufferView(value: unknown): value is ArrayBufferView {
  return ArrayBuffer.isView(value);
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                           ITERABLE                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isIterable<T = unknown>(value: unknown): value is Iterable<T> {
  if (!isObjectLike(value)) {
    return false;
  }

  const candidate = value as {
    [Symbol.iterator]?: unknown;
  };

  return typeof candidate[Symbol.iterator] === "function";
}

function isAsyncIterable<T = unknown>(
  value: unknown,
): value is AsyncIterable<T> {
  if (!isObjectLike(value)) {
    return false;
  }

  const candidate = value as {
    [Symbol.asyncIterator]?: unknown;
  };

  return typeof candidate[Symbol.asyncIterator] === "function";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                         THENABLE                              ║
// ╚════════════════════════════════════════════════════════════════╝

function isPromiseLike(value: unknown): value is PromiseLike<unknown> {
  if (!isObjectLike(value)) {
    return false;
  }

  const candidate = value as {
    then?: unknown;
  };

  return typeof candidate.then === "function";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                           EXPORTS                              ║
// ╚════════════════════════════════════════════════════════════════╝

export {
  isArray,
  isArrayBuffer,
  isArrayBufferView,
  isArrayOf,
  isAsyncIterable,
  isDataView,
  isDate,
  isEmptyArray,
  isEmptyObject,
  isError,
  isFunction,
  isIterable,
  isMap,
  isObject,
  isObjectLike,
  isPlainObject,
  isPromise,
  isPromiseLike,
  isRegExp,
  isSet,
  isTypedArray,
  isValidDate,
  isWeakMap,
  isWeakSet,
};
