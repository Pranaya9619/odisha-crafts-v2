import React from "react";
import { ArrowRight, Award } from "lucide-react";
import { motion } from "framer-motion";

const Hero = ({ navigate }) => {
  return (
    <section className="relative bg-stone-900 overflow-hidden">
      
      {/* Animated Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900 via-stone-900 to-stone-950"
      />

      {/* Subtle Floating Orb */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-orange-800/20 blur-3xl rounded-full"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
        
        {/* Tag */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block py-1 px-3 rounded-full bg-orange-700/30 border border-orange-600 text-orange-200 text-sm font-semibold mb-6 tracking-wide"
        >
          Govt. of Odisha Supported Initiative
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
        >
          Preserving the Soul <br />
          of <span className="text-orange-500">Odisha</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl text-lg md:text-xl text-stone-300 mb-10 font-light"
        >
          Direct from the hands of master artisans to your home. Explore the finest Ikat, Pattachitra, and Silver Filigree.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate?.("shop")}
            aria-label="Explore crafts"
            className="px-8 py-4 bg-orange-700 hover:bg-orange-600 text-white rounded-md font-medium text-lg shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2 transition"
          >
            Explore Crafts <ArrowRight size={20} />
          </motion.button>

          <motion.button
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate?.("impact")}
            aria-label="View our impact"
            className="px-8 py-4 bg-transparent border border-stone-500 text-stone-300 hover:text-white hover:border-white rounded-md font-medium text-lg transition flex items-center justify-center gap-2"
          >
            Our Impact <Award size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;