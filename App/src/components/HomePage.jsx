import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEmployee from "./CreateEmployee";
import EmployeeTable from "./EmployeeTable";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/employees");
        setEmployees(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to the root route after logout
  };

  return (
    <div>
      <h1>Welcome Admin</h1>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CreateEmployee addEmployee={addEmployee} />
      <EmployeeTable
        employees={employees}
        updateEmployee={updateEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default HomePage;
