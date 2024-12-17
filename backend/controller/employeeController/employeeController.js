const { PrismaClient } = require('@prisma/client');
const { z } = require('zod'); // Import Zod for validation

const prisma = new PrismaClient();

// Define Employee Schema using Zod
const employeeSchema = z.object({
  employeeId: z.string()
    .min(7, "Minimum 7 characters")
    .max(10, "Maximum 10 characters")
    .regex(/^\d{2}[A-Z]{2}\d{3,6}$/, "EmployeeId Format: YYDEPTSNO, e.g., 22CS001"),
  name: z.string().min(1, "Employee Name is required"),
  email: z.string().email("Invalid Email ID"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  department: z.string().min(1, "Department is required"),
  dateOfJoining: z.string().refine(
    (date) => new Date(date) <= new Date(),
    "Date of Joining cannot be a future date"
  ),
  role: z.string().min(1, "Role is required"),
});

// Helper function to validate input
const validateInput = (schema, data) => {
  try {
    return { success: true, data: schema.parse(data) };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};

// Controller to create a new employee
const createEmployee = async (req, res) => {
  const { success, data, error } = validateInput(employeeSchema, req.body);

  if (!success) {
    return res.status(400).json({ message: "Validation Error", errors: error });
  }

  try {
    const newEmployee = await prisma.employee.create({
      data: {
        employeeId: data.employeeId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        dateOfJoining: new Date(data.dateOfJoining),
        role: data.role,
      },
    });

    res.status(201).json({ message: "Employee created successfully", data: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error: error.message });
  }
};

// Controller to get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json({ message: "Employees fetched successfully", data: employees });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// Controller to get an employee by employeeId
const getEmployeeById = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee fetched successfully", data: employee });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employee", error: error.message });
  }
};

// Controller to delete an employee by employeeId
const deleteEmployeeById = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const employee = await prisma.employee.delete({
      where: { employeeId },
    });

    res.status(200).json({ message: "Employee deleted successfully", data: employee });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};

// Export controllers
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
};
