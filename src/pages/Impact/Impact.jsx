import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFeaturedArtisans } from "../../services/artisanService";
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

  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      const data = await getFeaturedArtisans();

      setArtisans(data.artisans);
    } catch (error) {
      console.log(error);
    }
  };
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
          {artisans?.map((artisan) => (
            <motion.div
              key={artisan._id}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group bg-stone-800 rounded-3xl overflow-hidden
    border border-stone-700 hover:border-orange-500/40
    transition-all duration-500"
            >

              <div className="relative aspect-square overflow-hidden">

                <img
                  src={artisan.artisanId.image}
                  alt={artisan.artisanId.name}
                  className="w-full h-full object-cover
        group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t 
      from-black via-black/30 to-transparent" />

                <div className="absolute bottom-5 left-5">

                  <p className="text-orange-400 text-sm mb-1">
                    {artisan.artisanId.craft}
                  </p>

                  <h4 className="text-2xl font-bold">
                    {artisan.artisanId.name}
                  </h4>

                </div>
              </div>

              <div className="p-6">

                <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
                  <MapPin size={16} />
                  {artisan.artisanId.district}, Odisha
                </div>

                <p className="text-stone-300 leading-relaxed mb-6">
                  {artisan.artisanId.bio}
                </p>

                <Link
                  to={`/featured-artisans/${artisan.artisanId._id}`}
                  className="text-orange-400 hover:text-orange-300
  transition-colors font-medium"
                >
                  Read Story →
                </Link>

              </div>
            </motion.div>
          ))}

          {/* FEATURED ARTISANS
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >
            <div className="text-center mb-14">

              <p className="uppercase tracking-[0.3em] text-orange-400 text-sm mb-3">
                Featured Artisans
              </p>

              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-5">
                Stories Behind The Craft
              </h3>

              <p className="text-stone-400 max-w-2xl mx-auto text-lg">
                Every handcrafted piece carries generations of memory,
                patience, and identity woven into its making.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >

              {artisans?.map((artisan) => (

                <motion.div
                  key={artisan._id}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group bg-stone-800 rounded-3xl overflow-hidden
    border border-stone-700 hover:border-orange-500/40
    transition-all duration-500"
                >

                  <div className="relative aspect-square overflow-hidden">

                    <img
                      src={artisan.artisanId.image}
                      alt={artisan.artisanId.name}
                      className="w-full h-full object-cover
        group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t 
      from-black via-black/30 to-transparent" />

                    <div className="absolute bottom-5 left-5">

                      <p className="text-orange-400 text-sm mb-1">
                        {artisan.artisanId.craft}
                      </p>

                      <h4 className="text-2xl font-bold">
                        {artisan.artisanId.name}
                      </h4>

                    </div>
                  </div>

                  <div className="p-6">

                    <div className="flex items-center gap-2 text-sm text-stone-400 mb-4">
                      <MapPin size={16} />
                      {artisan.artisanId.district}, Odisha
                    </div>

                    <p className="text-stone-300 leading-relaxed mb-6">
                      {artisan.artisanId.bio}
                    </p>

                    <Link
                      to={`/featured-artisans/${artisan.artisanId._id}`}
                      className="text-orange-400 hover:text-orange-300
        transition-colors font-medium"
                    >
                      Read Story →
                    </Link>

                  </div>

                </motion.div>

              ))}

            </motion.div>
          </motion.div> */}

          {/* ARTICLES SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-24"
          >

            {/* SECTION HEADER */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">

              <div>
                <p className="uppercase tracking-[0.3em] text-orange-400 text-sm mb-3">
                  Editorial Journal
                </p>

                <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                  Stories From The Craft World
                </h3>

                <p className="text-stone-400 max-w-2xl text-lg">
                  Culture, heritage, artisan journeys, forgotten techniques,
                  and the evolving future of handmade India.
                </p>
              </div>

              <Link
                to="/articles"
                className="border border-stone-600 px-6 py-3 rounded-full
  hover:bg-orange-500 hover:border-orange-500
  transition-all duration-300 inline-block"
              >
                View All Articles
              </Link>

            </div>

            {/* ARTICLE GRID */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >

              {/* ARTICLE 1 */}
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-stone-800 rounded-3xl overflow-hidden
      border border-stone-700 hover:border-orange-500/40
      transition-all duration-500"
              >

                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop"
                    alt="Article"
                    className="w-full h-64 object-cover
          group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">

                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-orange-400 mb-4">
                    <span>Culture</span>
                    <span>•</span>
                    <span>5 Min Read</span>
                  </div>

                  <h4 className="text-2xl font-bold mb-4 leading-snug">
                    Why Handmade Crafts Matter More In The AI Era
                  </h4>

                  <p className="text-stone-400 leading-relaxed mb-6">
                    As algorithms automate everything around us,
                    handcrafted work becomes more human, emotional,
                    and culturally valuable than ever before.
                  </p>

                  <Link
                    to="/articles/handmade-crafts-ai-era"
                    className="text-orange-400 hover:text-orange-300
  transition-colors font-medium"
                  >
                    Read Article →
                  </Link>

                </div>
              </motion.article>

              {/* ARTICLE 2 */}
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-stone-800 rounded-3xl overflow-hidden
      border border-stone-700 hover:border-orange-500/40
      transition-all duration-500"
              >

                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
                    alt="Article"
                    className="w-full h-64 object-cover
          group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">

                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-orange-400 mb-4">
                    <span>Heritage</span>
                    <span>•</span>
                    <span>8 Min Read</span>
                  </div>

                  <h4 className="text-2xl font-bold mb-4 leading-snug">
                    The Hidden Symbolism Inside Pattachitra Paintings
                  </h4>

                  <p className="text-stone-400 leading-relaxed mb-6">
                    Beyond beautiful visuals, every motif and color
                    in traditional Pattachitra carries spiritual and
                    mythological meaning.
                  </p>

                  <Link
                    to="/articles/symbolism-in-pattachitra"
                    className="text-orange-400 hover:text-orange-300
  transition-colors font-medium"
                  >
                    Read Article →
                  </Link>

                </div>
              </motion.article>

              {/* ARTICLE 3 */}
              <motion.article
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-stone-800 rounded-3xl overflow-hidden
      border border-stone-700 hover:border-orange-500/40
      transition-all duration-500"
              >

                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                    alt="Article"
                    className="w-full h-64 object-cover
          group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-6">

                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-orange-400 mb-4">
                    <span>Artisans</span>
                    <span>•</span>
                    <span>6 Min Read</span>
                  </div>

                  <h4 className="text-2xl font-bold mb-4 leading-snug">
                    A Day Inside Odisha’s Traditional Weaving Villages
                  </h4>

                  <p className="text-stone-400 leading-relaxed mb-6">
                    From sunrise dye preparation to midnight weaving,
                    discover the rhythm and discipline behind Ikat artistry.
                  </p>

                  <Link
                    to="/articles/inside-odisha-weaving-villages"
                    className="text-orange-400 hover:text-orange-300
  transition-colors font-medium"
                  >
                    Read Article →
                  </Link>

                </div>
              </motion.article>

            </motion.div>
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