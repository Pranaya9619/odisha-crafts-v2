import React, { useMemo } from "react";
import { useStore } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const ProfileCart = () => {
    const { cart = [], removeFromCart, increaseQty, decreaseQty } = useStore();
    const navigate = useNavigate();

    const subtotal = useMemo(() => {
        return cart.reduce((acc, item) => {
            if (!item.product) return acc;

            const price = Number(item.product.price) || 0;
            const qty = Number(item.quantity) || 1;

            return acc + price * qty;
        }, 0);
    }, [cart]);

    if (!cart || cart.length === 0) {
        return (
            <div className="text-center py-16">
                <ShoppingBag size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty.</p>
                <button
                    onClick={() => navigate("/shop")}
                    className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            <h2 className="text-lg font-semibold">Your Cart</h2>

            <div className="space-y-6">
                {cart.map((item) => (
                    <motion.div
                        key={item.product._id}
                        whileHover={{ scale: 1.01 }}
                        className="border rounded-2xl p-4 flex flex-col md:flex-row gap-6 items-center"
                    >
                        <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-24 h-24 object-cover rounded-xl cursor-pointer"
                            onClick={() => navigate(`/product/${item.product?._id}`)}
                        />

                        <div className="flex-1 space-y-2">
                            <p
                            onClick={() => navigate(`/product/${item.product?._id}`)}
                            className="font-medium cursor-pointer hover:text-orange-600 transition"
                            >
                            {item.product?.name}
                            </p>

                            <p className="text-sm text-gray-500">
                            ₹{item.product?.price}
                            </p>

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    onClick={() => decreaseQty(item.product._id)}
                                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                                >
                                    -
                                </button>

                                <span className="min-w-[24px] text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQty(item.product._id)}
                                    className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <p className="font-semibold">
                                ₹{(Number(item.product?.price) || 0) * (Number(item.quantity) || 1)}
                            </p>

                            <button
                                onClick={() => removeFromCart(item.product._id)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Summary */}
            <div className="border-t pt-6 flex justify-between items-center">
                <p className="text-lg font-semibold">
                    Subtotal: ₹{subtotal}
                </p>

                <button
                    onClick={() => navigate("/cart")}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                    Go to Checkout
                </button>
            </div>

        </div>
    );
};

export default ProfileCart;