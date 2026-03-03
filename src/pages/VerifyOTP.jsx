import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/layout/PageTransition";
import API, { setAccessToken } from "../services/api";
import { useAuth } from "../context/AuthContext";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/signup");
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      // 🔥 Login user after verification
      setAccessToken(res.data.accessToken);
      setUser(res.data.user);

      navigate("/", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 px-4">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            Verify Your Email 📩
          </h1>

          <p className="text-center text-gray-500 text-sm mb-6">
            Enter the 6-digit code sent to
            <br />
            <span className="font-medium text-gray-700">{email}</span>
          </p>

          <form onSubmit={handleVerify} className="flex flex-col gap-4">

            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-xl px-4 py-3 text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </motion.button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-500">
            Didn’t receive the code?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-orange-600 cursor-pointer hover:underline"
            >
              Sign up again
            </span>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default VerifyOTP;