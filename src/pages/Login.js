import React from "react";
import LoginForm from "./LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Form.css";
function Login() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-body p-5">
                <h2 className="card-title text-center mb-4 fw-bold text-primary">
                  Login
                </h2>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
