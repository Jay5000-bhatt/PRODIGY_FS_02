import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OTPverification.css"; 

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const verifyHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);
    console.log("Email:", email);
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/verify",
        { email, otp }
      );
      console.log("Response data:", response.data);
  
      if (response.data) {
        navigate("/Home"); // Redirect to home page on successful verification
      }
    } catch (error) {
      console.error("Error verifying admin:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : "Invalid OTP. Please try again."); // Display error message if verification fails
    }
  };
  

  return (
    <div>
      <h1>OTP Verification</h1>
      <form onSubmit={verifyHandler} className="slider">
        <div>
          <label>OTP: </label>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="Button">Verify</button>
      </form>
    </div>
  );
};

export default OTPVerification;
