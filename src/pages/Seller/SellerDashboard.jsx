import React, { useState, useEffect } from "react";
import ManageArtisans from "./ManageArtisans";
import ManageProducts from "./ManageProducts";
import SellerProfile from "./SellerProfile";
import { useLocation } from "react-router-dom";

const SellerDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("artisans");

    // 🔥 Sync tab with URL query
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get("tab");

        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen flex bg-stone-100">

            {/* Sidebar */}
            <div className="w-64 bg-stone-900 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Seller Panel</h2>

                <ul className="space-y-4">
                    <li
                        onClick={() => {
                            window.history.replaceState(null, "", "?tab=artisans");
                            setActiveTab("artisans");
                        }}
                        className={`cursor-pointer transition ${activeTab === "artisans"
                                ? "text-orange-400 font-semibold"
                                : "hover:text-orange-400"
                            }`}
                    >
                        Artisans
                    </li>

                    <li
                        onClick={() => {
                            window.history.replaceState(null, "", "?tab=products");
                            setActiveTab("products");
                        }}
                        className={`cursor-pointer transition ${activeTab === "products"
                                ? "text-orange-400 font-semibold"
                                : "hover:text-orange-400"
                            }`}
                    >
                        Products
                    </li>

                    <li
                        onClick={() => {
                            window.history.replaceState(null, "", "?tab=profile");
                            setActiveTab("profile");
                        }}
                        className={`cursor-pointer transition ${activeTab === "profile"
                                ? "text-orange-400 font-semibold"
                                : "hover:text-orange-400"
                            }`}
                    >
                        Profile
                    </li>
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
                {activeTab === "artisans" && <ManageArtisans />}
                {activeTab === "products" && <ManageProducts />}
                {activeTab === "profile" && <SellerProfile />}
            </div>
        </div>
    );
};

export default SellerDashboard;