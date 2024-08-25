import { useDeleteFolder } from '@/api-calls/folders';
import { useModal } from '@/app/context/modal-context';
import { SquarePen, Trash2 } from 'lucide-react';
import Button from '../ui/button';

interface Props {
  id: string;
  idx: number;
  name: string;
  changeNameHandler: (e: React.MouseEvent<HTMLSpanElement>, idx: number, name: string) => void;
}

const FolderControlls = ({ id, idx, name, changeNameHandler }: Props) => {
  const { deleteFolder } = useDeleteFolder();
  const { setModalContent, openModal, closeModal } = useModal();

  const deleteFolderHandler = async () => {
    await deleteFolder(id);
    closeModal();
  };

  const showModal = () => {
    setModalContent(
      <>
        <p className="font-bold text-center text-nowrap">
          Are you sure you want to <span className="text-red">delete</span> this folder&#x3f;
        </p>
        <Button
          size="sm"
          type="button"
          font="bolded"
          variants="warning-outlined"
          onClick={deleteFolderHandler}
          className="w-full mt-8 rounded-md"
        >
          Yes
        </Button>
      </>
    );
    openModal();
  };

  return (
    <div className="flex items-center gap-2">
      <span
        onClick={(e) => changeNameHandler(e, idx, name)}
        className="text-sm transition-colors duration-200 hover:text-white"
      >
        <SquarePen size={20} />
      </span>
      <span onClick={showModal} className="text-sm transition-colors duration-200 hover:text-white">
        <Trash2 size={20} />
      </span>
    </div>
  );
};

export default FolderControlls;
