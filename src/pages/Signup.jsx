// src/pages/Signup.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import InputField from "../components/ui/InputField";
import PageTransition from "../components/layout/PageTransition";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (pwd.length > 10) return "strong";
    if (pwd.length > 6) return "medium";
    if (pwd.length > 0) return "weak";
    return "";
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("Signup Data:", formData);

    // Fake success
    navigate("/login");
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 px-4 overflow-hidden">

        {/* Ambient Glow */}
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-orange-300/30 blur-3xl rounded-full"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Create Account ✨
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

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
              placeholder="Create a password"
            />

            {/* Password Strength Indicator */}
            {passwordStrength && (
              <div className="text-xs">
                <span
                  className={`font-medium ${
                    passwordStrength === "strong"
                      ? "text-green-600"
                      : passwordStrength === "medium"
                      ? "text-yellow-600"
                      : "text-red-500"
                  }`}
                >
                  Strength: {passwordStrength}
                </span>
              </div>
            )}

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl"
            >
              Sign Up
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:5000/api/auth/google";
              }}
              className="flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition shadow-sm"
            >
              <FcGoogle size={20} />
              Continue with Google
            </motion.button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Signup;