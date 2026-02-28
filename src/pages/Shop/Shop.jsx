import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";
import API from "../../services/api";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get("category");
  const activeDistrict = searchParams.get("district");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // remove smooth if you want instant
    });
  }, [searchParams]);
  
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, distRes] = await Promise.all([
          API.get("/categories"),
          API.get("/districts"),
        ]);
        setCategories(catRes.data || []);
        setDistricts(distRes.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams(searchParams).toString();
        const res = await API.get(`/products?${query}`);
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const setFilter = (type, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) params.delete(type);
    else params.set(type, value);

    navigate(`/shop?${params.toString()}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm border h-fit">
            <h3 className="text-lg font-bold mb-4">Filters</h3>

            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase text-stone-500 mb-3">
                Category
              </h4>

              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setFilter("category", cat.name)}
                  className={`block text-sm mb-2 ${
                    activeCategory === cat.name
                      ? "text-orange-700 font-bold"
                      : "text-stone-700 hover:text-orange-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}

              <button
                onClick={() => setFilter("category", null)}
                className="text-xs text-stone-400 mt-2"
              >
                Clear
              </button>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase text-stone-500 mb-3">
                District
              </h4>

              {districts.map((district) => (
                <button
                  key={district._id}
                  onClick={() => setFilter("district", district.name)}
                  className={`block text-sm mb-2 ${
                    activeDistrict === district.name
                      ? "text-orange-700 font-bold"
                      : "text-stone-700 hover:text-orange-600"
                  }`}
                >
                  {district.name}
                </button>
              ))}

              <button
                onClick={() => setFilter("district", null)}
                className="text-xs text-stone-400 mt-2"
              >
                Clear
              </button>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <h1 className="text-3xl font-serif font-bold mb-8">Shop</h1>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden"
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6">
                      <h2 className="font-bold text-lg mb-2">
                        {product.name}
                      </h2>
                      <p className="text-orange-700 font-bold">
                        ₹{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;