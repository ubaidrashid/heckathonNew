import React from "react";
import { useLocation } from "react-router-dom";

const Receipt = () => {
  const { state } = useLocation(); // Access passed data via state
  const { guarantor1, guarantor2, personalInfo, statement, salarySheet } = state;

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-3xl shadow-lg space-y-6 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Loan Request Receipt</h2>

        {/* Guarantor 1 Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Guarantor 1 Details</h3>
          <div className="space-y-2 bg-gray-700 p-4 rounded-lg">
            <p><strong>Name:</strong> {guarantor1.name}</p>
            <p><strong>Email:</strong> {guarantor1.email}</p>
            <p><strong>Location:</strong> {guarantor1.location}</p>
            <p><strong>CNIC:</strong> {guarantor1.cnic}</p>
          </div>
        </div>

        {/* Guarantor 2 Details */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Guarantor 2 Details</h3>
          <div className="space-y-2 bg-gray-700 p-4 rounded-lg">
            <p><strong>Name:</strong> {guarantor2.name}</p>
            <p><strong>Email:</strong> {guarantor2.email}</p>
            <p><strong>Location:</strong> {guarantor2.location}</p>
            <p><strong>CNIC:</strong> {guarantor2.cnic}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Personal Information</h3>
          <div className="space-y-2 bg-gray-700 p-4 rounded-lg">
            <p><strong>Address:</strong> {personalInfo.address}</p>
            <p><strong>Phone:</strong> {personalInfo.phone}</p>
          </div>
        </div>

        {/* Optional Files */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Optional Documents</h3>
          <div className="space-y-2 bg-gray-700 p-4 rounded-lg">
            {statement && <p><strong>Statement File:</strong> {statement.name}</p>}
            {salarySheet && <p><strong>Salary Sheet File:</strong> {salarySheet.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
