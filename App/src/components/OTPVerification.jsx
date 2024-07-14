import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerification = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const verifyHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/verify",
        { email, otp }
      );
      if (data) {
        login(data); // Call login function with user data
        navigate("/Home"); // Redirect to home page on successful verification
      }
    } catch (error) {
      console.error("Error verifying admin:", error);
      setError("Invalid OTP. Please try again."); // Display error message if verification fails
    }
  };

  return (
    <div>
      <h1>OTP Verification</h1>
      <form onSubmit={verifyHandler}>
        <div>
          <label>OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OTPVerification;
