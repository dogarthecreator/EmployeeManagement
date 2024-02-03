import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

const EmployeeProfile = ({ employee, onHide }) => {
  return (
    <Card>
      <Card.Header>
        <Button variant="danger" size="sm" onClick={onHide}>
          Close
        </Button>
      </Card.Header>
      <Card.Body className="text-center">
        <div className="d-flex justify-content-center mb-4">
          <img
            src={employee.image}
            alt={employee.name}
            className="img-fluid rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <h4 className="mb-3">{employee.name}</h4>
        <p>
          <strong>Employee ID:</strong> {employee.employee_id}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Date of Birth:</strong> {employee.date_of_birth}
        </p>
        <p>
          <strong>Address:</strong> {employee.address}
        </p>
        <p>
          <strong>Employment Status:</strong> {employee.employment_status}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary}
        </p>
        <p>
          <strong>Salary Due Date:</strong> {employee.salary_due_date}
        </p>
      </Card.Body>
    </Card>
  );
};

export default EmployeeProfile;
