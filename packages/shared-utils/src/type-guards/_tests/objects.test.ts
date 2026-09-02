import { describe, expect, it } from "vitest";

import {
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
} from "../_objects";
import { runCases, withExpected } from "./helpers";

describe("object predicates", () => {
  describe("isObject", () => {
    runCases(
      withExpected([
        "empty object",
        "object",
        "array",
        "non-empty array",
        "Date",
        "RegExp",
        "String object",
        "Number object",
        "valid Date",
        "invalid Date",
        "Error",
        "Promise",
        "Map",
        "WeakMap",
        "Set",
        "WeakSet",
        "ArrayBuffer",
        "DataView",
        "TypedArray",
        "null prototype object",
        "class instance",
        "iterable object",
        "async iterable object",
        "thenable object",
      ]),
      isObject,
    );
  });

  describe("isObjectLike", () => {
    runCases(
      withExpected([
        "empty object",
        "object",
        "array",
        "non-empty array",
        "function",
        "Date",
        "RegExp",
        "String object",
        "Number object",
        "valid Date",
        "invalid Date",
        "Error",
        "Promise",
        "Map",
        "WeakMap",
        "Set",
        "WeakSet",
        "ArrayBuffer",
        "DataView",
        "TypedArray",
        "null prototype object",
        "class instance",
        "iterable object",
        "async iterable object",
        "thenable object",
      ]),
      isObjectLike,
    );
  });

  describe("isFunction", () => {
    runCases(withExpected(["function"]), isFunction);
  });

  describe("isPlainObject", () => {
    runCases(
      withExpected([
        "empty object",
        "object",
        "null prototype object",
        "iterable object",
        "async iterable object",
        "thenable object",
      ]),
      isPlainObject,
    );
  });

  describe("isEmptyObject", () => {
    runCases(
      withExpected(["empty object", "null prototype object"]),
      isEmptyObject,
    );
  });
});

describe("array predicates", () => {
  describe("isArray", () => {
    runCases(withExpected(["array", "non-empty array"]), isArray);
  });

  describe("isEmptyArray", () => {
    runCases(withExpected(["array"]), isEmptyArray);
  });

  describe("isArrayOf", () => {
    it("returns true when every array item passes the guard", () => {
      expect(
        isArrayOf(
          [1, 2, 3],
          (value): value is number => typeof value === "number",
        ),
      ).toBe(true);
    });

    it("returns false when at least one item does not pass the guard", () => {
      expect(
        isArrayOf(
          [1, "2", 3],
          (value): value is number => typeof value === "number",
        ),
      ).toBe(false);
    });

    it("returns false for a non-array value", () => {
      expect(
        isArrayOf("123", (value): value is number => typeof value === "number"),
      ).toBe(false);
    });

    it("supports object guards", () => {
      expect(
        isArrayOf(
          [{ value: 1 }, { value: 2 }],
          (value): value is { value: number } =>
            isPlainObject(value) && "value" in value,
        ),
      ).toBe(true);
    });

    it("returns true for an empty array", () => {
      expect(
        isArrayOf([], (value): value is number => typeof value === "number"),
      ).toBe(true);
    });
  });
});

describe("built-in predicates", () => {
  describe("isDate", () => {
    runCases(withExpected(["Date", "valid Date", "invalid Date"]), isDate);
  });

  describe("isValidDate", () => {
    runCases(withExpected(["Date", "valid Date"]), isValidDate);
  });

  describe("isRegExp", () => {
    runCases(withExpected(["RegExp"]), isRegExp);
  });

  describe("isError", () => {
    runCases(withExpected(["Error"]), isError);
  });

  describe("isPromise", () => {
    runCases(withExpected(["Promise"]), isPromise);
  });
});

describe("map predicates", () => {
  describe("isMap", () => {
    runCases(withExpected(["Map"]), isMap);
  });

  describe("isWeakMap", () => {
    runCases(withExpected(["WeakMap"]), isWeakMap);
  });
});

describe("set predicates", () => {
  describe("isSet", () => {
    runCases(withExpected(["Set"]), isSet);
  });

  describe("isWeakSet", () => {
    runCases(withExpected(["WeakSet"]), isWeakSet);
  });
});

describe("array buffer predicates", () => {
  describe("isArrayBuffer", () => {
    runCases(withExpected(["ArrayBuffer"]), isArrayBuffer);
  });

  describe("isDataView", () => {
    runCases(withExpected(["DataView"]), isDataView);
  });

  describe("isTypedArray", () => {
    runCases(withExpected(["TypedArray"]), isTypedArray);
  });

  describe("isArrayBufferView", () => {
    runCases(withExpected(["DataView", "TypedArray"]), isArrayBufferView);
  });
});

describe("iterable predicates", () => {
  describe("isIterable", () => {
    runCases(
      withExpected([
        "array",
        "non-empty array",
        "String object",
        "Map",
        "Set",
        "TypedArray",
        "iterable object",
      ]),
      isIterable,
    );
  });

  describe("isAsyncIterable", () => {
    runCases(withExpected(["async iterable object"]), isAsyncIterable);
  });

  describe("isPromiseLike", () => {
    runCases(withExpected(["Promise", "thenable object"]), isPromiseLike);
  });
});
