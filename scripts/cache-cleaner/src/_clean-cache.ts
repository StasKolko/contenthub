import type { Dirent } from "node:fs";

import type {
  CacheCleanerConfig,
  CacheCleanerResult,
  FailedDirectory,
} from "./_types";

import { readdir, rm } from "node:fs/promises";
import { relative, resolve } from "node:path";

type CleanCacheContext = {
  deletedDirectories: string[];
  directoryNames: ReadonlySet<string>;
  failedDirectories: FailedDirectory[];
  projectRootPath: string;
};

type FailureParams = {
  directoryPath: string;
  error: unknown;
};

async function cleanCache(
  config: CacheCleanerConfig,
): Promise<CacheCleanerResult> {
  const context: CleanCacheContext = {
    deletedDirectories: [],
    directoryNames: new Set(config.directoryNames),
    failedDirectories: [],
    projectRootPath: resolve(config.projectRootPath),
  };

  await _visitDirectory(context.projectRootPath, context);

  context.deletedDirectories.sort(_compareStrings);
  context.failedDirectories.sort(_compareFailedDirectories);

  return {
    deletedDirectories: context.deletedDirectories,
    failedDirectories: context.failedDirectories,
  };
}

async function _visitDirectory(
  directoryPath: string,
  context: CleanCacheContext,
): Promise<void> {
  let entries: Dirent[] = [];

  try {
    entries = await readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    _recordFailure(context, { directoryPath, error });
    return;
  }

  const directories = entries.filter((entry) => entry.isDirectory());

  await Promise.all(
    directories.map(async (entry) => {
      const childPath = resolve(directoryPath, entry.name);

      if (context.directoryNames.has(entry.name)) {
        await _removeDirectory(childPath, context);
      } else {
        await _visitDirectory(childPath, context);
      }
    }),
  );
}

async function _removeDirectory(
  directoryPath: string,
  context: CleanCacheContext,
): Promise<void> {
  try {
    await rm(directoryPath, { recursive: true, force: true });

    context.deletedDirectories.push(
      relative(context.projectRootPath, directoryPath),
    );
  } catch (error) {
    _recordFailure(context, { directoryPath, error });
  }
}

function _recordFailure(
  context: CleanCacheContext,
  params: FailureParams,
): void {
  const errorMessage =
    params.error instanceof Error ? params.error.message : String(params.error);

  context.failedDirectories.push({
    errorMessage,
    path: relative(context.projectRootPath, params.directoryPath),
  });
}

function _compareStrings(first: string, second: string): number {
  return first.localeCompare(second);
}

function _compareFailedDirectories(
  first: FailedDirectory,
  second: FailedDirectory,
): number {
  return first.path.localeCompare(second.path);
}

export { cleanCache };
