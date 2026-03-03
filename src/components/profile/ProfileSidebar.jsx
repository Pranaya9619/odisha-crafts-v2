import React from "react";
import { User, Shield, MapPin, Package, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { key: "overview", label: "Overview", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "addresses", label: "Addresses", icon: MapPin },
    { key: "orders", label: "Orders", icon: Package },
    { key: "wishlist", label: "Wishlist", icon: Heart },
    { key: "cart", label: "Cart", icon: ShoppingBag },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-4">
      <div className="space-y-2">
        {menuItems.map(({ key, label, icon: Icon }) => {
          const isActive = activeTab === key;

          return (
            <motion.button
              key={key}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left
                ${
                  isActive
                    ? "bg-orange-600 text-white shadow-md"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;