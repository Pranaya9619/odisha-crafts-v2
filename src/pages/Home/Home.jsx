import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Hero from "./Hero";
import ExploreSections from "./ExploreSections";
import PageTransition from "../../components/layout/PageTransition";

import API from "../../services/api";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Home fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featured = products.slice(0, 3);

  return (
    <PageTransition>
      <Hero navigate={navigate} />

      <ExploreSections navigate={navigate} />

      {/* FEATURED */}
      <section className="relative py-28 bg-[#f7f3ee] overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-200/30 blur-3xl rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.3em] text-orange-700 text-sm font-semibold mb-3">
              Curated Heritage
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-5">
              Featured Creations
            </h2>

            <p className="max-w-2xl mx-auto text-stone-600 text-lg">
              Handpicked masterpieces woven, painted, and sculpted by the soul of Odisha.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 border-4 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-10"
            >
              {featured.map((p) => (
                <motion.div
                  key={p._id}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-md hover:shadow-2xl transition-all duration-500">

                    {/* Image */}
                    <div className="overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80"></div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5">
                        <h3 className="text-2xl font-serif text-white font-semibold mb-2">
                          {p.name}
                        </h3>

                        <div className="flex items-center justify-between">
                          <p className="text-orange-300 font-bold text-xl">
                            ₹{Number(p.price).toLocaleString()}
                          </p>

                          <button className="text-sm text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;