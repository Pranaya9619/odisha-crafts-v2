import React, { useEffect, useState } from "react";
import {
  MapPin,
  ChevronRight,
  ShieldCheck,
  Users,
  Scissors,
  Truck,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OdishaMap from "../../components/OdishaMap";
import API from "../../services/api";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
  },
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
      <section className="py-24 bg-[#f7f3ee] text-center">
        <div className="w-10 h-10 border-4 border-orange-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </section>
    );
  }

  return (
    <section className="relative py-28 bg-[#f7f3ee] overflow-hidden">

      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-orange-200/40 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-[0.3em] text-orange-700 text-sm font-semibold mb-3">
            Explore Odisha
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
            Discover Craft Traditions
          </h2>
        </motion.div>

        {/* Categories */}
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
              whileHover={{ y: -10 }}
              onClick={() =>
                navigate(`/shop?category=${encodeURIComponent(cat.name)}`)
              }
              className="group relative h-72 rounded-[2rem] overflow-hidden cursor-pointer"
            >
              <img
                src={cat.icon || "/placeholder.jpg"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

              <div className="absolute bottom-5 left-5 right-5">
                <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-4">
                  <h3 className="text-white text-lg font-semibold">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Grid */}
        <div className="mt-28 grid lg:grid-cols-2 gap-12 items-stretch">

          {/* Districts */}
          <OdishaMap />

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 self-start h-full justify-between"
          >
            {[
              {
                icon: <ShieldCheck size={24} />,
                title: "Verified Authenticity",
                text: "Every piece is sourced from verified artisan clusters and heritage communities.",
              },
              {
                icon: <Users size={24} />,
                title: "Empowering Artisans",
                text: "Your purchase directly supports Odisha’s local artisan economy.",
              },
              {
                icon: <Scissors size={24} />,
                title: "Handmade Legacy",
                text: "Crafted through techniques preserved across generations.",
              },
              {
                icon: <Truck size={24} />,
                title: "Protected Delivery",
                text: "Packed with care and shipped securely across India.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-6 shadow-lg border border-stone-100"
              >
                <div className="flex items-center gap-4 mb-4">

                  <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>

                  <h4 className="text-2xl font-bold text-stone-900 leading-tight">
                    {item.title}
                  </h4>

                </div>

                <p className="text-stone-600 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExploreSections;