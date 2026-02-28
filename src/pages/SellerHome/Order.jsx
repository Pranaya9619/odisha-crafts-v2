import React, { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 101, customer: "Riya", product: "Ikat Saree", status: "Pending" },
  ]);

  const markShipped = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: "Shipped" } : o
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {orders.map((order) => (
        <div key={order.id} className="border-b py-3">
          <p>Order ID: {order.id}</p>
          <p>Customer: {order.customer}</p>
          <p>Product: {order.product}</p>
          <p>Status: {order.status}</p>
          {order.status === "Pending" && (
            <button
              onClick={() => markShipped(order.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark as Shipped
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Orders;