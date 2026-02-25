import React from "react";
import { MapPin, ChevronRight, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "../../data/categories";
import { DISTRICTS } from "../../data/districts";

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

const ExploreSections = ({ navigate }) => {
  const safeNavigate = (page, filter) => {
    if (navigate) navigate(page, filter);
  };

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              onClick={() => safeNavigate("shop", { category: cat.name })}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-all duration-300"></div>

              <div className="relative z-10 flex items-center justify-center h-40">
                <h3 className="text-white font-semibold text-lg text-center px-2 tracking-wide">
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

              <motion.ul
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-2 mb-8"
              >
                {DISTRICTS.map((district) => (
                  <motion.li
                    key={district}
                    variants={fadeUp}
                    onClick={() => safeNavigate("shop", { district })}
                    whileHover={{ x: 4 }}
                    className="flex items-center text-stone-800 font-medium cursor-pointer hover:text-orange-700 transition-colors"
                  >
                    <MapPin size={16} className="text-orange-700 mr-2" />
                    {district}
                  </motion.li>
                ))}
              </motion.ul>

              <button
                onClick={() => safeNavigate("shop")}
                className="text-orange-800 font-bold hover:underline flex items-center"
              >
                View All Districts <ChevronRight size={18} />
              </button>
            </div>

            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-200 rounded-full opacity-50"></div>
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
                <ShieldCheck size={24} />
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ExploreSections;