// src/components/CreateEmployee.js

import React, { useState } from "react";
import axios from "axios";
import "./CreateEmployee.css"; 

const CreateEmployee = ({ addEmployee }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  const createEmployeeHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/employees", {
        name,
        email,
        position,
        department,
        salary,
      });
      addEmployee(data);
      setName("");
      setEmail("");
      setPosition("");
      setDepartment("");
      setSalary("");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Employee</h2>
      <form onSubmit={createEmployeeHandler} className="form">
        <div className="form-group">
          <label className="label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label className="label">Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
