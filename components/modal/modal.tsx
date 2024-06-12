'use client';
import { createPortal } from 'react-dom';

interface Props {
  showModal: boolean;
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ showModal, children, closeModal }: Props) => {
  if (!showModal) return null;

  return createPortal(
    <div className="w-full h-full bg-dark-gray/90 fixed top-0 left-0 flex justify-center items-center">
      <div className="min-w-fit w-1/2 rounded-xl bg-dark-gray-accent text-gray px-5 py-8 relative">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
