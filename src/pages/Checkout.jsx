import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext"; // Ensure path is correct
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    cart,
    cartTotal,
    clearCart,
    addOrder,
    addresses,
    addAddress,
  } = useStore();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const navigate = useNavigate();

  // Auto-select first address if available
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress]);

  const handlePlaceOrder = () => {
    const finalAddress = selectedAddress || newAddress;
    if (!finalAddress) {
      alert("Please enter or select a shipping address!");
      return;
    }

    // Save new address to context if it was typed
    if (newAddress && !addresses.includes(newAddress)) {
      addAddress(newAddress);
    }

    const order = {
      id: Date.now(),
      items: cart,
      total: cartTotal,
      address: finalAddress,
      payment,
      status: "Pending",
    };

    addOrder(order); // Save order
    alert("✅ Order Placed Successfully!");
    clearCart();
    navigate("/my-account"); // Redirect to My Orders
  };

  return (
    <div className="min-h-screen p-6 flex justify-center bg-stone-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold">Checkout</h2>

        {/* Shipping Address */}
        <div>
          <p className="font-medium mb-2">Shipping Address</p>

          {/* Existing Addresses */}
          {addresses.length > 0 && (
            <div className="space-y-2 mb-2">
              {addresses.map((addr, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-orange-50"
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={addr}
                    checked={selectedAddress === addr}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <span>{addr}</span>
                </label>
              ))}
            </div>
          )}

          {/* Add New Address */}
          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Add a new address"
            className="w-full border p-2 rounded"
          />
          {newAddress && (
            <button
              onClick={() => setSelectedAddress(newAddress)}
              className="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              Use This Address
            </button>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <p className="font-medium mb-2">Payment Method</p>
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>

        {/* Order Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;