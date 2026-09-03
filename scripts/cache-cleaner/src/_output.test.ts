import { printResult } from "./_output";

describe("printResult", () => {
  it("prints a message when no directories were deleted", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    printResult({
      deletedDirectories: [],
      failedDirectories: [],
    });

    expect(logSpy.mock.calls).toEqual([["Deleted directories:"], ["  None"]]);

    logSpy.mockRestore();
  });

  it("prints deleted and failed directories", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    printResult({
      deletedDirectories: ["coverage", "dist"],
      failedDirectories: [
        {
          errorMessage: "permission denied",
          path: "apps/api/dist",
        },
        {
          errorMessage: "permission denied",
          path: "packages/ui/dist",
        },
        {
          errorMessage: "busy",
          path: "apps/web/node_modules",
        },
      ],
    });

    expect(logSpy.mock.calls).toEqual([
      ["Deleted directories:"],
      ["  coverage"],
      ["  dist"],
      ["Failed directories:"],
      ["  permission denied"],
      ["    apps/api/dist"],
      ["    packages/ui/dist"],
      ["  busy"],
      ["    apps/web/node_modules"],
    ]);

    logSpy.mockRestore();
  });
});
