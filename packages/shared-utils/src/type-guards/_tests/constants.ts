type DataName = (typeof DATA)[number]["name"];

type PrimitiveCase = {
  name: string;
  value: unknown;
  expected: boolean;
};

const DATA = [
  {
    name: "undefined",
    value: undefined,
    expected: false,
  },
  {
    name: "null",
    value: null,
    expected: false,
  },
  {
    name: "true",
    value: true,
    expected: false,
  },
  {
    name: "false",
    value: false,
    expected: false,
  },
  {
    name: "zero",
    value: 0,
    expected: false,
  },
  {
    name: "negative zero",
    value: -0,
    expected: false,
  },
  {
    name: "positive integer",
    value: 1,
    expected: false,
  },
  {
    name: "negative integer",
    value: -1,
    expected: false,
  },
  {
    name: "even integer",
    value: 2,
    expected: false,
  },
  {
    name: "negative even integer",
    value: -2,
    expected: false,
  },
  {
    name: "odd integer",
    value: 3,
    expected: false,
  },
  {
    name: "negative odd integer",
    value: -3,
    expected: false,
  },
  {
    name: "fraction",
    value: 1.5,
    expected: false,
  },
  {
    name: "negative fraction",
    value: -1.5,
    expected: false,
  },
  {
    name: "NaN",
    value: Number.NaN,
    expected: false,
  },
  {
    name: "positive Infinity",
    value: Number.POSITIVE_INFINITY,
    expected: false,
  },
  {
    name: "negative Infinity",
    value: Number.NEGATIVE_INFINITY,
    expected: false,
  },
  {
    name: "empty string",
    value: "",
    expected: false,
  },
  {
    name: "blank string",
    value: "   ",
    expected: false,
  },
  {
    name: "string",
    value: "string",
    expected: false,
  },
  {
    name: "ASCII digit",
    value: "5",
    expected: false,
  },
  {
    name: "ASCII digits",
    value: "123456",
    expected: false,
  },
  {
    name: "string with spaces",
    value: " hello ",
    expected: false,
  },
  {
    name: "invalid digits",
    value: "12a",
    expected: false,
  },
  {
    name: "negative numeric string",
    value: "-123",
    expected: false,
  },
  {
    name: "decimal numeric string",
    value: "1.5",
    expected: false,
  },
  {
    name: "bigint zero",
    value: 0n,
    expected: false,
  },
  {
    name: "bigint",
    value: 1n,
    expected: false,
  },
  {
    name: "negative bigint",
    value: -1n,
    expected: false,
  },
  {
    name: "symbol",
    value: Symbol("symbol"),
    expected: false,
  },
  {
    name: "empty object",
    value: {},
    expected: false,
  },
  {
    name: "object",
    value: { value: 1 },
    expected: false,
  },
  {
    name: "array",
    value: [],
    expected: false,
  },
  {
    name: "non-empty array",
    value: [1, 2, 3],
    expected: false,
  },
  {
    name: "function",
    value: () => undefined,
    expected: false,
  },
  {
    name: "Date",
    value: new Date(),
    expected: false,
  },
  {
    name: "RegExp",
    value: /test/,
    expected: false,
  },
  {
    name: "String object",
    value: new String("string"),
    expected: false,
  },
  {
    name: "Number object",
    value: new Number(1),
    expected: false,
  },
  {
    name: "valid Date",
    value: new Date("2024-01-01T00:00:00.000Z"),
    expected: false,
  },
  {
    name: "invalid Date",
    value: new Date(Number.NaN),
    expected: false,
  },
  {
    name: "Error",
    value: new Error("error"),
    expected: false,
  },
  {
    name: "Promise",
    value: Promise.resolve(),
    expected: false,
  },
  {
    name: "Map",
    value: new Map(),
    expected: false,
  },
  {
    name: "WeakMap",
    value: new WeakMap(),
    expected: false,
  },
  {
    name: "Set",
    value: new Set(),
    expected: false,
  },
  {
    name: "WeakSet",
    value: new WeakSet(),
    expected: false,
  },
  {
    name: "ArrayBuffer",
    value: new ArrayBuffer(8),
    expected: false,
  },
  {
    name: "DataView",
    value: new DataView(new ArrayBuffer(8)),
    expected: false,
  },
  {
    name: "TypedArray",
    value: new Uint8Array(),
    expected: false,
  },
  {
    name: "null prototype object",
    value: Object.create(null),
    expected: false,
  },
  {
    name: "class instance",
    value: new (class Example {})(),
    expected: false,
  },
  {
    name: "iterable object",
    value: {
      *[Symbol.iterator]() {
        yield 1;
      },
    },
    expected: false,
  },
  {
    name: "async iterable object",
    value: {
      async *[Symbol.asyncIterator]() {
        yield 1;
      },
    },
    expected: false,
  },
  {
    name: "thenable object",
    value: {
      then() {},
    },
    expected: false,
  },
] as const satisfies readonly PrimitiveCase[];

export type { DataName, PrimitiveCase };
export { DATA };
