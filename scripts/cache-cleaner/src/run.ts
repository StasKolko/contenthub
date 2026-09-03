import { findProjectRoot } from "@packages/scripts-utils/project-root";

import { cleanCache } from "./_clean-cache";
import { printResult } from "./_output";

const result = await cleanCache({
  projectRootPath: findProjectRoot(),
  directoryNames: [".tanstack", ".turbo", "coverage", "dist", "node_modules"],
});

printResult(result);
