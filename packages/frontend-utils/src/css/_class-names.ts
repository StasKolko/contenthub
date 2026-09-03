import {
  isArray,
  isObject,
  isString,
} from "@packages/shared-utils/type-guards";
import { twMerge } from "tailwind-merge";

type ClassArguments =
  | ClassPrimitive
  | ClassArguments[]
  | Record<string, ClassPrimitive>;
type ClassPrimitive = number | string | boolean | null | undefined;

function cn(...inputs: ClassArguments[]) {
  return twMerge(_classNames(...inputs));
}

function _classNames(...args: ClassArguments[]) {
  let classes = "";
  const argsLength = args.length;

  for (let i = 0; i < argsLength; i++) {
    const arg = args[i];
    if (isString(arg)) {
      classes = _appendClass(classes, arg);
    } else if (isArray(arg)) {
      classes = _appendClass(classes, _classNames(...arg));
    } else if (isObject(arg)) {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classes = _appendClass(classes, key);
        }
      }
    }
  }

  return classes;
}

function _appendClass(classes: string, newClass: string) {
  if (!classes) {
    return newClass;
  }
  if (!newClass) {
    return classes;
  }
  return `${classes} ${newClass}`;
}

export { cn };
