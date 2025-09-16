import { type ClassValue, clsx } from "clsx";
import * as R from "ramda";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = R.pathOr("Error", [
  "response",
  "data",
  "detail",
]);
