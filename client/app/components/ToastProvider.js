'use client';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'; //add this line
import { ToastContainer } from 'react-toastify';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
      <ProgressBar
        height="6px"
        color="#5079cc"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ToastProvider;
