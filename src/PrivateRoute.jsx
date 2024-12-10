// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoute = () => {
//   // Check if the token exists in localStorage
//   const token = localStorage.getItem('authToken');

//   // If the token is not present, redirect to the login page
//   if (!token) {
//     return <Navigate to="/auth/login" />;
//   }

//   // If the token exists, render the child components (admin routes)
//   return <Outlet />;
// };

// export default PrivateRoute;