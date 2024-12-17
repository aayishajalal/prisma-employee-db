// src/components/EmployeeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To access the URL params
import { getEmployeeById } from '../../services/apiService'; // Importing the API function

const EmployeeDetails = () => {
  const { employeeId } = useParams(); // Getting the employeeId from the URL
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  // Fetch employee details when the component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(employeeId);
        setEmployee(data.data); // Assuming API response structure: { data: employee }
      } catch (error) {
        setError(error.message || 'Error fetching employee details');
      }
    };

    fetchEmployee();
  }, [employeeId]); // Rerun the effect if employeeId changes

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white shadow-md rounded p-4">
        <p><strong>Employee ID:</strong> {employee.employeeId}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoining).toLocaleDateString()}</p>
        <p><strong>Role:</strong> {employee.role}</p>
      </div>
    </div>
  );
};

export default EmployeeDetails;
