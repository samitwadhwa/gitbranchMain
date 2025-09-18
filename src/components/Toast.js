// src/components/Toast.js
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return <ToastContainer />;
};

export const showToast = (message, type = 'info') => {
  toast(message, { type });
};

export default Toast;
