import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/adminApi";

const StatCard = ({ title, value, loading }) => (
  <div className="bg-white p-5 rounded-xl shadow">
    <p className="text-sm text-gray-500">{title}</p>

    {loading ? (
      <div className="h-6 w-16 bg-gray-200 rounded mt-2 animate-pulse" />
    ) : (
      <h2 className="text-2xl font-bold mt-1">{value ?? 0}</h2>
    )}
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVendors: 0,
    pendingVendors: 0,
    approvedVendors: 0,
    archivedVendors: 0,
    totalProducts: 0,
    archivedProducts: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get("/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">Admin Control Center 👑</h1>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <StatCard title="Total Vendors" value={stats.totalVendors} loading={loading} />
        <StatCard title="Pending Approvals" value={stats.pendingVendors} loading={loading} />
        <StatCard title="Approved Vendors" value={stats.approvedVendors} loading={loading} />

        <StatCard title="Archived Vendors" value={stats.archivedVendors} loading={loading} />
        <StatCard title="Active Products" value={stats.totalProducts} loading={loading} />
        <StatCard title="Archived Products" value={stats.archivedProducts} loading={loading} />

      </div>

      {/* 🚀 Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link
          to="/admin/vendors"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Vendor Approvals</h2>
          <p className="text-sm text-gray-500 mt-2">
            Review, approve, reject vendors
          </p>
        </Link>

        <Link
          to="/admin/products"
          className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">Product Moderation</h2>
          <p className="text-sm text-gray-500 mt-2">
            Archive or manage products
          </p>
        </Link>

      </div>

    </div>
  );
};

export default AdminDashboard;