import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {



  return (
    <>

      <Navbar />
      <Outlet />
      <ToastContainer autoClose={3000} newestOnTop />
    </>
  )
}

export default RootLayout;