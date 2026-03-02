import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { setAccessToken } from "../../services/api";

const SellerRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    district: "",
    craft: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError(null);

        const res = await API.post("/seller/login", loginData);

        const { accessToken, seller } = res.data;

        // Store seller token separately
        localStorage.setItem("sellerToken", accessToken);
        localStorage.setItem("sellerData", JSON.stringify(seller));

        navigate("/seller-dashboard");
    } catch (err) {
        setError(
        err.response?.data?.message || "Login failed. Try again."
        );
    } finally {
        setLoading(false);
    }
    };

    const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError(null);

        const res = await API.post("/seller/register", formData);

        const { accessToken, seller } = res.data;

        localStorage.setItem("sellerToken", accessToken);
        localStorage.setItem("sellerData", JSON.stringify(seller));

        navigate("/seller-dashboard");
    } catch (err) {
        setError(
        err.response?.data?.message ||
            "Registration failed. Try again."
        );
    } finally {
        setLoading(false);
    }
    };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Seller Login" : "Become a Seller"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleLoginChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm mt-4">
              Not registered?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-orange-700 font-semibold"
              >
                Create Account
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="craft"
              placeholder="Craft Type"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-orange-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SellerRegister;