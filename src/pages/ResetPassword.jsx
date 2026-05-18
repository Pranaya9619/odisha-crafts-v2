import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../components/layout/PageTransition";
import InputField from "../components/ui/InputField";

const ResetPassword = () => {

  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {

      const { data } = await axios.put(
        `http://localhost:5000/api/users/reset-password/${token}`,
        { password }
      );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Reset failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
        >

          <div className="text-center mb-6">

            <h1 className="text-3xl font-bold text-gray-800">
              Reset Password ✨
            </h1>

            <p className="text-gray-500 mt-2">
              Enter your new password
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >

            <InputField
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />

            {message && (
              <p className="text-sm text-green-600">
                {message}
              </p>
            )}

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Lock size={18} />

              {loading
                ? "Updating..."
                : "Reset Password"}
            </motion.button>

          </form>

        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ResetPassword;