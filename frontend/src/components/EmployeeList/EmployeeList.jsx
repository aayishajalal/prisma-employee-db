// src/components/EmployeeList.jsx
import React, { useState, useEffect } from 'react';
import { getAllEmployees, deleteEmployeeById } from '../../services/apiService'; // Importing API functions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

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
        setError(error.message || 'Error fetching employees');
      }
    };

    fetchEmployees();
  }, []);

  // Handle deleting an employee
  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployeeById(employeeId);
      setEmployees(employees.filter(employee => employee.employeeId !== employeeId)); // Remove deleted employee from the list
    } catch (error) {
      setError(error.message || 'Error deleting employee');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* Create Employee Button */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate('/create-employee')} // Navigate to /create-employee
      >
        Create Employee
      </button>

      <table className="table-auto w-full border-collapse">
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
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => window.location.href = `/employees/${employee.employeeId}`}>View</button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(employee.employeeId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
