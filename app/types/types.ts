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
  id: string;
  name: string;
  files: FileI[] | [];
  type: string;
}

export interface FileI {
  id: string;
  name: string;
  type: string;
}
