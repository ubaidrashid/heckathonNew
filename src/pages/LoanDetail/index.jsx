import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LoanDetail = () => {
  const [guarantor1, setGuarantor1] = useState({ name: "", email: "", location: "", cnic: "" });
  const [guarantor2, setGuarantor2] = useState({ name: "", email: "", location: "", cnic: "" });
  const [personalInfo, setPersonalInfo] = useState({ address: "", phone: "" });
  const [statement, setStatement] = useState(null); // For statement file
  const [salarySheet, setSalarySheet] = useState(null); // For salary sheet file
  const [error, setError] = useState(""); // Error state to show modal

  const navigate = useNavigate(); // useNavigate hook for redirection

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]); // Set the selected file
  };

  const validateForm = () => {
    // Check if any input field is empty
    if (
      !guarantor1.name ||
      !guarantor1.email ||
      !guarantor1.location ||
      !guarantor1.cnic ||
      !guarantor2.name ||
      !guarantor2.email ||
      !guarantor2.location ||
      !guarantor2.cnic ||
      !personalInfo.address ||
      !personalInfo.phone
    ) {
      setError("Please fill in all fields before submitting.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const loanDetails = {
      guarantor1,
      guarantor2,
      personalInfo,
      statement,
      salarySheet,
    };
    console.log("Loan Request Details: ", loanDetails);
    
    // Redirect to the receipt page with the loanDetails
    navigate("/receipt", { state: loanDetails });
  };

  const closeModal = () => {
    setError(""); // Close the modal by resetting the error message
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
            <p>{error}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6">Loan Request Details</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-3xl shadow-lg space-y-6"
      >
        {/* Guarantor 1 Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Guarantor 1 Details</h3>
          <div className="space-y-4">
            <InputField
              id="guarantor1Name"
              label="Name"
              value={guarantor1.name}
              onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
              placeholder="Enter Name"
            />
            <InputField
              id="guarantor1Email"
              label="Email"
              value={guarantor1.email}
              onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
              placeholder="Enter Email"
            />
            <InputField
              id="guarantor1Location"
              label="Location"
              value={guarantor1.location}
              onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
              placeholder="Enter Location"
            />
            <InputField
              id="guarantor1Cnic"
              label="CNIC"
              value={guarantor1.cnic}
              onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
              placeholder="Enter CNIC"
            />
          </div>
        </div>

        {/* Guarantor 2 Details */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Guarantor 2 Details</h3>
          <div className="space-y-4">
            <InputField
              id="guarantor2Name"
              label="Name"
              value={guarantor2.name}
              onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
              placeholder="Enter Name"
            />
            <InputField
              id="guarantor2Email"
              label="Email"
              value={guarantor2.email}
              onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
              placeholder="Enter Email"
            />
            <InputField
              id="guarantor2Location"
              label="Location"
              value={guarantor2.location}
              onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
              placeholder="Enter Location"
            />
            <InputField
              id="guarantor2Cnic"
              label="CNIC"
              value={guarantor2.cnic}
              onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
              placeholder="Enter CNIC"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <InputField
              id="address"
              label="Address"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              placeholder="Enter Address"
            />
            <InputField
              id="phone"
              label="Phone Number"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        {/* Optional Files Upload */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Optional Documents</h3>
          <div className="space-y-4">
            <FileInput
              id="statement"
              label="Statement"
              onChange={(e) => handleFileChange(e, setStatement)}
            />
            <FileInput
              id="salarySheet"
              label="Salary Sheet"
              onChange={(e) => handleFileChange(e, setSalarySheet)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-light-green text-gray-900 py-2 rounded-lg hover:bg-green-400"
        >
          Submit Loan Request
        </button>
      </form>
    </div>
  );
};

export default LoanDetail;

const InputField = ({ id, label, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 bg-gray-700 border border-light-green rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-light-green"
    />
  </div>
);

const FileInput = ({ id, label, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white mb-2">
      {label}
    </label>
    <input
      type="file"
      id={id}
      onChange={onChange}
      className="w-full p-3 bg-gray-700 border border-light-green rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-light-green"
    />
  </div>
);
