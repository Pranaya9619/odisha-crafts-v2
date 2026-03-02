import React, { useState } from "react";
import API from "../../services/api";

const SellerProfile = () => {
  const seller = JSON.parse(localStorage.getItem("sellerData"));

  const [quote, setQuote] = useState(seller?.quote || "");

  const handleSave = async () => {
    const token = localStorage.getItem("sellerToken");

    const res = await API.put(
      "/seller/profile",
      { quote },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem(
      "sellerData",
      JSON.stringify(res.data)
    );

    alert("Quote updated successfully!");
  };

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Seller Quote</h2>

      <textarea
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
        placeholder="Add your brand quote..."
        className="border p-3 w-full rounded"
      />

      <button
        onClick={handleSave}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default SellerProfile;