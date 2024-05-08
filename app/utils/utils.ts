import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FOLDER_STATE } from "../data/initial-state";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFolder(): void {
  const newFolder = {
    name: "(No title)",
  };

  FOLDER_STATE.push(newFolder);
}
