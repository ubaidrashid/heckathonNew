import React, { useState } from "react";
import PopUp from "./PopUp";

const LandingPage = () => {
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [open, setOpen] = useState(false);

  const handleProcced = () => {
    setOpen(true);
  };

  const handleCalculate = () => {
    if (!loanType || !loanAmount || !repaymentPeriod) {
      alert("Please fill in all fields!");
      return;
    }

    const interestRate = 0.10;
    const repaymentMonths = parseInt(repaymentPeriod) * 12;
    const totalAmount = parseFloat(loanAmount) * (1 + interestRate);
    const monthlyPayment = (totalAmount / repaymentMonths).toFixed(2);

    setMonthlyPayment(monthlyPayment);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 flex flex-col items-center justify-center">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 w-full py-4 text-white text-center shadow-lg">
        <h1 className="text-4xl font-extrabold">Saylani Microfinance</h1>
        <p className="text-sm mt-2 font-light">Empowering Communities with Financial Solutions</p>
      </header>

      {/* Main Content Section */}
      <main className="mt-10 w-11/12 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Loan Categories */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Loan Categories</h2>
          <ul className="space-y-3">
            <li className="bg-gray-700 hover:bg-green-600 p-4 rounded-lg shadow transition duration-200">
              Wedding Loans
            </li>
            <li className="bg-gray-700 hover:bg-green-600 p-4 rounded-lg shadow transition duration-200">
              Home Construction Loans
            </li>
            <li className="bg-gray-700 hover:bg-green-600 p-4 rounded-lg shadow transition duration-200">
              Business Startup Loans
            </li>
            <li className="bg-gray-700 hover:bg-green-600 p-4 rounded-lg shadow transition duration-200">
              Education Loans
            </li>
          </ul>
        </div>

        {/* Loan Calculator */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-green-400">Loan Calculator</h2>
          <form className="space-y-4">
            <select
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setLoanType(e.target.value)}
            >
              <option value="">Select Loan Type</option>
              <option value="Wedding Loans">Wedding Loans</option>
              <option value="Home Construction Loans">Home Construction Loans</option>
              <option value="Business Startup Loans">Business Startup Loans</option>
              <option value="Education Loans">Education Loans</option>
            </select>

            <input
              type="number"
              placeholder="Enter Amount"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setLoanAmount(e.target.value)}
            />

            <select
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setRepaymentPeriod(e.target.value)}
            >
              <option value="">Select Repayment Period</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
            </select>

            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
              onClick={handleCalculate}
            >
              Calculate
            </button>
          </form>

          {monthlyPayment && (
            <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-green-400">Calculation Result:</h3>
              <p className="text-gray-300">Your Monthly Payment: <span className="font-bold text-green-500">{monthlyPayment} PKR</span></p>
              <button
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                onClick={handleProcced}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="mt-10 py-4 bg-gray-900 text-gray-400 w-full text-center">
        <p>&copy; 2025 Saylani Microfinance. All rights reserved.</p>
      </footer>

      {open ? <PopUp setOpen={setOpen} /> : null}
    </div>
  );
};

export default LandingPage;
