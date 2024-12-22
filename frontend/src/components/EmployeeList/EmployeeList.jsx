// src/components/EmployeeList.jsx
import React, { useState, useEffect } from "react";
import { getAllEmployees, deleteEmployeeById } from "../../services/apiService"; // Importing API functions
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch employees from the API when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data.data); // Assuming API response structure: { data: [...employees] }
      } catch (error) {
        setError(error.message || "Error fetching employees");
      }
    };

    fetchEmployees();
  }, []);

  // Handle deleting an employee
  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployeeById(employeeId);
      setEmployees(
        employees.filter((employee) => employee.employeeId !== employeeId)
      ); // Remove deleted employee from the list
    } catch (error) {
      setError(error.message || "Error deleting employee");
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Employee List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Create Employee Button */}
      <button
        className="px-4 py-2 mb-4 text-white bg-green-500 rounded"
        onClick={() => navigate("/create-employee")} // Navigate to /create-employee
      >
        Create Employee
      </button>

      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Employee ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td className="px-4 py-2 border-b">{employee.employeeId}</td>
              <td className="px-4 py-2 border-b">{employee.name}</td>
              <td className="px-4 py-2 border-b">{employee.email}</td>
              <td className="px-4 py-2 border-b">
                <button
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded"
                  onClick={() => navigate(`/employees/${employee.employeeId}`)}
                >
                  View
                </button>

                <button
                  className="px-4 py-2 text-white bg-red-500 rounded"
                  onClick={() => handleDelete(employee.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
