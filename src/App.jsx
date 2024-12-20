import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routeConfig } from "./Routes";

 
function App() {
 

  return (
    <>
      <Router>
        <Routes>
          {routeConfig.map((route, index) => ( 
            <Route key={index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => ( 
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </>
  );
}

export default App;
