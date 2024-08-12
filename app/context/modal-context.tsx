'use client';
import { createContext, useContext, useState } from 'react';

interface ModalContextProps {
  isOpen: boolean;
  modalContent: React.ReactNode;
  openModal: () => void;
  closeModal: () => void;
  setModalContent: (content: React.ReactNode) => void;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  modalContent: null,
  openModal: () => {},
  closeModal: () => {},
  setModalContent: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
