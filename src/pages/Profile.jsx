import React, { useState } from "react";
import { motion } from "framer-motion";
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

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProfileOverview />;
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
        return <ProfileOverview />;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-serif font-bold mb-8"
          >
            My Account
          </motion.h1>

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