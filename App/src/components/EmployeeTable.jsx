import React, { useState } from "react";
import axios from "axios";
import "./EmployeeTable.css"; // Import CSS file for styling

const EmployeeTable = ({ employees, updateEmployee, deleteEmployee }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    position: "",
  });

  const openModal = (id, name, email, position) => {
    setFormData({ id, name, email, position });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/employees/${formData.id}`,
        {
          name: formData.name,
          email: formData.email,
          position: formData.position,
        }
      );
      updateEmployee(data);
      closeModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      deleteEmployee(id);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <button
                  className="update-button"
                  onClick={() =>
                    openModal(
                      employee._id,
                      employee.name,
                      employee.email,
                      employee.position
                    )
                  }
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteHandler(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Update Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="label">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="submit-button">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
