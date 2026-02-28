import React, { useState, useEffect } from "react";

const DashboardHome = ({ products }) => {
  const [profile, setProfile] = useState({ name: "Seller", photo: "" });

  useEffect(() => {
    const saved = localStorage.getItem("sellerProfile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        console.warn("Invalid profile in localStorage");
      }
    }
  }, []);

  // Dynamic stats
  const totalProducts = products.length;
  const totalOrders = products.reduce((acc, p) => acc + (p.orders || 0), 0); 
  const revenue = products.reduce(
    (acc, p) => acc + ((p.price || 0) * (p.stock || 0)),
    0
  );
  const pendingOrders = products.filter(p => p.status === "Pending").length;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 rounded-xl text-white flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, {profile.name || "Seller"} 👋
          </h2>
          <p className="mt-2 text-sm">
            Keep growing your Odisha Craft business today!
          </p>
        </div>
        <img
          src={profile.photo || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-white"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Products" value={totalProducts} />
        <Card title="Total Orders" value={totalOrders} />
        <Card title="Revenue" value={`₹${revenue}`} />
        <Card title="Pending Orders" value={pendingOrders} />
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default DashboardHome;