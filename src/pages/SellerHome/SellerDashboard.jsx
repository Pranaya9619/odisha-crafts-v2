import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import ManageProducts from "./ManageProducts";
import Orders from "./Order";
import Earnings from "./Earnings";
import Profile from "./Profile";
import Notifications from "./Notifications";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]); // Shared products state
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("seller");
    alert("Logged out successfully");
    navigate("/seller-register");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome products={products} />;
      case "products":
        return <ManageProducts products={products} setProducts={setProducts} />;
      case "orders":
        return <Orders />; // You can pass products or orders state if needed
      case "earnings":
        return <Earnings products={products} />; // Optional: use products for revenue
      case "profile":
        return <Profile />;
      case "notifications":
        return <Notifications />;
      default:
        return <DashboardHome products={products} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-stone-100">

      {/* Sidebar */}
      <div className="w-64 bg-stone-900 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Seller Panel</h2>
        <ul className="space-y-4">
          <li onClick={() => setActiveTab("dashboard")} className="cursor-pointer hover:text-orange-400">Dashboard</li>
          <li onClick={() => setActiveTab("products")} className="cursor-pointer hover:text-orange-400">Products</li>
          <li onClick={() => setActiveTab("orders")} className="cursor-pointer hover:text-orange-400">Orders</li>
          <li onClick={() => setActiveTab("earnings")} className="cursor-pointer hover:text-orange-400">Earnings</li>
          <li onClick={() => setActiveTab("profile")} className="cursor-pointer hover:text-orange-400">Profile</li>
          <li onClick={() => setActiveTab("notifications")} className="cursor-pointer hover:text-orange-400">Notifications</li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default SellerDashboard;