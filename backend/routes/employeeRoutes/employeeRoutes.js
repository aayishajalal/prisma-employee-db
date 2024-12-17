const express = require('express');
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
} = require('../../controller/employeeController/employeeController');

const router = express.Router();

router.post('/create-employee', createEmployee);
router.get('/get-employees', getAllEmployees);
router.get('/get-employee/:employeeId', getEmployeeById); // Updated
router.delete('/delete-employee/:employeeId', deleteEmployeeById); // Updated

module.exports = router;
