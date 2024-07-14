import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminAuth from "./components/AdminAuth";
import HomePage from "./components/HomePage";
import OTPVerification from "./components/OTPVerification";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminAuth />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
