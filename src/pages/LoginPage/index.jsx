import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../redux/Slices/auth";
import API from "../../utils/api";
import { signInWithGooglePopup } from "../../utils/firebase";
import { toast, Toaster } from "react-hot-toast";
import PopUp from "./inputPop";

function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, userData } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // onSubmitHandler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");

    try {
      setOpen(true);
      toast.success(
        "Enter a new password sent by an email.",
        { position: "top-center", duration: 10000 }
      );
    } catch (error) {
      dispatch(loginFailure(error));
      toast.error("Login failed!");
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    try {
      const googleResponse = await signInWithGooglePopup();
      const { displayName, email, photoURL } = googleResponse.user;

      const response = await API.post("/auth/google", {
        userName: displayName,
        email: email,
        profilePic: photoURL,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(response.data.data));
      toast.success("Login successful!");
    } catch (error) {
      dispatch(loginFailure(error || "Google login failed"));
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-[#121212] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to your account
          </h1>
          <form className="space-y-4" onSubmit={onSubmitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-600 focus:border-blue-600"
                placeholder="name@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-blue-600 focus:border-blue-600"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-4 flex items-center justify-center bg-[#4285F4] hover:bg-[#357AE8] text-white py-2.5 rounded-lg text-sm font-medium"
          >
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              fill="currentColor"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504C110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
            Sign in with Google
          </button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/Register"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {open && <PopUp setOpen={setOpen} />}
    </section>
  );
}

export default LoginForm;
