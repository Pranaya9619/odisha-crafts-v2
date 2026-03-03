import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ProfileLayout from "../components/profile/ProfileLayout";
import ProfileOverview from "../components/profile/ProfileOverview";
import ProfileSecurity from "../components/profile/ProfileSecurity";
import ProfileAddresses from "../components/profile/ProfileAddresses";
import ProfileOrders from "../components/profile/ProfileOrders";
import ProfileWishlist from "../components/profile/ProfileWishlist";
import ProfileCart from "../components/profile/ProfileCart";
import PageTransition from "../components/layout/PageTransition";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview setActiveTab={setActiveTab} />;
      case "security":
        return <ProfileSecurity />;
      case "addresses":
        return <ProfileAddresses />;
      case "orders":
        return <ProfileOrders />;
      case "wishlist":
        return <ProfileWishlist />;
      case "cart":
        return <ProfileCart />;
      default:
        return <ProfileOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header Row */}
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold"
            >
              My Account
            </motion.h1>

            <button
              onClick={() => navigate("/shop")}
              className="flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              Continue Shopping
              <ArrowLeft size={16} />
            </button>
          </div>

          <ProfileLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {renderContent()}
          </ProfileLayout>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;