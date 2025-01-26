import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PopUp({ setOpen }) {
  // State to store form input values
  const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { cnic, email, name });
    setOpen(false);
  };

  const onSubmit = () => {
    navigate("/login");
    toast.success("Check your Gmail", {
      position: "top-center",
      duration: 10000,
    });
  };

  return (
    <div className="fixed h-screen w-full top-0 left-0 z-[1000] bg-[#000000a1]">
      {/* Centered Popup Form */}
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-lg w-96 relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 text-xl text-gray-400 hover:text-gray-200"
            onClick={() => setOpen(false)}
          >
            x
          </button>

          <h2 className="text-xl font-semibold mb-4 text-gray-200">Enter Your Details</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cnic" className="block text-sm font-medium text-gray-400">CNIC</label>
              <input
                id="cnic"
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter CNIC"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Email"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Your Name"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-gray-900 py-2 rounded-lg hover:bg-green-500"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
