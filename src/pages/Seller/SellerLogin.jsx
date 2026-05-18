import React, {
  useState,
} from "react";

import API from "../../services/sellerApi";

import {
  useNavigate,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  Store,
  Mail,
  Lock,
  ArrowRight,
  User,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";

const SellerLogin = () => {

  const navigate =
    useNavigate();

  /* =========================================================
     STATES
  ========================================================= */

  const [
    mode,
    setMode,
  ] = useState("login");

  // login | register | verifyOtp | forgot

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  const [
    forgotStep,
    setForgotStep,
  ] = useState(1);

  const [
    form,
    setForm,
  ] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  /* =========================================================
     MODE SWITCH CLEANUP
  ========================================================= */

  const switchMode =
    (newMode) => {

      setMode(newMode);

      setError("");

      setSuccess("");

      setForm({
        name: "",
        email: "",
        password: "",
        otp: "",
      });

    };

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange =
    (e) => {

      setError("");

      setForm({
        ...form,

        [e.target.name]:
          e.target.value,
      });

    };

  /* =========================================================
     REGISTER → SEND OTP
  ========================================================= */

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        setSuccess("");

        await API.post(
          "/seller/register",
          {
            name:
              form.name,

            email:
              form.email,
          }
        );

        setSuccess(
          "OTP sent to your email"
        );

        setMode(
          "verifyOtp"
        );

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }
    };

  /* =========================================================
     VERIFY OTP
  ========================================================= */

  const handleVerifyOTP =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const res =
          await API.post(
            "/seller/verify-otp",
            {
              email:
                form.email,

              otp:
                form.otp,

              password:
                form.password,
            }
          );

        localStorage.setItem(
          "sellerToken",
          res.data.token
        );

        navigate(
          "/seller/onboarding/step-1"
        );

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
          "OTP verification failed"
        );

      } finally {

        setLoading(false);

      }
    };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        const res =
          await API.post(
            "/seller/login",
            {
              email:
                form.email,

              password:
                form.password,
            }
          );

        localStorage.setItem(
          "sellerToken",
          res.data.token
        );

        const seller =
          res.data.seller;

        if (
          !seller.onboardingCompleted
        ) {

          navigate(
            `/seller/onboarding/step-${seller.onboardingStep}`
          );

          return;

        }

        navigate(
          "/seller/dashboard"
        );

      } catch (err) {

        setError(
          err.response?.data
            ?.message ||
          "Login failed"
        );

      } finally {

        setLoading(false);

      }
    };

  /* =========================================================
     FORGOT PASSWORD
  ========================================================= */

  const handleForgotPassword =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        setError("");

        setSuccess("");

        // STEP 1 → SEND OTP
        if (forgotStep === 1) {

          await API.post(
            "/seller/forgot-password",
            {
              email: form.email,
            }
          );

          setSuccess(
            "OTP sent to your email"
          );

          setForgotStep(2);

        }

        // STEP 2 → RESET PASSWORD
        else {

          const res =
            await API.post(
              "/seller/reset-password",
              {
                email:
                  form.email,

                otp:
                  form.otp,

                password:
                  form.password,
              }
            );

          setSuccess(
            res.data.message
          );

          setTimeout(() => {

            switchMode("login");

            setForgotStep(1);

          }, 2000);

        }

      } catch (err) {

        setError(
          err.response?.data
            ?.message || "Failed"
        );

      } finally {

        setLoading(false);

      }

    };

  /* =========================================================
     GOOGLE LOGIN
  ========================================================= */

  const handleGoogleLogin =
    () => {

      window.location.href =
        "http://localhost:5000/api/seller/google";

    };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-stone-50">

      {/* LEFT PANEL */}

      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-orange-600 to-red-500 text-white p-12">

        <Store
          size={60}
          className="mb-6"
        />

        <h1 className="text-5xl font-bold mb-5">

          OdishaCrafts

        </h1>

        <p className="text-lg opacity-90 text-center max-w-md leading-relaxed">

          Build your storefront,
          manage handcrafted
          collections and grow
          your artisan business.

        </p>

      </div>

      {/* FORM PANEL */}

      <div className="flex items-center justify-center p-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
        >

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">

              {
                mode === "login" &&
                "Seller Login"
              }

              {
                mode === "register" &&
                "Create Seller Account"
              }

              {
                mode === "verifyOtp" &&
                "Verify OTP"
              }

              {
                mode === "forgot" &&
                "Forgot Password"
              }

            </h2>

            <p className="text-gray-500 mt-2">

              Welcome to your artisan marketplace.

            </p>

          </div>

          {error && (

            <div className="mb-4 bg-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">

              {error}

            </div>

          )}

          {success && (

            <div className="mb-4 bg-green-100 text-green-700 text-sm px-4 py-3 rounded-xl">

              {success}

            </div>

          )}

          {/* LOGIN */}

          {mode === "login" && (

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500"
                />

              </div>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black hover:bg-gray-900 text-white rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 transition"
              >

                {
                  loading
                    ? "Signing In..."
                    : "Login"
                }

                <ArrowRight size={18} />

              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300 rounded-2xl py-4 font-medium hover:bg-gray-100 transition flex items-center justify-center gap-3"
              >

                <FcGoogle size={22} />

                Continue with Google

              </button>

              <div className="flex justify-between text-sm text-gray-500 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    switchMode("register")
                  }
                  className="hover:text-orange-600"
                >

                  Create account

                </button>

                <button
                  type="button"
                  onClick={() =>
                    switchMode("forgot")
                  }
                  className="hover:text-orange-600"
                >

                  Forgot password?

                </button>

              </div>

            </form>

          )}

          {/* REGISTER */}

          {mode === "register" && (

            <form
              onSubmit={handleRegister}
              className="space-y-5"
            >

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500"
                />

              </div>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-2xl py-4 font-semibold transition"
              >

                {
                  loading
                    ? "Sending OTP..."
                    : "Send OTP"
                }

              </button>

              <p className="text-sm text-center text-gray-500">

                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() =>
                    switchMode("login")
                  }
                  className="text-orange-600 font-medium"
                >

                  Login

                </button>

              </p>

            </form>

          )}

          {/* VERIFY OTP */}

          {mode === "verifyOtp" && (

            <form
              onSubmit={handleVerifyOTP}
              className="space-y-5"
            >

              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={form.otp}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-orange-500"
              />

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-orange-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl py-4 font-semibold transition"
              >

                {
                  loading
                    ? "Verifying..."
                    : "Verify & Continue"
                }

              </button>

            </form>

          )}

          {/* FORGOT */}

          {mode === "forgot" && (

            <form
              onSubmit={handleForgotPassword}
              className="space-y-5"
            >

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-orange-500"
              />

              {/* OTP + PASSWORD */}

              {forgotStep === 2 && (

                <>

                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={form.otp}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-orange-500"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-2xl py-4 px-4 outline-none focus:border-orange-500"
                  />

                </>

              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-4 font-semibold transition"
              >

                {loading
                  ? "Processing..."
                  : forgotStep === 1
                    ? "Send OTP"
                    : "Reset Password"}

              </button>

              <p className="text-sm text-center text-gray-500">

                Remembered your password?{" "}

                <button
                  type="button"
                  onClick={() => {

                    switchMode("login");

                    setForgotStep(1);

                  }}
                  className="text-orange-600 font-medium"
                >

                  Login

                </button>

              </p>

            </form>

          )}

        </motion.div>

      </div>

    </div>
  );

};

export default SellerLogin;