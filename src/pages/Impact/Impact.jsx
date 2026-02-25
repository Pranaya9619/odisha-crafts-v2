import React from "react";
import {
  Users,
  MapPin,
  Award,
  Globe,
  Info,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "../../components/layout/PageTransition";

const stats = [
  { label: "Artisans Onboarded", val: "2,500+", icon: Users },
  { label: "Districts Covered", val: "18", icon: MapPin },
  { label: "Revenue to Clusters", val: "₹4.2 Cr", icon: Award },
  { label: "Heritage Techniques", val: "12", icon: Globe },
];

const partners = [
  { name: "Boyanika", link: "https://boyanika.com" },
  { name: "Utkalika", link: "https://utkalikaodisha.com" },
  { name: "Mission Shakti", link: "https://missionshakti.odisha.gov.in" },
  { name: "ORMAS", link: "https://ormas.odisha.gov.in" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Impact = () => {
  return (
    <PageTransition>
      <section className="bg-stone-900 text-white py-20 min-h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Our Collective Impact
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              OdishaCrafts is not just a marketplace. It is a movement to digitize,
              democratize, and deliver value back to the hands that create.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="bg-stone-800 p-8 rounded-2xl border border-stone-700 
                  text-center hover:border-orange-500 hover:shadow-xl
                  transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <Icon className="text-orange-500" size={32} />
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {stat.val}
                  </div>
                  <div className="text-stone-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-12">

            {/* Transparency Model */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-800 p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Info className="mr-2" />
                Transparency Model
              </h3>

              <p className="text-stone-300 mb-6">
                85% of the sale value goes directly to the sourcing body,
                ensuring artisan clusters receive funds immediately.
              </p>

              <div className="w-full bg-stone-700 h-4 rounded-full overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="bg-green-500 h-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "15%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-orange-600 h-full"
                />
              </div>

              <div className="flex justify-between text-xs mt-2 text-stone-400">
                <span>85% Artisan Cluster</span>
                <span>15% Logistics & Tech</span>
              </div>
            </motion.div>

            {/* Partner Organizations */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-stone-800 p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-6">
                Partner Organizations
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {partners.map((partner) => (
                  <motion.a
                    key={partner.name}
                    variants={fadeUp}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="bg-stone-700 p-4 rounded-lg 
                    text-center font-bold text-stone-300 
                    flex items-center justify-center gap-2
                    hover:bg-orange-600 hover:text-white 
                    transition-all duration-300"
                  >
                    {partner.name}
                    <ExternalLink size={16} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Impact;