import { ToastContainerProps } from 'react-toastify';

const TOAST_LIMIT = 2;
const TOAST_REMOVE_DELAY = 5000;
const POSITION = 'bottom-right';

export const toastConfig: ToastContainerProps = {
  position: POSITION,
  autoClose: TOAST_REMOVE_DELAY,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  limit: TOAST_LIMIT,
  theme: 'dark',
};
