import React, { useState, useEffect } from "react";

const Profile = ({ onUpdate }) => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    district: "",
    craft: "",
    bank: "",
    photo: "",
  });

  // Load saved profile
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sellerProfile"));
    if (saved) setProfile(saved);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, photo: imageUrl });
    }
  };

  const handleSubmit = () => {
    localStorage.setItem("sellerProfile", JSON.stringify(profile));
    if (onUpdate) onUpdate(profile);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">

      {/* Profile Picture */}
      <div className="flex flex-col items-center space-y-3">
        <img
          src={profile.photo || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>

      <input
        name="name"
        placeholder="Name"
        value={profile.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={profile.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="district"
        placeholder="District"
        value={profile.district}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="craft"
        placeholder="Craft Type"
        value={profile.craft}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        name="bank"
        placeholder="Bank Details (Demo)"
        value={profile.bank}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-orange-600 text-white px-4 py-2 rounded w-full"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;