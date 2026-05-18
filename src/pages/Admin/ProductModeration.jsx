import { useEffect, useMemo, useState } from "react";
import API from "../../services/adminApi";

const ProductModeration = () => {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("active");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleArchive = async (id) => {
    try {
      setActionLoading(id);

      await API.put(`/products/${id}/archive`);

      // 🔥 Optimistic update
      setProducts(prev =>
        prev.map(p =>
          p._id === id ? { ...p, isArchived: true } : p
        )
      );

    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRestore = async (id) => {
    try {
      setActionLoading(id);

      const res = await API.put(`/products/${id}/unarchive`);
      console.log("RESTORE RESPONSE:", res.data);

      setProducts(prev =>
        prev.map(p =>
          p._id === id ? { ...p, isArchived: false } : p
        )
      );

      setFilter("active");

    } catch (err) {
      console.error("RESTORE ERROR:", err.response?.data || err.message);
      alert("Restore failed. Check console.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    if (filter === "archived") return products.filter(p => p.isArchived);
    return products.filter(p => !p.isArchived);
  }, [products, filter]);

  return (
    <div className="p-8">

      <h1 className="text-2xl font-bold mb-6">Product Moderation</h1>

      {/* 🔍 Filter */}
      <div className="mb-6">
        <select
          className="px-4 py-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="archived">Archived</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* 📊 TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  Loading products...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => (
                <tr key={p._id} className="border-t">

                  <td className="p-3 font-medium">{p.name}</td>

                  <td className="p-3 text-gray-500">
                    {p.seller?.name || "-"}
                  </td>

                  <td className="p-3">
                    {p.isArchived ? "Archived" : "Active"}
                  </td>

                  <td className="p-3 text-right">

                    {!p.isArchived ? (
                      <button
                        disabled={actionLoading === p._id}
                        onClick={() => handleArchive(p._id)}
                        className="px-3 py-1 bg-gray-800 text-white rounded"
                      >
                        Archive
                      </button>
                    ) : (
                      <button
                        disabled={actionLoading === p._id}
                        onClick={() => handleRestore(p._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Restore
                      </button>
                    )}

                  </td>

                </tr>
              ))
            )}

          </tbody>
        </table>

      </div>

    </div>
  );
};

export default ProductModeration;