import React from 'react';

const DeleteEmployee = ({ employeeId, onDelete }) => {
    const handleDelete = () => {
        onDelete(employeeId);
    };

    return (
        <button onClick={handleDelete}>Delete</button>
    );
};

export default DeleteEmployee;
