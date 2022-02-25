import React from "react";
import App from './index';

function Login() {
  return (
    <div className="login">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Login</h1>
            < App />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;