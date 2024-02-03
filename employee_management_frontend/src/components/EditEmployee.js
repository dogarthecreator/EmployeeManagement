import React from 'react';
import EmployeeForm from './EmployeeForm';

const EditEmployee = ({ employee, onUpdate }) => {
    const handleUpdate = (updatedEmployee) => {
        onUpdate(updatedEmployee);
    };

    return (
        <div>
            <h2>Edit Employee</h2>
            <EmployeeForm initialEmployee={employee} onSave={handleUpdate} isEditing={true} />
        </div>
    );
};

export default EditEmployee;
