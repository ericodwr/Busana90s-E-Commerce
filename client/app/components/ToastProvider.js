'use client';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'; //add this line
import { ToastContainer } from 'react-toastify';

const ToastProvider = ({ children }) => {
  const contextClass = {
    success: 'bg-blue-600',
    error: 'bg-red-600',
    info: 'bg-gray-600',
    warning: 'bg-orange-400',
    default: 'bg-indigo-600',
    dark: 'bg-white-600 font-gray-300',
  };

  return (
    <>
      <ToastContainer />
      {children};
    </>
  );
};

export default ToastProvider;
