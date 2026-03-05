import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Package, ShoppingBag, IndianRupee, Star } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import API from "../../services/sellerApi";

const SellerHome = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [chartData, setChartData] = useState([]);

  const statIcons = {
    revenue: IndianRupee,
    orders: ShoppingBag,
    products: Package,
    rating: Star,
  };

  /* ================= FETCH DASHBOARD ================= */

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await API.get("/seller/analytics");

        setStats({
          revenue: res.data.totalRevenue,
          orders: res.data.totalOrders,
          products: res.data.totalProducts,
          rating: 0
        });

        setRecentOrders(res.data.recentOrders || []);
        setTopProducts(res.data.topProducts || []);

      } catch (err) {
        console.error(err);
      }

    };


    const fetchChart = async () => {

      try {

        const res = await API.get("/seller/revenue-chart");

        setChartData(res.data);

      } catch (err) {

        console.error(err);

      }

    };


    fetchDashboard();
    fetchChart();

  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  const statCards = [
    { label: "Revenue", value: `₹${stats.revenue}`, key: "revenue" },
    { label: "Orders", value: stats.orders, key: "orders" },
    { label: "Products", value: stats.products, key: "products" },
    { label: "Rating", value: stats.rating, key: "rating" },
  ];

  return (

    <div className="space-y-10">

      {/* Page Title */}

      <div>
        <h1 className="text-2xl font-semibold">
          Seller Dashboard
        </h1>

        <p className="text-stone-600">
          Welcome back. Here's your store performance.
        </p>
      </div>


      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {statCards.map((stat, index) => {

          const Icon = statIcons[stat.key];

          return (

            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
            >

              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon className="text-orange-600" size={22} />
              </div>

              <div>
                <p className="text-sm text-stone-500">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>

            </div>

          );

        })}

      </div>


      {/* Revenue Chart */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-6">
          Revenue Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData || []}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


        {/* Recent Orders */}

        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-lg font-semibold mb-4">
            Recent Orders
          </h2>

          <div className="space-y-3">

            {recentOrders.map((order) => (

              <div
                key={order._id}
                className="flex justify-between items-center border-b pb-3"
              >

                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-stone-500">
                    {order.buyer}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium">
                    ₹{order.price}
                  </p>
                  <p className="text-sm text-stone-500">
                    {order.status}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* Top Products */}

        <div className="bg-white rounded-lg shadow p-6">

          <h2 className="text-lg font-semibold mb-4">
            Top Selling Products
          </h2>

          <div className="space-y-4">

            {topProducts.map((product, index) => (

              <div key={index} className="flex justify-between">

                <span>{product.name}</span>

                <span className="font-medium">
                  {product.sales} sales
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* Quick Actions */}

      <div className="bg-white rounded-lg shadow p-6">

        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/seller/products")}
            className="px-5 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Add Product
          </button>

          <button
            onClick={() => navigate("/seller/orders")}
            className="px-5 py-2 bg-stone-800 text-white rounded hover:bg-stone-900"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/seller/artisans")}
            className="px-5 py-2 bg-stone-700 text-white rounded hover:bg-stone-800"
          >
            Manage Artisans
          </button>

        </div>

      </div>

    </div>

  );

};

export default SellerHome;