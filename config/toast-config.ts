import { ToastContainerProps } from 'react-toastify';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;
const POSITION = 'top-right';

export const toastConfig: ToastContainerProps = {
  position: POSITION,
  autoClose: TOAST_REMOVE_DELAY,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  limit: TOAST_LIMIT,
};
