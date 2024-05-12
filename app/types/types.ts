import React from "react";

export type InputChangeEventHandler =
  React.ChangeEventHandler<HTMLInputElement>;
export type TextareaChangeEventHandler =
  React.ChangeEventHandler<HTMLTextAreaElement>;
export type SelectChangeEventHandler =
  React.ChangeEventHandler<HTMLSelectElement>;

export interface ContextMenuI {
  show: boolean;
  x: number;
  y: number;
}

export interface MenuI {
  name: string;
  icon: React.JSX.Element;
}

export interface FolderI {
  name: string;
  files?: { name: string }[];
}

export interface FileI {
  name: string;
}
