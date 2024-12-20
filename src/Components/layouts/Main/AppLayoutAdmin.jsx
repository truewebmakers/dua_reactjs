import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ToastContainer } from "react-toastify";
import '../../Global/developer.css'; 
const AppLayoutAdmin = () => {
  return (
    <>
      <div id="app">
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
      <Header/>
        <Sidebar/>
           <Outlet/>
         <Footer/>
      </div>
        
    </>
    
  );
}

export default AppLayoutAdmin;
