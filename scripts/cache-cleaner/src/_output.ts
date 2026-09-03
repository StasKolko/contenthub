import type { CacheCleanerResult } from "./_types";

function printResult(result: CacheCleanerResult) {
  console.log("Deleted directories:");
  _printPaths(result.deletedDirectories);

  if (result.failedDirectories.length === 0) {
    return;
  }

  console.log("Failed directories:");
  let currentErrorMessage: string | undefined;

  for (const failure of result.failedDirectories) {
    if (failure.errorMessage !== currentErrorMessage) {
      currentErrorMessage = failure.errorMessage;
      console.log(`  ${currentErrorMessage}`);
    }

    console.log(`    ${failure.path}`);
  }
}

function _printPaths(paths: readonly string[]) {
  if (paths.length === 0) {
    console.log("  None");
    return;
  }

  for (const path of paths) {
    console.log(`  ${path}`);
  }
}

export { printResult };
