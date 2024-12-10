import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import axiosInstance from "../../axiosConfig"; 
import notification from "../../services/toastService";

function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);  
    axiosInstance.post("/login", {
        email: username,
        password: password,
      })
      .then(function (res) {
        console.log("res", );
        const token = res.data.token; 
        const userInfo = res.data.userInfo; 
        localStorage.setItem('authToken', token)
        localStorage.setItem('authInfo', userInfo)
        notification(err.response.data.message, "success");
        setIsLoading(false); 
        navigate('/admin/login')
      })
      .catch(function (err) {
        notification(err.response.data.message, "error"); 
        setIsLoading(false); 
      });
  };

  return (
    <div id="auth"> 

      <title>{props.title}</title>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-lg-5 col-12  shadow-lg p-3 mb-5 bg-body rounded">
          <div id="auth-left">
            <div className="auth-logo"> 
              <Link to={"/auth/login"}>
                <img src="../assets/images/logo/logo.png" alt="Logo" />
              </Link>
            </div>
            <h1 className="auth-title"> Log in.</h1>
            <p className="auth-subtitle mb-5">
              Log in with your data that you entered during registration.
            </p>
            <form>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="text"
                  className="form-control form-control-xl"
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                />
                <div className="form-control-icon">
                  <i className="bi bi-person" />
                </div>
              </div>
              <div className="form-group position-relative has-icon-left mb-4">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-xl"
                  placeholder="Password"
                />
                <div className="form-control-icon">
                  <i className="bi bi-shield-lock" />
                </div>
              </div>
              <div className="form-check form-check-lg d-flex align-items-end">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  defaultValue
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label text-gray-600"
                  htmlFor="flexCheckDefault"
                >
                  Keep me logged in 
                </label>
              </div>
              <button
                className="btn btn-primary btn-block btn-lg shadow-lg mt-5"
                onClick={(e) => handleSubmit(e)}
                disabled={isLoading} 
                
              >
                {isLoading ? (
                  <span>Please Wait...</span> // You can replace this with a spinner icon
                ) : (
                  "Login"
                )}
              
              </button>
            </form>
            {/* <div className="text-center mt-5 text-lg fs-4">
          <p className="text-gray-600">Don't have an account? <a href="auth-register.html" className="font-bold">Sign
              up</a>.</p>
          <p><a className="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
        </div> */}
          </div>
        </div>
        {/* <div className="col-lg-7 d-none d-lg-block">
      <div id="auth-right">
      </div>
    </div> */}
      </div>
    </div>
  );
}

// Login.defaultProps = {
//   title: "Its Default asd 1",
// };

export default Login;
