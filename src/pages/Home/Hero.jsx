import React from "react";
import { ArrowRight, Award } from "lucide-react";
import { motion } from "framer-motion";

const Hero = ({ navigate }) => {
  return (
    <section className="relative min-h-screen bg-[#0c0b09] overflow-hidden flex items-center">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1600&auto=format&fit=crop"
          alt="Odisha Crafts"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0c0b09]"></div>

      {/* Glow */}
      <div className="absolute top-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-700/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 border border-orange-700/30 bg-orange-700/10 backdrop-blur-xl rounded-full px-5 py-2 text-orange-200 text-sm mb-8"
        >
          <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
          Govt. of Odisha Supported Initiative
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight"
        >
          Crafted by <br />
          <span className="text-orange-500 italic">
            Generations
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-stone-300 leading-relaxed"
        >
          Discover timeless artistry born in the villages of Odisha —
          from intricate Pattachitra scrolls to royal Silver Filigree
          treasures crafted by master artisans.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate?.("/shop")}
            className="px-8 py-4 rounded-full bg-orange-700 hover:bg-orange-600 text-white text-lg font-semibold flex items-center gap-2 shadow-2xl shadow-orange-900/40 transition"
          >
            Explore Crafts
            <ArrowRight size={20} />
          </motion.button>

          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate?.("/impact")}
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-lg text-white hover:bg-white hover:text-black transition text-lg flex items-center gap-2"
          >
            Our Impact
            <Award size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;