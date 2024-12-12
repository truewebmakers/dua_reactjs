import { Children, useState } from 'react'  
import Login from './Components/auth/Login'
import { Route , BrowserRouter as Router , Routes,Link } from 'react-router-dom' 
import Dashboard from './Components/admin/Dashboard'
import AppLayout from './Components/layouts/Guest/AppLayout'
import LandingPage from './Components/LandingPage'
import AppLayoutAdmin from './Components/layouts/Main/AppLayoutAdmin'
import CreatePermission from './Components/admin/usermanagement/CreatePermission'
import ManagePermission from './Components/admin/usermanagement/ManagePermission'
import CreateRole from './Components/admin/usermanagement/CreateRole'
import ManageRole from './Components/admin/usermanagement/ManageRole'
import CreateUser from './Components/admin/usermanagement/CreateUser'
import ManageUserList from './Components/admin/usermanagement/ManageUserList'






function App() {
  const [count, setCount] = useState(0)

  const routeConfig = [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element:  <LandingPage/>},
        { path: "auth/login", element: <Login /> }, 
      ],
    },
    {
      path: "/admin/",
      
      element: <AppLayoutAdmin/>,
      children: [  
        { path: "dashboard", element: <Dashboard/> },
        { path: "permission/create", element: <CreatePermission/> },
        { path: "permission/list", element: <ManagePermission/> },
        { path: "role/create", element: <CreateRole/> },
        { path: "role/list", element: <ManageRole/> },
        { path: "users/create", element: <CreateUser/> },
        { path: "users/list", element: <ManageUserList/> },

      ],
    },
  ];

  return (
    <>
    <Router> 
    <Routes>
        {routeConfig.map((route, index) => (
            // Parent route (AppLayout in this case)
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                // Nested routes (Login, Dashboard)
                <Route key={childIndex} path={child.path} element={child.element} />
              ))}
            </Route>
          ))}
          </Routes>
    </Router>
      
    </>
  )
}

export default App
