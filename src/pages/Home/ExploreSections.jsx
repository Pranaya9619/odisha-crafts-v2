import React, { useEffect, useState } from "react";
import { MapPin, ChevronRight, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { Scissors, Truck } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const ExploreSections = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, distRes] = await Promise.all([
          API.get("/categories"),
          API.get("/districts"),
        ]);

        setCategories(catRes.data || []);
        setDistricts(distRes.data || []);
      } catch (error) {
        console.error("ExploreSections fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-stone-50 text-center">
        <p className="text-stone-600">Loading exploration magic...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Explore by Craft */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
            Explore by Craft
          </h2>
          <div className="w-24 h-1 bg-orange-700 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat._id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() =>
                navigate(`/shop?category=${encodeURIComponent(cat.name)}`)
              }
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition"
            >
              <img
                src={cat.icon || "/placeholder.jpg"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition"></div>

              <div className="relative z-10 flex items-center justify-center h-40">
                <h3 className="text-white font-semibold text-lg text-center px-2">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore by District */}
        <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-orange-100 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
                Explore by District
              </h3>

              <p className="text-stone-700 mb-6">
                Take a journey through the cultural map of Odisha.
              </p>

              <ul className="space-y-2 mb-8">
                {districts.map((district) => (
                  <li
                    key={district._id}
                    onClick={() =>
                      navigate(`/shop?district=${encodeURIComponent(district.name)}`)
                    }
                    className="flex items-center text-stone-800 font-medium cursor-pointer hover:text-orange-700"
                  >
                    <MapPin size={16} className="text-orange-700 mr-2" />
                    {district.name}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/shop")}
                className="text-orange-800 font-bold hover:underline flex items-center"
              >
                View All Districts <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-900 text-white rounded-lg">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900">
                  Verified Authenticity
                </h4>
                <p className="text-stone-600 text-sm mt-1">
                  Sourced directly from trusted government bodies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-stone-900 text-white rounded-lg">
                <Users size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-stone-900">
                  Fair Trade & Support
                </h4>
                <p className="text-stone-600 text-sm mt-1">
                  Earnings go directly to artisan clusters.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-black text-white p-4 rounded-xl">
                <Scissors size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Handmade with Tradition
                </h3>
                <p className="text-gray-600">
                  Crafted using time-honored techniques passed down through generations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-black text-white p-4 rounded-xl">
                <Truck size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Safe & Reliable Delivery
                </h3>
                <p className="text-gray-600">
                  Carefully packed and shipped with protection for delicate artwork.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExploreSections;