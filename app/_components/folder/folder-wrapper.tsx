import React from "react";
import Droppable from "../Draggable/droppable";

interface Props {
  id: string;
  idx: number;
  rotateIcon: boolean[];
  showInput: null | number;
  children: React.ReactNode;
  iconHandler: (e: React.MouseEvent, idx: number) => void;
}

const FolderWrapper = ({
  id,
  idx,
  showInput,
  rotateIcon,
  children,
  iconHandler,
}: Props) => {
  return (
    <Droppable id={id} key={id} type="folder">
      <div
        className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
          showInput === idx && "bg-gray/20"
        } ${rotateIcon[idx] && "bg-dark-gray-accent"}`}
        onClick={(e) => iconHandler(e, idx)}
      >
        {children}
      </div>
    </Droppable>
  );
};

export default FolderWrapper;
