// ╔════════════════════════════════════════════════════════════════╗
// ║                            NULLISH                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

function isNull(value: unknown): value is null {
  return value === null;
}

function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                            BOOLEAN                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             SYMBOL                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isSymbol(value: unknown): value is symbol {
  return typeof value === "symbol";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             BIGINT                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isBigInt(value: unknown): value is bigint {
  return typeof value === "bigint";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             NUMBER                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isEven(value: unknown): value is number {
  return isInteger(value) && value % 2 === 0;
}

function isOdd(value: unknown): value is number {
  return isInteger(value) && Math.abs(value % 2) === 1;
}

function isInteger(value: unknown): value is number {
  return isFiniteNumber(value) && Number.isInteger(value);
}

function isPositiveNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value > 0;
}

function isNegativeNumber(value: unknown): value is number {
  return isFiniteNumber(value) && value < 0;
}

type RangeArgs = {
  value: unknown;
  min: number;
  max: number;
};

function isInRange<T extends RangeArgs>(
  args: T,
): args is T & { value: number } {
  const { value, min, max } = args;

  return isFiniteNumber(value) && value >= min && value <= max;
}

function isFiniteNumber(value: unknown): value is number {
  return isNumber(value) && Number.isFinite(value);
}

// biome-ignore lint/style/useNamingConvention: false positive
function isNaNValue(value: unknown): value is number {
  return isNumber(value) && Number.isNaN(value);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

// ╔════════════════════════════════════════════════════════════════╗
// ║                             STRING                             ║
// ╚════════════════════════════════════════════════════════════════╝

function isEmptyString(value: unknown): value is string {
  return isString(value) && value.length === 0;
}

function isBlankString(value: unknown): value is string {
  return isString(value) && value.trim().length === 0;
}

function isDigit(value: unknown): value is string {
  if (isString(value) && value.length === 1) {
    return _isStringDigit(value, 0);
  }

  return false;
}

function isDigits(value: unknown): value is string {
  if (!(isString(value) && hasCharacters(value))) {
    return false;
  }

  for (let index = 0; index < value.length; index++) {
    if (!_isStringDigit(value, index)) {
      return false;
    }
  }

  return true;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function _isStringDigit(value: string, index: number) {
  const FirstDigitCode = 48;
  const LastDigitCode = 57;
  const code = value.charCodeAt(index);

  return code >= FirstDigitCode && code <= LastDigitCode;
}

function hasCharacters(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

function hasTrimmedCharacters(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}

export {
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
};
