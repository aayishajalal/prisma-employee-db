// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails/EmployeeDetails';
import Form from './components/Form/Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
        
        <Route path="/create-employee" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
