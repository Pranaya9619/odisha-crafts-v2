import React, { useState } from "react";
import API from "../../services/sellerApi";

const SellerSettings = () => {

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return setMessage("New passwords do not match");
    }

    try {

      const res = await API.put("/seller/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setMessage(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="max-w-lg">

      <h1 className="text-2xl font-semibold mb-6">
        Seller Settings
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Update Password
        </button>

      </form>

      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}

    </div>
  );
};

export default SellerSettings;