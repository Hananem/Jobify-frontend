import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice"; // Import the login action creator
import { useNavigate } from "react-router-dom";
import IMG from "../../images/img1.png"; 
import { Link } from "react-router-dom";
import LOGO from"../../images/logo.png"
import { motion } from 'framer-motion';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credentials = { email, password };
      await dispatch(loginUser(credentials)); // Dispatch login action
      navigate("/"); // Navigate to home page after successful login
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error message)
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="card flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-11/12 max-w-4xl">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={IMG}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center items-center p-8 md:w-1/2">
        <div className="flex mb-4 items-center gap-x-1 text-xl font-semibold">
     
      <motion.img
              src={LOGO}
              alt="logo"
             
              whileTap={{ scale: 0.5 }}
            />
   
        <a>Jobify</a>
      </div>
          <h2 className="text-2xl font-bold text-primary text-center">
            Login to Your Account
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring focus:ring-green-300 focus:outline-none"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="text-green-500 focus:primary bg-transparent rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-green-500 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full btn btn-primary"
            >
              Login
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
