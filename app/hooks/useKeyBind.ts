import { useEffect } from 'react';

interface Props {
  key: string;
  callback: () => void;
}

export const useKeyBind = (key: string, callback: () => void) => {
  const handleKeybind = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === key) {
      console.log('works');
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
