import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { articles } from "../../data/articles";

const ArticleDetails = () => {
  const { slug } = useParams();

  const article = articles.find(
    (a) => a.slug === slug
  );

  if (!article) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
          <h1 className="text-3xl font-semibold">
            Article Not Found
          </h1>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-stone-950 text-white pt-24">

        {/* Hero Image */}
        <div className="h-[60vh] overflow-hidden relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-20">

          <div className="text-orange-400 uppercase tracking-widest text-sm mb-4">
            {article.category}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-stone-500 mb-12 text-sm tracking-wide">
            {article.readTime}
          </p>

          <div className="text-lg leading-9 text-stone-300 whitespace-pre-line">
            {article.content}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticleDetails;