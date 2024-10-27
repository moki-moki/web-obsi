import { useEffect } from 'react';

export const useKeyBind = (key: string, callback: () => void) => {
  const handleKeybind = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === key) {
      e.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeybind);

    return () => {
      window.removeEventListener('keydown', handleKeybind);
    };
  }, []);
};
