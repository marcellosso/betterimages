import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function simplifiedPluralize(word: string, condition: boolean): string {
  if (condition) return word + "s";
  return word;
}
