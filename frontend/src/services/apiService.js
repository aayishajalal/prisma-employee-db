// src/apiService.js
import axios from 'axios';

// Base URL for the API, update it with your server's URL
const BASE_URL = 'http://localhost:5000/api/employee'; // Updated with /employee

// Axios instance for configuring defaults (optional)
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new employee
export const createEmployee = async (employeeData) => {
  try {
    const response = await api.post('/create-employee', employeeData); // Updated path
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get all employees
export const getAllEmployees = async () => {
  try {
    const response = await api.get('/get-employees'); // Updated path
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get employee by ID
export const getEmployeeById = async (employeeId) => {
  try {
    const response = await api.get(`/get-employee/${employeeId}`); // Updated path
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Delete employee by ID
export const deleteEmployeeById = async (employeeId) => {
  try {
    const response = await api.delete(`/delete-employee/${employeeId}`); // Updated path
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
