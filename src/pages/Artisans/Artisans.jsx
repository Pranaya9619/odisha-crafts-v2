import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";
import API from "../../services/api"; // adjust path if needed

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

const Artisans = () => {
  const navigate = useNavigate();

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await API.get("/artisans");
        setArtisans(res.data || []);
      } catch (err) {
        console.error("Artisans fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <PageTransition>
      <div className="py-12 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-serif font-bold text-stone-900 mb-12"
          >
            Keepers of Tradition
          </motion.h2>

          {loading ? (
            <p className="text-stone-600 text-center">
              Loading artisans...
            </p>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-12"
            >
              {artisans.map((artisan) => (
                <motion.div
                  key={artisan._id}
                  variants={cardVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 flex flex-col md:flex-row gap-8 items-start"
                >
                  {/* Image Section */}
                  <div className="w-full md:w-1/3">
                    <div className="aspect-square rounded-xl mb-4 overflow-hidden">
                      <img
                        src={artisan.image}
                        alt={artisan.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="flex justify-between items-center bg-stone-50 p-3 rounded-lg">
                      <span className="text-stone-600 text-sm font-bold">
                        Experience
                      </span>
                      <span className="text-orange-700 font-bold">
                        {artisan.experience}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded uppercase tracking-wide">
                        {artisan.craft}
                      </span>

                      <span className="text-stone-500 text-sm flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {artisan.district}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-stone-900 mb-4">
                      {artisan.name}
                    </h3>

                    {artisan.quote && (
                      <blockquote className="border-l-4 border-orange-500 pl-4 italic text-stone-600 mb-6 text-lg">
                        "{artisan.quote}"
                      </blockquote>
                    )}

                    <p className="text-stone-700 leading-relaxed mb-6">
                      {artisan.bio}
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/shop?artisan=${artisan._id}`)
                      }
                      className="text-stone-900 font-bold underline hover:text-orange-700 transition-colors duration-200"
                    >
                      View {artisan.name?.split(" ")[0]}'s Collection
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Artisans;