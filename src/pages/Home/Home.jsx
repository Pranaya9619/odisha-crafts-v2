import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "./Hero";
import ExploreSections from "./ExploreSections";
import PageTransition from "../../components/layout/PageTransition";
import { PRODUCTS } from "../../data/products";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const Home = () => {
  const navigate = useNavigate();
  const featured = PRODUCTS.slice(0, 3);

  return (
    <PageTransition>
      <Hero navigate={navigate} />
      <ExploreSections navigate={navigate} />

      {/* Featured Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
              Featured Creations
            </h2>
            <div className="w-24 h-1 bg-orange-700 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {featured.map((p) => (
              <motion.div
                key={p.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="overflow-hidden rounded-t-xl">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-72 w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg text-stone-900 mb-2">
                    {p.name}
                  </h3>
                  <p className="text-orange-700 font-bold text-lg">
                    ₹{p.price.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;