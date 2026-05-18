import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import InputField from "../components/ui/InputField";

const ForgotPassword = () => {

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");

    const [otp, setOTP] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    /* ================= SEND OTP ================= */

    const sendOTP = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {

            const { data } = await axios.post(
                "http://localhost:5000/api/users/forgot-password/send-otp",
                { email }
            );

            setMessage(data.message);

            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);

            setStep(2);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to send OTP."
            );

        } finally {
            setLoading(false);
        }
    };

    /* ================= RESET PASSWORD ================= */

    const resetPassword = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {

            const { data } = await axios.put(
                "http://localhost:5000/api/users/forgot-password/reset",
                {
                    email,
                    otp,
                    password,
                }
            );

            setMessage(data.message);

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
                            Forgot Password 🔐
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Reset your password using OTP
                        </p>

                    </div>

                    {/* STEP 1 */}

                    {step === 1 && (

                        <form
                            onSubmit={sendOTP}
                            className="flex flex-col gap-5"
                        >

                            <InputField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                            />

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={loading}
                                type="submit"
                                className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                            >
                                <Mail size={18} />

                                {loading
                                    ? "Sending..."
                                    : "Send OTP"}
                            </motion.button>

                        </form>
                    )}

                    {/* STEP 2 */}

                    {step === 2 && (

                        <form
                            onSubmit={resetPassword}
                            className="flex flex-col gap-5"
                        >

                            <InputField
                                label="OTP"
                                type="text"
                                value={otp}
                                onChange={(e) =>
                                    setOTP(e.target.value)
                                }
                                placeholder="Enter OTP"
                            />

                            <InputField
                                label="New Password"
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                            />

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
                    )}

                    {message && (
                        <p className="text-sm text-green-600 mt-4">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-red-500 mt-4">
                            {error}
                        </p>
                    )}

                </motion.div>
            </div>
        </PageTransition>
    );
};

export default ForgotPassword;