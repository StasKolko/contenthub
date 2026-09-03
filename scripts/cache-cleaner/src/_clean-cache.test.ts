import { readdir, rm } from "node:fs/promises";

import { cleanCache } from "./_clean-cache";

vi.mock("node:fs/promises", () => ({
  readdir: vi.fn(),
  rm: vi.fn(),
}));

const readdirMock = vi.mocked(readdir);
const rmMock = vi.mocked(rm);
const _pathSeparatorPattern = /[\\/]/;

describe("cleanCache", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("removes configured cache directories and returns sorted results", async () => {
    readdirMock
      .mockResolvedValueOnce([
        {
          name: "dist",
          isDirectory: () => true,
        },
        {
          name: "coverage",
          isDirectory: () => true,
        },
        {
          name: "src",
          isDirectory: () => true,
        },
        {
          name: "README.md",
          isDirectory: () => false,
        },
      ] as never)
      .mockResolvedValue([]);

    rmMock.mockResolvedValue(undefined);

    const result = await cleanCache({
      projectRootPath: "/project",
      directoryNames: ["coverage", "dist"],
    });

    expect(result).toEqual({
      deletedDirectories: ["coverage", "dist"],
      failedDirectories: [],
    });

    expect(rmMock).toHaveBeenCalledTimes(2);

    const removedDirectories = rmMock.mock.calls.map(([path]) =>
      _directoryName(path),
    );

    expect(removedDirectories).toEqual(
      expect.arrayContaining(["dist", "coverage"]),
    );

    for (const [path, options] of rmMock.mock.calls) {
      expect(options).toEqual({
        force: true,
        recursive: true,
      });

      expect(["dist", "coverage"]).toContain(_directoryName(path));
    }
  });

  it("records failures while reading a directory", async () => {
    readdirMock.mockRejectedValue(new Error("permission denied"));

    const result = await cleanCache({
      projectRootPath: "/project",
      directoryNames: ["dist"],
    });

    expect(result).toEqual({
      deletedDirectories: [],
      failedDirectories: [
        {
          errorMessage: "permission denied",
          path: "",
        },
      ],
    });

    expect(rmMock).not.toHaveBeenCalled();
  });

  it("records failures while removing cache directories", async () => {
    readdirMock.mockResolvedValue([
      {
        name: "dist",
        isDirectory: () => true,
      },
      {
        name: "coverage",
        isDirectory: () => true,
      },
    ] as never);

    rmMock.mockImplementation(async (path) => {
      if (
        _directoryName(path) === "dist"
        || _directoryName(path) === "coverage"
      ) {
        throw new Error(`cannot remove ${_directoryName(path)}`);
      }
    });

    const result = await cleanCache({
      projectRootPath: "/project",
      directoryNames: ["dist", "coverage"],
    });

    expect(result).toEqual({
      deletedDirectories: [],
      failedDirectories: [
        {
          errorMessage: "cannot remove coverage",
          path: "coverage",
        },
        {
          errorMessage: "cannot remove dist",
          path: "dist",
        },
      ],
    });
  });

  it("converts non-Error failures to strings", async () => {
    readdirMock.mockResolvedValue([
      {
        name: "dist",
        isDirectory: () => true,
      },
    ] as never);

    rmMock.mockRejectedValue("remove failed");

    const result = await cleanCache({
      projectRootPath: "/project",
      directoryNames: ["dist"],
    });

    expect(result).toEqual({
      deletedDirectories: [],
      failedDirectories: [
        {
          errorMessage: "remove failed",
          path: "dist",
        },
      ],
    });
  });
});

function _directoryName(path: unknown): string {
  return String(path).split(_pathSeparatorPattern).at(-1) ?? "";
}
