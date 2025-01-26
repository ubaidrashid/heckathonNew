import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function InputPop({ setOpen }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // You can replace this with your logic for submitting the new password (e.g., API call)
    console.log("New Password Submitted:", { newPassword });

    // After submission, close the popup
    setOpen(false);
    navigate("/loan");
    toast.success("Password successfully updated!", {
      position: "top-center",
      duration: 10000,
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#000000a1] flex justify-center items-center">
      <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-2xl shadow-lg w-96 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-xl text-gray-500 dark:text-gray-300"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Create New Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-[#2C2C2C] text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter New Password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-gray-50 dark:bg-[#2C2C2C] text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm New Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputPop;
