import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModalHandler = () => setShowModal((prev) => (prev = !prev));

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return { showModal, closeModal, toggleModalHandler, openModal };
};
