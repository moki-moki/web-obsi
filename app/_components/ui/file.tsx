import React from "react";

interface Props {
  name: string;
}

const File = ({ name }: Props) => {
  return (
    <div className="p-1.5 text-xs rounded-full hover:bg-dark-gray">{name}</div>
  );
};

export default File;
