import { describe, expect, it } from "vitest";

import {
  hasCharacters,
  hasTrimmedCharacters,
  isBigInt,
  isBlankString,
  isBoolean,
  isDigit,
  isDigits,
  isEmptyString,
  isEven,
  isFiniteNumber,
  isInRange,
  isInteger,
  isNaNValue,
  isNegativeNumber,
  isNull,
  isNullish,
  isNumber,
  isOdd,
  isPositiveNumber,
  isString,
  isSymbol,
  isUndefined,
} from "../_primitives";
import { runCases, withExpected } from "./helpers";

describe("isUndefined", () => {
  runCases(withExpected(["undefined"]), isUndefined);
});

describe("isNull", () => {
  runCases(withExpected(["null"]), isNull);
});

describe("isNullish", () => {
  runCases(withExpected(["undefined", "null"]), isNullish);
});

describe("isBoolean", () => {
  runCases(withExpected(["true", "false"]), isBoolean);
});

describe("isSymbol", () => {
  runCases(withExpected(["symbol"]), isSymbol);
});

describe("isBigInt", () => {
  runCases(
    withExpected(["bigint zero", "bigint", "negative bigint"]),
    isBigInt,
  );
});

describe("number predicates", () => {
  describe("isNumber", () => {
    runCases(
      withExpected([
        "zero",
        "negative zero",
        "positive integer",
        "negative integer",
        "even integer",
        "negative even integer",
        "odd integer",
        "negative odd integer",
        "fraction",
        "negative fraction",
        "NaN",
        "positive Infinity",
        "negative Infinity",
      ]),
      isNumber,
    );
  });

  describe("isFiniteNumber", () => {
    runCases(
      withExpected([
        "zero",
        "negative zero",
        "positive integer",
        "negative integer",
        "even integer",
        "negative even integer",
        "odd integer",
        "negative odd integer",
        "fraction",
        "negative fraction",
      ]),
      isFiniteNumber,
    );
  });

  describe("isNaNValue", () => {
    runCases(withExpected(["NaN"]), isNaNValue);
  });

  describe("isInteger", () => {
    runCases(
      withExpected([
        "zero",
        "negative zero",
        "positive integer",
        "negative integer",
        "even integer",
        "negative even integer",
        "odd integer",
        "negative odd integer",
      ]),
      isInteger,
    );
  });

  describe("isEven", () => {
    runCases(
      withExpected([
        "zero",
        "negative zero",
        "even integer",
        "negative even integer",
      ]),
      isEven,
    );
  });

  describe("isOdd", () => {
    runCases(
      withExpected([
        "positive integer",
        "negative integer",
        "odd integer",
        "negative odd integer",
      ]),
      isOdd,
    );
  });

  describe("isPositiveNumber", () => {
    runCases(
      withExpected([
        "positive integer",
        "even integer",
        "odd integer",
        "fraction",
      ]),
      isPositiveNumber,
    );
  });

  describe("isNegativeNumber", () => {
    runCases(
      withExpected([
        "negative integer",
        "negative even integer",
        "negative odd integer",
        "negative fraction",
      ]),
      isNegativeNumber,
    );
  });
});

describe("isInRange", () => {
  it.each([
    {
      name: "value equals min",
      args: { value: 0, min: 0, max: 10 },
      expected: true,
    },
    {
      name: "value is inside range",
      args: { value: 5, min: 0, max: 10 },
      expected: true,
    },
    {
      name: "value equals max",
      args: { value: 10, min: 0, max: 10 },
      expected: true,
    },
    {
      name: "value is below min",
      args: { value: -1, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is above max",
      args: { value: 11, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is NaN",
      args: { value: Number.NaN, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is positive Infinity",
      args: {
        value: Number.POSITIVE_INFINITY,
        min: 0,
        max: 10,
      },
      expected: false,
    },
    {
      name: "value is negative Infinity",
      args: {
        value: Number.NEGATIVE_INFINITY,
        min: 0,
        max: 10,
      },
      expected: false,
    },
    {
      name: "value is string",
      args: { value: "5", min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is null",
      args: { value: null, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is undefined",
      args: { value: undefined, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is boolean",
      args: { value: true, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is bigint",
      args: { value: 5n, min: 0, max: 10 },
      expected: false,
    },
    {
      name: "value is an object",
      args: { value: {}, min: 0, max: 10 },
      expected: false,
    },
  ])("$name → $expected", ({ args, expected }) => {
    expect(isInRange(args)).toBe(expected);
  });
});

describe("string predicates", () => {
  describe("isString", () => {
    runCases(
      withExpected([
        "empty string",
        "blank string",
        "string",
        "ASCII digit",
        "ASCII digits",
        "string with spaces",
        "invalid digits",
        "negative numeric string",
        "decimal numeric string",
      ]),
      isString,
    );
  });

  describe("isEmptyString", () => {
    runCases(withExpected(["empty string"]), isEmptyString);
  });

  describe("isBlankString", () => {
    runCases(withExpected(["empty string", "blank string"]), isBlankString);
  });

  describe("isDigit", () => {
    runCases(withExpected(["ASCII digit"]), isDigit);
  });

  describe("isDigits", () => {
    runCases(withExpected(["ASCII digit", "ASCII digits"]), isDigits);
  });

  describe("hasCharacters", () => {
    runCases(
      withExpected([
        "blank string",
        "string",
        "ASCII digit",
        "ASCII digits",
        "string with spaces",
        "invalid digits",
        "negative numeric string",
        "decimal numeric string",
      ]),
      (value) => hasCharacters(value),
    );
  });

  describe("hasTrimmedCharacters", () => {
    runCases(
      withExpected([
        "string",
        "ASCII digit",
        "ASCII digits",
        "string with spaces",
        "invalid digits",
        "negative numeric string",
        "decimal numeric string",
      ]),
      (value) => hasTrimmedCharacters(value),
    );
  });
});
