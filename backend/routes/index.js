const express = require('express');
const router = express.Router();

// const authRoutes = require("./authRoutes/authRoutes");
const employeeRoutes = require("./employeeRoutes/employeeRoutes"); // Correct import

// router.use("/auth", authRoutes);       // Route for authentication
router.use("/employee", employeeRoutes); // Correct route for employee endpoints

module.exports = router;
