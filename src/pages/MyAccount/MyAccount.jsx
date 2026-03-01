import React, { useState } from "react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

const MyAccount = () => {
  const { wishlist, orders, addOrder, cart } = useStore(); // Added orders
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("orders");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const tabs = [
    { key: "orders", label: "My Orders" },
    { key: "wishlist", label: "Wishlist" },
    { key: "wallet", label: "Wallet" },
    { key: "profile", label: "My Profile" },
    { key: "settings", label: "Settings" },
    { key: "support", label: "Customer Service" },
  ];

  // Add or edit address
  const handleAddAddress = () => {
    if (!newAddress) return;
    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = newAddress;
      setAddresses(updated);
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    setNewAddress("");
  };

  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
  };

  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome {user?.name || "Guest"}!
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.key
                ? "bg-orange-600 text-white"
                : "bg-white border text-stone-700 hover:bg-orange-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {/* My Orders */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">My Orders</h2>
            {orders?.length > 0 ? (
              <ul className="space-y-2">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{order.items.map((i) => i.name).join(", ")}</span>
                    <span>Status: {order.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
            {wishlist.length > 0 ? (
              <ul className="space-y-2">
                {wishlist.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Wishlist is empty.</p>
            )}
          </div>
        )}

        {/* Wallet */}
        {activeTab === "wallet" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Wallet</h2>
            <p>Balance: ₹0 (Simulated)</p>
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">My Profile</h2>
            {user ? (
              <div className="space-y-1">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone || "Not added"}</p>
              </div>
            ) : (
              <p>No profile info. Please log in.</p>
            )}
          </div>
        )}

        {/* Settings / Addresses */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">My Addresses</h2>

            {addresses.length > 0 ? (
              <ul className="space-y-2 mb-4">
                {addresses.map((addr, index) => (
                  <li
                    key={index}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{addr}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditAddress(index)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(index)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addresses saved.</p>
            )}

            <textarea
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Add a new address"
              className="w-full border p-2 rounded mb-2"
            />
            <button
              onClick={handleAddAddress}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              {editingIndex !== null ? "Update Address" : "Add Address"}
            </button>
          </div>
        )}

        {/* Support */}
        {activeTab === "support" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Customer Service</h2>
            <p>Contact us at support@odishacrafts.com</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;