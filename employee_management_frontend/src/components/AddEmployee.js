import React from 'react';
import EmployeeForm from './EmployeeForm';

const AddEmployee = ({ onAdd }) => {
    const handleSave = (employee) => {
        onAdd(employee);
    };

    return (
        <div>
            <h2>Add Employee</h2>
            <EmployeeForm onSave={handleSave} />
        </div>
    );
};

export default AddEmployee;
