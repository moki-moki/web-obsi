import React from "react";

interface Props {
  idx: number;
  name: string;
  icon: JSX.Element;
  options: ((...args: any[]) => any)[];
}

const ContextMenuItem = ({ idx, name, icon, options }: Props) => {
  return (
    <li
      onClick={options[idx]}
      className="folder flex justify-between items-center cursor-pointer text-gray px-2 py-1 rounded-full text-xs font-bold uppercase hover:bg-gray/20"
    >
      {name}
      <span className="ml-2 text-base">{icon}</span>
    </li>
  );
};

export default ContextMenuItem;
