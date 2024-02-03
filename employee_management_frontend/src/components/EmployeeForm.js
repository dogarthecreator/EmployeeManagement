import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const EmployeeForm = ({ initialEmployee, onSave, isEditing, employees }) => {
    const [employee, setEmployee] = useState({
        employee_id: '',
        name: '',
        email: '',
        department: '',
        date_of_birth: '',
        address: '',
        employment_status: '',
        salary: '',
        salary_due_date: '',
        image: null,
    });

    useEffect(() => {
        if (isEditing && initialEmployee) {
            setEmployee({
                ...initialEmployee,
                image: null
            });
        } else {
            
            const lastEmployee = employees[employees.length - 1];
            const nextEmployeeId = lastEmployee ? parseInt(lastEmployee.employee_id.split('EMP')[1]) + 1 : 1;
            setEmployee({
                ...employee,
                employee_id: `EMP${nextEmployeeId}`
            });
        }
    }, [initialEmployee, isEditing, employees]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleImageChange = (e) => {
        setEmployee({ ...employee, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(employee).forEach(key => {
            if (employee[key] != null) {
                formData.append(key, employee[key]);
            }
        });
    
        onSave(formData, isEditing);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Employee ID</Form.Label>
                <Form.Control type="text" name="employee_id" value={employee.employee_id} onChange={handleChange} placeholder="Employee ID" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name="department" value={employee.department} onChange={handleChange} placeholder="Department" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="date_of_birth" value={employee.date_of_birth} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control as="textarea" name="address" value={employee.address} onChange={handleChange} placeholder="Address" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Employment Status</Form.Label>
                <Form.Control as="select" name="employment_status" value={employee.employment_status} onChange={handleChange}>
                    <option value="">Select Status</option>
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="contract">Contract</option>
                    <option value="intern">Intern</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" name="salary" value={employee.salary} onChange={handleChange} placeholder="Salary" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Salary Due Date</Form.Label>
                <Form.Control type="date" name="salary_due_date" value={employee.salary_due_date} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleImageChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Save</Button>
        </Form>
    );
};

export default EmployeeForm;
