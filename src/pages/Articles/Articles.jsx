import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { articles } from "../../data/articles";

const Articles = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-stone-950 text-white pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-16 text-center">
            <p className="uppercase tracking-[0.3em] text-orange-400 text-sm mb-3">
              Editorial Journal
            </p>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-5 leading-tight">
              Stories From OdishaCrafts
            </h1>

            <p className="text-stone-400 max-w-2xl mx-auto text-lg leading-8">
              Culture. Heritage. Artisans.
              <br />
              Memory woven into matter.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="
                  group
                  bg-stone-900
                  rounded-3xl
                  overflow-hidden
                  border
                  border-stone-800
                  hover:border-orange-500/40
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="
                      h-64
                      w-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-700
                    "
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-orange-400 text-xs uppercase tracking-widest mb-3">
                    {article.category}
                  </div>

                  <h2 className="text-2xl font-bold mb-4 group-hover:text-orange-300 transition">
                    {article.title}
                  </h2>

                  <p className="text-stone-400 mb-6 leading-7">
                    {article.excerpt}
                  </p>

                  <span className="text-orange-400 font-medium group-hover:tracking-wide transition-all">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Articles;