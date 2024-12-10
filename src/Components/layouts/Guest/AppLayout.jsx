import React from 'react';
import GuestFooter from './GuestFooter';
import GuestHeader from './GuestHeader';
import { Outlet } from 'react-router-dom';
 
import { ToastContainer } from "react-toastify";



const AppLayout = () => {
  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     <GuestHeader  />
            <Outlet/>
     <GuestFooter />
    </>
   
  );
}

export default AppLayout;
