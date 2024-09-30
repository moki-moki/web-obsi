'use client';
import { ToastContainer } from 'react-toastify';
import { toastConfig } from '@/config/toast-config';
import 'react-toastify/ReactToastify.css';

const Toaster = () => {
  return <ToastContainer {...toastConfig} />;
};

export default Toaster;
