import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PRODUCTS } from "../../data/products";
import { CATEGORIES } from "../../data/categories";
import { DISTRICTS } from "../../data/districts";
import PageTransition from "../../components/layout/PageTransition";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeCategory = searchParams.get("category");
  const activeDistrict = searchParams.get("district");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory) return p.category === activeCategory;
    if (activeDistrict) return p.district === activeDistrict;
    return true;
  });

  const setFilter = (type, value) => {
    if (!value) {
      navigate("/shop");
      return;
    }

    navigate(`/shop?${type}=${encodeURIComponent(value)}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10">

          {/* ================= FILTER SIDEBAR ================= */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-64 bg-white p-6 rounded-xl shadow-sm border border-stone-200 h-fit"
          >
            <h3 className="text-lg font-bold mb-4">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase text-stone-500 mb-3">
                Category
              </h4>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setFilter("category", cat.name)}
                      className={`text-sm transition ${
                        activeCategory === cat.name
                          ? "text-orange-700 font-bold"
                          : "text-stone-700 hover:text-orange-600"
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => setFilter("category", null)}
                    className="text-xs text-stone-400 hover:text-orange-600 mt-2"
                  >
                    Clear Category
                  </button>
                </li>
              </ul>
            </div>

            {/* Districts */}
            <div>
              <h4 className="text-sm font-semibold uppercase text-stone-500 mb-3">
                District
              </h4>
              <ul className="space-y-2">
                {DISTRICTS.map((district) => (
                  <li key={district}>
                    <button
                      onClick={() => setFilter("district", district)}
                      className={`text-sm transition ${
                        activeDistrict === district
                          ? "text-orange-700 font-bold"
                          : "text-stone-700 hover:text-orange-600"
                      }`}
                    >
                      {district}
                    </button>
                  </li>
                ))}

                <li>
                  <button
                    onClick={() => setFilter("district", null)}
                    className="text-xs text-stone-400 hover:text-orange-600 mt-2"
                  >
                    Clear District
                  </button>
                </li>
              </ul>
            </div>
          </motion.aside>

          {/* ================= PRODUCT GRID ================= */}
          <div className="flex-1">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold mb-8"
            >
              Shop
            </motion.h1>

            {filteredProducts.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-stone-600"
              >
                No products found for this filter.
              </motion.p>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-2xl transition overflow-hidden"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="font-bold text-lg mb-2 text-stone-900">
                      {product.name}
                    </h2>

                    <p className="text-orange-700 font-bold">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;