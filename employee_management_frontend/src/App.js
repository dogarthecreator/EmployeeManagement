import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeProfile from "./components/EmployeeProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Card } from "react-bootstrap";

import "./App.css";


function App() {
  const [employees, setEmployees] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:8000/employees/")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const handleAddNewEmployee = () => {
    setEditingEmployee(null);
    setSelectedEmployee(null);
    setShowFormModal(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowFormModal(true);
  };

  const handleDelete = (employeeId) => {
    axios
      .delete(`http://localhost:8000/employees/${employeeId}/`)
      .then(() => fetchEmployees())
      .catch((err) => console.error(err));
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setShowProfileModal(true);
  };


  const onSave = (formData, isEditing) => {
    const apiUrl = isEditing ? `http://localhost:8000/employees/${selectedEmployee.id}/` : 'http://localhost:8000/employees/';


    const method = isEditing ? 'PUT' : 'POST';

    // Define the headers for the API request
    const headers = {
        'Content-Type': 'multipart/form-data',
    };

    axios({
        method,
        url: apiUrl,
        data: formData,
        headers,
    })
    .then(response => {

        if (isEditing) {

            const updatedEmployees = employees.map(emp => {
                if (emp.id === selectedEmployee.id) {
                    return response.data;
                }
                return emp;
            });
            setEmployees(updatedEmployees);
            setSelectedEmployee(null); 
        } else {
            setEmployees([...employees, response.data]);
        }
        console.log('Employee saved successfully:', response.data);
    })
    .catch(error => {
        console.error('Error saving employee:', error);
    });
};


  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Assuming you have an employee_id field
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employment_status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.salary.toString().includes(searchTerm) ||
    (employee.salary_due_date && employee.salary_due_date.toString().includes(searchTerm)) ||
    (employee.date_of_birth && employee.date_of_birth.toString().includes(searchTerm))
);


return (
  <div className="container mt-4">
  <h1 className="app-title">Employee Management</h1>
  <Button variant="primary" onClick={handleAddNewEmployee}>
    Add New Employee
  </Button>

    <input
      type="text"
      className="form-control my-3 search-input"
      placeholder="Search employees"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />

    <Modal show={showFormModal} onHide={() => setShowFormModal(false)} centered>
      <Modal.Body>
        <EmployeeForm
          initialEmployee={selectedEmployee}
          onSave={onSave}
          isEditing={!!selectedEmployee}
          employees={employees}
        />
      </Modal.Body>
    </Modal>

    <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
      <Modal.Body>
        {selectedEmployee && (
          <EmployeeProfile employee={selectedEmployee} onHide={() => setShowProfileModal(false)} />
        )}
      </Modal.Body>
    </Modal>

    <ul className="list-group">
      {filteredEmployees.map((employee) => (
        <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {employee.employee_id} - {employee.name} - {employee.department}
          </div>
          <div>
            <Button variant="secondary" onClick={() => handleEdit(employee)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(employee.id)}>
              Delete
            </Button>
            <Button variant="info" onClick={() => handleViewProfile(employee)}>
              View Profile
            </Button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;