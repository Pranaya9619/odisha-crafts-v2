import React, { useEffect, useState } from "react";
import API from "../../services/sellerApi";

const SellerAnalytics = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* LOAD ANALYTICS */

  const fetchAnalytics = async () => {
    try {

      const res = await API.get("/seller/analytics");
      setData(res.data);

    } catch (err) {

      console.error("Analytics error:", err);

      // fallback so UI doesn't crash
      setData({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: []
      });

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-600">
        Loading analytics...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-2xl font-semibold mb-6">
        Seller Analytics
      </h1>

      {/* STATS */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-2xl font-bold">{data?.totalProducts || 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-2xl font-bold">{data?.totalOrders || 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-bold">₹{data?.totalRevenue || 0}</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500 text-sm">Low Stock Items</p>
          <h2 className="text-2xl font-bold">
            {data?.lowStockProducts?.length || 0}
          </h2>
        </div>

      </div>

      {/* LOW STOCK */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Low Stock Products
        </h2>

        {data?.lowStockProducts?.length === 0 ? (

          <p className="text-gray-500">
            All products are well stocked.
          </p>

        ) : (

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Price</th>
              </tr>
            </thead>

            <tbody>

              {data?.lowStockProducts?.map((product) => (
                <tr key={product._id} className="border-t">

                  <td className="p-3">{product.name}</td>

                  <td className="p-3 text-red-600 font-medium">
                    {product.stock}
                  </td>

                  <td className="p-3">
                    ₹{product.price}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default SellerAnalytics;