import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayoutAdmin = () => {
  return (
    <>
        <Header/>
        <Sidebar/>
           <Outlet/>
         <Footer/>
    </>
    
  );
}

export default AppLayoutAdmin;
