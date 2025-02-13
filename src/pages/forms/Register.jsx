import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import IMG from "../../images/img1.png"; 
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate import
import LOGO from"../../images/logo.png"
import { motion } from 'framer-motion';

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(userData));
      navigate("/"); // Navigate to the home page after successful registration
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="card flex flex-col md:flex-row justify-center shadow-lg rounded-lg overflow-hidden w-11/12 max-w-4xl">
         
        {/* Form Section */}
        <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
        <div className="flex mb-4 items-center gap-x-1 text-xl font-semibold">
     
      <motion.img
              src={LOGO}
              alt="logo"
             
              whileTap={{ scale: 0.5 }}
            />
   
        <a>Jobify</a>
      </div>
          <h2 className="text-2xl font-bold text-primary text-center">
            Create an Account
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Join us and start your journey.
          </p>

          <form onSubmit={handleSubmit} className=" w-full mt-6 space-y-4">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring focus:ring-primary focus:outline-none"
                required
              />
            </div>

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
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring focus:ring-primary focus:outline-none"
                required
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
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md bg-transparent focus:ring focus:ring-primary focus:outline-none"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full btn btn-primary"
            >
              Register
            </button>
          </form>

          {/* Footer Text */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
            .
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={IMG}
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;

