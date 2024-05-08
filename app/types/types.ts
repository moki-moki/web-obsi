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

export interface MENUI {
  name: string;
  icon: React.JSX.Element;
  onClick: () => void;
}
