'use client';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Button from '../ui/button';
import { useModal } from '@/app/context/modal-context';

const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  if (!isOpen) return null;

  return createPortal(
    <div className="w-full h-full bg-dark-gray/90 fixed top-0 left-0 flex justify-center items-center">
      <div className="min-w-fit w-1/3 rounded-xl bg-dark-gray-accent text-gray px-5 pb-8 pt-5 flex flex-col">
        <Button
          type="button"
          variants="icon"
          onClick={closeModal}
          className="rounded-full mb-5 p-1 self-end"
        >
          <X size={20} />
        </Button>
        {modalContent}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
