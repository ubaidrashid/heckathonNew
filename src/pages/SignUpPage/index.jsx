import React, { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../redux/Slices/auth";
import toast from "react-hot-toast";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    dispatch(signupStart());
    if (!userName || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", { userName, email, password });
      dispatch(signupSuccess(res.data));
      toast.success("Signup successful!");
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.name === "AxiosError"
          ? error.response.data.message
          : "Signup failed!";
      dispatch(signupFailure(error));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="dark:bg-[#121212] py-10 min-h-screen flex items-center">
      <form className="max-w-sm mx-auto dark:bg-[#1E1E1E] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
          Register New Account
        </h2>

        {/* Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full p-2.5 rounded-lg shadow-sm text-sm border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2.5 rounded-lg shadow-sm text-sm border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2.5 rounded-lg shadow-sm text-sm border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={onRegisterHandler}
          className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register New Account"}
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
