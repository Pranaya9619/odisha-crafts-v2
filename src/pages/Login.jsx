// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../components/ui/InputField";
import { LogIn } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Fake success login
    navigate("/");
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 px-4 overflow-hidden">

        {/* Background Glow */}
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-orange-300/30 blur-3xl rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md"
        >
          
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back ✨
            </h1>
            <p className="text-gray-500 mt-2">
              Sign in to explore Odisha’s timeless crafts
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
            >
              <LogIn size={18} />
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-600 font-medium cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;