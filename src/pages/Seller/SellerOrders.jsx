import React, { useEffect, useState } from "react";
import API from "../../services/sellerApi";

const SellerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);



    /* ================= LOAD ORDERS ================= */

    const fetchOrders = async () => {

        try {

            const res = await API.get("/seller/orders");

            setOrders(res.data);
            setLoading(false);

        } catch (err) {

            console.error("Orders fetch error:", err);
            setLoading(false);

        }

    };



    useEffect(() => {

        fetchOrders();

    }, []);



    /* ================= UPDATE STATUS ================= */

    const updateStatus = async (orderId, status) => {

        try {

            await API.put(
                `/seller/orders/${orderId}/status`,
                { status }
            );

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? {
                            ...order,
                            orderStatus: status,
                        }
                        : order
                )
            );

        } catch (err) {

            console.error(
                "Status update error:",
                err
            );

        }

    };



    /* ================= LOADING ================= */

    if (loading) {

        return (
            <div className="p-8 text-gray-600">
                Loading orders...
            </div>
        );

    }



    return (

        <div className="p-6">

            <h1 className="text-2xl font-semibold mb-6">
                Seller Orders
            </h1>



            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-left">

                        <tr>

                            <th className="p-4 font-semibold">
                                Order
                            </th>

                            <th className="p-4 font-semibold">
                                Customer
                            </th>

                            <th className="p-4 font-semibold min-w-[280px]">
                                Address
                            </th>

                            <th className="p-4 font-semibold min-w-[250px]">
                                Items
                            </th>

                            <th className="p-4 font-semibold">
                                Total
                            </th>

                            <th className="p-4 font-semibold">
                                Status
                            </th>

                            <th className="p-4 font-semibold">
                                Update
                            </th>

                        </tr>

                    </thead>



                    <tbody>

                        {orders.length > 0 ? (

                            orders.map((order) => (

                                <tr
                                    key={order._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >

                                    {/* ORDER ID */}
                                    <td className="p-4 text-gray-600 font-medium">
                                        #{order._id.slice(-6)}
                                    </td>



                                    {/* CUSTOMER */}
                                    <td className="p-4">

                                        <div className="font-medium text-gray-800">
                                            {order.user?.name || "Customer"}
                                        </div>

                                        <div className="text-xs text-gray-500 mt-1">
                                            {order.user?.email}
                                        </div>

                                    </td>



                                    {/* ADDRESS */}
                                    <td className="p-4 text-gray-600">

                                        {order.shippingAddress ? (

                                            <div className="space-y-1 leading-5">

                                                <div className="font-medium text-gray-800">
                                                    {
                                                        order.shippingAddress
                                                            .fullName
                                                    }
                                                </div>

                                                <div>
                                                    📞{" "}
                                                    {
                                                        order.shippingAddress
                                                            .phone
                                                    }
                                                </div>

                                                <div>
                                                    {
                                                        order.shippingAddress
                                                            .street
                                                    }
                                                </div>

                                                <div>

                                                    {
                                                        order.shippingAddress
                                                            .city
                                                    },{" "}

                                                    {
                                                        order.shippingAddress
                                                            .state
                                                    }{" "}

                                                    -{" "}

                                                    {
                                                        order.shippingAddress
                                                            .pincode
                                                    }

                                                </div>

                                            </div>

                                        ) : (

                                            <span className="text-red-500">
                                                No address found
                                            </span>

                                        )}

                                    </td>



                                    {/* ITEMS */}
                                    <td className="p-4">

                                        <div className="space-y-2">

                                            {order.items?.map(
                                                (item, i) => (

                                                    <div
                                                        key={i}
                                                        className="border rounded-lg p-2"
                                                    >

                                                        <div className="font-medium text-gray-800">
                                                            {
                                                                item.product
                                                                    ?.name
                                                            }
                                                        </div>

                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Qty:{" "}
                                                            {
                                                                item.quantity
                                                            }
                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </td>



                                    {/* TOTAL */}
                                    <td className="p-4 font-semibold text-gray-800">
                                        ₹{order.totalAmount}
                                    </td>



                                    {/* STATUS */}
                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                                            
                                            ${order.orderStatus === "placed"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : ""
                                                }

                                            ${order.orderStatus === "processing"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : ""
                                                }

                                            ${order.orderStatus === "shipped"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : ""
                                                }

                                            ${order.orderStatus === "delivered"
                                                    ? "bg-green-100 text-green-700"
                                                    : ""
                                                }

                                            ${order.orderStatus === "cancelled"
                                                    ? "bg-red-100 text-red-700"
                                                    : ""
                                                }
                                        `}
                                        >

                                            {order.orderStatus}

                                        </span>

                                    </td>



                                    {/* UPDATE STATUS */}
                                    <td className="p-4">

                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
                                        >

                                            <option value="placed">
                                                Placed
                                            </option>

                                            <option value="processing">
                                                Processing
                                            </option>

                                            <option value="shipped">
                                                Shipped
                                            </option>

                                            <option value="delivered">
                                                Delivered
                                            </option>

                                            <option value="cancelled">
                                                Cancelled
                                            </option>

                                        </select>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center p-8 text-gray-500"
                                >
                                    No orders found
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default SellerOrders;