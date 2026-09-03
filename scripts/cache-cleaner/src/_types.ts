type CacheCleanerConfig = {
  projectRootPath: string;
  directoryNames: readonly string[];
};

type FailedDirectory = {
  errorMessage: string;
  path: string;
};

type CacheCleanerResult = {
  deletedDirectories: string[];
  failedDirectories: FailedDirectory[];
};

export type { CacheCleanerConfig, CacheCleanerResult, FailedDirectory };
