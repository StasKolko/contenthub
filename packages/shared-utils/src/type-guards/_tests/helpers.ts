import type { DataName, PrimitiveCase } from "./constants";

import { DATA } from "./constants";

function withExpected(trueNames: DataName[]) {
  const trueNamesSet = new Set(trueNames);

  return DATA.map((testCase) => ({
    ...testCase,
    expected: trueNamesSet.has(testCase.name),
  }));
}

function runCases(
  cases: readonly PrimitiveCase[],
  predicate: (value: unknown) => boolean,
) {
  it.each(cases)("$name → $expected", ({ value, expected }) => {
    expect(predicate(value)).toBe(expected);
  });
}

export { runCases, withExpected };
