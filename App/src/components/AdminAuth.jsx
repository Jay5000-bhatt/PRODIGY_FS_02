// components/AdminAuth.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OTPVerification from "./OTPVerification"; // Assuming you have OTPVerification component

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false); // State to toggle between login and register forms
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/register",
        { name, email, password }
      );
      if (
        data &&
        data.message === "OTP sent to registered email for verification"
      ) {
        setOtpSent(true); // Show OTP input field
      }
    } catch (error) {
      console.error("Error registering admin:", error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );
      if (data) {
        console.log("Successfully logged in. Redirecting to /home...");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in admin:", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="admin-auth-container">
          {isVerified ? (
            <div className="center-content">
              <h1>Verification Successful</h1>
              <p>You are now verified and logged in.</p>
            </div>
          ) : otpSent ? (
            <OTPVerification email={email} />
          ) : (
            <form
              onSubmit={isRegister ? registerHandler : loginHandler}
              className="center-content"
            >
              <h1>{isRegister ? "Admin Register" : "Admin Login"}</h1>
              {isRegister && (
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="styled-button">
                {isRegister ? "Register" : "Login"}
              </button>
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="switch-button"
              >
                {isRegister ? "Switch to Login" : "Switch to Register"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAuth;
