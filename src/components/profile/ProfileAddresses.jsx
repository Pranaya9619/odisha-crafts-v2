import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const emptyForm = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

const ProfileAddresses = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshProfile = async () => {
    const res = await API.get("/users/profile");
    setUser(res.data);
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/users/address/${editingId}`, form);
      } else {
        await API.post("/users/address", form);
      }

      await refreshProfile();
      setForm(emptyForm);
      setEditingId(null);
    } catch {
      alert("Address save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address) => {
    setForm(address);
    setEditingId(address._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/address/${id}`);
      await refreshProfile();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-10">

      {/* Address List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>

        {user.addresses?.length === 0 && (
          <p className="text-gray-500 text-sm">No addresses added yet.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {user.addresses?.map((addr) => (
            <motion.div
              key={addr._id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl p-4 space-y-2 relative"
            >
              {addr.isDefault && (
                <span className="absolute top-3 right-3 text-xs bg-orange-600 text-white px-2 py-1 rounded-full">
                  Default
                </span>
              )}

              <p className="font-medium">{addr.fullName}</p>
              <p className="text-sm text-gray-600">{addr.phone}</p>
              <p className="text-sm">
                {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
              </p>

              <div className="flex gap-4 pt-3 text-sm">
                <button
                  onClick={() => handleEdit(addr)}
                  className="text-orange-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add / Edit Form */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Address" : "Add New Address"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
          <input name="street" placeholder="Street" value={form.street} onChange={handleChange} className="border px-3 py-2 rounded-lg md:col-span-2" />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
          <input name="state" placeholder="State" value={form.state} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
          <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} className="border px-3 py-2 rounded-lg" />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isDefault"
            checked={form.isDefault}
            onChange={handleChange}
          />
          Set as default address
        </label>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            {editingId ? "Update Address" : "Add Address"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
              }}
              className="border px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProfileAddresses;