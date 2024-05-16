import React from "react";

interface Props {
  name: string;
}

const File = ({ name }: Props) => {
  return (
    <h3 className="pl-8 p-0.5 text-xs rounded-full hover:bg-dark-gray">
      {name}
    </h3>
  );
};

export default File;
