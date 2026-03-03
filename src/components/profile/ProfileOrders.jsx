import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";

const StatusBadge = ({ status }) => {
  const base = "text-xs px-2 py-1 rounded-full font-medium";

  const colors = {
    placed: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span className={`${base} ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
};

const ProfileOrders = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (type) => {
    try {
      setLoading(true);

      let endpoint = "/orders/my-orders";

      if (type === "current") {
        endpoint = "/orders/my-orders/current";
      } else if (type === "past") {
        endpoint = "/orders/my-orders/past";
      }

      const res = await API.get(endpoint);
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-6">

      {/* Tabs */}
      <div className="flex gap-4">
        {["current", "past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm transition
              ${
                activeTab === tab
                  ? "bg-orange-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
          >
            {tab === "current" ? "Current Orders" : "Past Orders"}
          </button>
        ))}
      </div>

      {/* Orders */}
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              whileHover={{ scale: 1.01 }}
              className="border rounded-2xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: {order._id.slice(-8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <StatusBadge status={order.orderStatus} />
              </div>

              {/* Items */}
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border rounded-lg p-3"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="text-sm font-semibold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Payment: {order.paymentMethod}
                </p>
                <p className="font-semibold text-lg">
                  ₹{order.totalAmount}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;