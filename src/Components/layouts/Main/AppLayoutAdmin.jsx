import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayoutAdmin = () => {
  return (
    <>
      <div id="app">
      <Header/>
        <Sidebar/>
           <Outlet/>
         <Footer/>
      </div>
        
    </>
    
  );
}

export default AppLayoutAdmin;
