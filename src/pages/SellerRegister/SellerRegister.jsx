import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    emailOrPhone: "",
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

  // ✅ LOGIN
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Save seller login status
    localStorage.setItem("seller", "true");

    alert("Login Successful!");
    navigate("/seller-dashboard");
  };

  // ✅ REGISTER
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Seller Registered:", formData);

    alert("Seller Registration Successful!");
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Become a Seller"}
        </h2>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Mobile Number"
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

            <button className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-600">
              Sign In
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
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="district" placeholder="District" onChange={handleChange} required className="w-full border p-2 rounded" />
            <input type="text" name="craft" placeholder="Craft Type" onChange={handleChange} required className="w-full border p-2 rounded" />

            <button className="w-full bg-orange-700 text-white py-2 rounded hover:bg-orange-600">
              Register
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