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

            await API.put(`/seller/orders/${orderId}/status`, { status });

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? { ...order, orderStatus: status }
                        : order
                )
            );

        } catch (err) {
            console.error("Status update error:", err);
        }

    };



    if (loading) {
        return <div className="p-8 text-gray-600">Loading orders...</div>;
    }



    return (

        <div>

            <h1 className="text-2xl font-semibold mb-6">
                Seller Orders
            </h1>


            <div className="bg-white rounded-lg shadow overflow-x-auto">

                <table className="w-full text-sm">

                    <thead className="bg-gray-100 text-left">

                        <tr>
                            <th className="p-3">Order</th>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Update</th>
                        </tr>

                    </thead>


                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="border-t"
                            >

                                {/* ORDER ID */}
                                <td className="p-3 text-gray-600">
                                    {order._id.slice(-6)}
                                </td>


                                {/* CUSTOMER */}
                                <td className="p-3">
                                    {order.user?.name || "Customer"}
                                </td>


                                {/* ITEMS */}
                                <td className="p-3">

                                    {order.items?.map((item, i) => (
                                        <div key={i}>
                                            {item.product?.name} × {item.quantity}
                                        </div>
                                    ))}

                                </td>


                                {/* TOTAL */}
                                <td className="p-3 font-medium">
                                    ₹{order.totalAmount}
                                </td>


                                {/* STATUS */}
                                <td className="p-3 capitalize">
                                    {order.orderStatus}
                                </td>


                                {/* UPDATE STATUS */}
                                <td className="p-3">

                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            updateStatus(order._id, e.target.value)
                                        }
                                        className="border rounded px-2 py-1"
                                    >

                                        <option value="placed">Placed</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>

                                    </select>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

};

export default SellerOrders;