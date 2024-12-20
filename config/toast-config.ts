import { ToastContainerProps } from 'react-toastify';

const TOAST_LIMIT = 2;
const TOAST_REMOVE_DELAY = 5000;
const POSITION = 'bottom-right';

const theme = {
  background: 'rgba(var(--secondary-color), 0.7)',
  text: 'rgba(var(--text-text-color))',
  progress: 'rgba(var(--color-success))',
};

export const toastConfig: ToastContainerProps = {
  position: POSITION,
  autoClose: TOAST_REMOVE_DELAY,
  hideProgressBar: false,
  newestOnTop: false,
  icon: false,
  closeButton: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: true,
  limit: TOAST_LIMIT,
  toastStyle: {
    backgroundColor: theme.background,
    color: theme.text,
  },
  progressStyle: {
    backgroundColor: theme.progress,
  },
};
