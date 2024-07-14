// controllers/employeeController.js

const Employee = require("../models/employeeModel");

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
const getEmployees = async (req, res) => {
  const employees = await Employee.find({});
  res.json(employees);
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Public
const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (employee) {
    res.json(employee);
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
};

// @desc    Create an employee
// @route   POST /api/employees
// @access  Public
const createEmployee = async (req, res) => {
  const { name, email, position, department, salary } = req.body;

  try {
    // Check if employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    // Create new employee instance
    const newEmployee = new Employee({
      name,
      email,
      position,
      department,
      salary,
    });

    // Save employee to database
    const createdEmployee = await newEmployee.save();

    res.status(201).json(createdEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update an employee
// @route   PUT /api/employees/:id
// @access  Public
const updateEmployee = async (req, res) => {
  const { name, email, position, department, salary } = req.body;

  try {
    // Check if employee exists
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      // Update employee fields
      employee.name = name;
      employee.email = email;
      employee.position = position;
      employee.department = department;
      employee.salary = salary;

      // Save updated employee
      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete an employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (employee) {
      res.json({ message: "Employee removed" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
