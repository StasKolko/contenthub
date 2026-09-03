import { twMerge } from "tailwind-merge";

import { cn } from "./_class-names";

vi.mock("tailwind-merge", () => ({
  twMerge: vi.fn((classes: string) => classes),
}));

const twMergeMock = vi.mocked(twMerge);

describe("cn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty string when no arguments are provided", () => {
    expect(cn()).toBe("");
    expect(twMergeMock).toHaveBeenCalledWith("");
  });

  it("keeps string class names", () => {
    expect(cn("text-sm", "font-bold")).toBe("text-sm font-bold");
    expect(twMergeMock).toHaveBeenCalledWith("text-sm font-bold");
  });

  it("ignores unsupported primitive values", () => {
    expect(cn("text-sm", false, null, undefined, 123)).toBe("text-sm");
    expect(twMergeMock).toHaveBeenCalledWith("text-sm");
  });

  it("supports nested arrays", () => {
    expect(cn("text-sm", ["font-bold", ["leading-none", false, null]])).toBe(
      "text-sm font-bold leading-none",
    );

    expect(twMergeMock).toHaveBeenCalledWith("text-sm font-bold leading-none");
  });

  it("includes object keys with truthy values", () => {
    expect(
      cn({
        "font-bold": true,
        "text-sm": 1,
        hidden: false,
        invisible: null,
        block: undefined,
      }),
    ).toBe("font-bold text-sm");

    expect(twMergeMock).toHaveBeenCalledWith("font-bold text-sm");
  });

  it("combines strings, arrays, and objects", () => {
    expect(
      cn("text-sm", ["leading-none", { "font-bold": true, hidden: false }], {
        "md:text-base": true,
      }),
    ).toBe("text-sm leading-none font-bold md:text-base");

    expect(twMergeMock).toHaveBeenCalledWith(
      "text-sm leading-none font-bold md:text-base",
    );
  });

  it("delegates the resulting class string to twMerge", () => {
    cn("px-2", "px-4");

    expect(twMergeMock).toHaveBeenCalledTimes(1);
    expect(twMergeMock).toHaveBeenCalledWith("px-2 px-4");
  });

  it("does not append an empty class name", () => {
    expect(cn("text-sm", "")).toBe("text-sm");
    expect(twMergeMock).toHaveBeenCalledWith("text-sm");
  });
});
