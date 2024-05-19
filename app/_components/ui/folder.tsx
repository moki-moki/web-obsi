import File from "./file";
import Input from "./input";
import { ChevronRight } from "lucide-react";
import FileWrapper from "../file/file-wrapper";
import { FileI, InputChangeEventHandler } from "@/app/types/types";

interface Props {
  idx: number;
  name: string;
  files: FileI[];
  rotateIcon: boolean[];
  renameValue: string;
  showInput: null | number;
  iconHandler: (e: React.MouseEvent, idx: number) => void;
  onChangeHandler: InputChangeEventHandler;
  onKeyDownHandler: (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => void;
}

const Folder = ({
  idx,
  name,
  files,
  showInput,
  rotateIcon,
  renameValue,
  iconHandler,
  onChangeHandler,
  onKeyDownHandler,
}: Props) => {
  return (
    <div
      className={`cursor-pointer text-gray uppercase font-bold tracking-wide rounded-xl ${
        showInput === idx && "bg-gray/20"
      } ${rotateIcon[idx] && "bg-dark-gray-accent"}`}
      onClick={(e) => iconHandler(e, idx)}
    >
      <div className="flex items-center justify-between p-2 rounded-full hover:bg-dark-gray-accent">
        <div className="flex items-center">
          <span className="mr-2 text-sm">
            <ChevronRight
              size={20}
              style={{
                transform: rotateIcon[idx] ? "rotate(90deg)" : "none",
              }}
            />
          </span>
          {showInput === idx ? (
            <Input
              type="text"
              rounded="md"
              value={renameValue}
              onChange={onChangeHandler}
              onKeyDown={(e) => onKeyDownHandler(e, idx)}
              className="px-2 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple"
            />
          ) : (
            <span className="text-sm font-bold">{name}</span>
          )}
        </div>
      </div>

      {files?.length && rotateIcon[idx]
        ? files?.map((el) => (
            <FileWrapper type={el.type} id={el.id} title={el.name}>
              <File name={el.name} key={el.id} />
            </FileWrapper>
          ))
        : null}
    </div>
  );
};

export default Folder;
