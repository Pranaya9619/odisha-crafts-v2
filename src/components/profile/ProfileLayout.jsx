import React from "react";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border p-6 min-h-[500px]">
        {children}
      </div>

    </div>
  );
};

export default ProfileLayout;