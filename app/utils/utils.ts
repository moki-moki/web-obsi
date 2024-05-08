import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FOLDER_STATE } from "../_components/sidebar/sidebar";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createFolder(): void {
  const newFolder = {
    name: "(No title)",
  };

  FOLDER_STATE.push(newFolder);
}
