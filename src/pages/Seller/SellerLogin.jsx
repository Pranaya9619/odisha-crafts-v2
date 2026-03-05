import React, { useState } from "react";
import API from "../../services/sellerApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store } from "lucide-react";

const SellerLogin = () => {
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    district: "",
  });

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    const url = isRegister ? "/seller/register" : "/seller/login";

    try {

      setError(""); // clear previous error

      const res = await API.post(url, form);

      console.log("SELLER LOGIN RESPONSE:", res.data);

      localStorage.setItem("sellerToken", res.data.token);

      navigate("/seller/dashboard");

    } catch (err) {

      console.log(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Account not found. Please register first.");
      }

    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-stone-50">

      {/* Left branding panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-orange-600 to-red-500 text-white p-12">

        <Store size={60} className="mb-6" />

        <h1 className="text-4xl font-bold mb-4">
          OdishaCrafts
        </h1>

        <p className="text-lg text-center opacity-90 max-w-md">
          Manage your craft store, upload products,
          track orders and grow your artisan business.
        </p>

      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6">

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-5"
        >

          <h2 className="text-2xl font-bold text-center">
            {isRegister ? "Seller Register" : "Seller Login"}
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {isRegister && (
            <>
              <input name="name" placeholder="Name" onChange={handleChange} className="border p-3 w-full rounded-lg" />
              <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-3 w-full rounded-lg" />
              <input name="district" placeholder="District" onChange={handleChange} className="border p-3 w-full rounded-lg" />
            </>
          )}

          <input name="email" placeholder="Email" onChange={handleChange} className="border p-3 w-full rounded-lg" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 w-full rounded-lg"
          />

          <button className="bg-orange-600 hover:bg-orange-700 text-white w-full py-3 rounded-lg font-medium transition">
            {isRegister ? "Register Seller" : "Login"}
          </button>

          <p
            onClick={() => {
              setError("");
              setIsRegister(!isRegister);
            }}
            className="text-center text-sm cursor-pointer text-orange-600 hover:underline"
          >
            {isRegister ? "Already have an account? Login" : "Create seller account"}
          </p>

        </motion.form>

      </div>
    </div>
  );
};

export default SellerLogin;