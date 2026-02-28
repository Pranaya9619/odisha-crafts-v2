import React, { useState } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const Footer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const goToShop = (params = {}) => {
    const query = new URLSearchParams(params).toString();
    navigate(query ? `/shop?${query}` : "/shop");
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setLoading(true);
      setMessage(null);

      await API.post("/newsletter", { email });

      setMessage({
        type: "success",
        text: "You're officially on the list ✨",
      });

      setEmail("");
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Subscription failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Palm Engraving",
    "Pattachitra",
    "Sambalpuri Ikat",
    "Silver Filigree",
    "Terracotta",
  ];

  const districts = [
    "Bhubaneswar",
    "Cuttack",
    "Keonjhar",
    "Puri",
    "Raghurajpur",
    "Sambalpur",
  ];

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h2 className="text-white text-2xl font-serif font-bold mb-4">
            OdishaCrafts
          </h2>

          <p className="text-sm leading-relaxed mb-6">
            A digital initiative connecting the world with the timeless
            heritage of Odisha’s master artisans.
          </p>

          <div className="flex space-x-4">
            {[
              { Icon: Instagram, link: "https://www.instagram.com/" },
              { Icon: Youtube, link: "https://www.youtube.com/" },
              { Icon: Twitter, link: "https://twitter.com/" },
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-stone-800 rounded-full hover:bg-orange-700 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Discover by Craft */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
            Discover by Craft
          </h3>

          <ul className="space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => goToShop({ category })}
                  className="hover:text-orange-500 transition-colors"
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore by District */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
            Explore by District
          </h3>

          <ul className="space-y-2 text-sm">
            {districts.map((district) => (
              <li key={district}>
                <button
                  onClick={() => goToShop({ district })}
                  className="hover:text-orange-500 transition-colors"
                >
                  {district}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
            Newsletter
          </h3>

          <p className="text-xs mb-4">
            Letters from the looms. Stories from the soil.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="bg-stone-900 border-none rounded-l-md px-4 py-2 w-full text-sm focus:ring-1 focus:ring-orange-700 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-700 text-white px-4 py-2 rounded-r-md font-medium text-sm hover:bg-orange-600 transition-colors disabled:opacity-60"
            >
              {loading ? "..." : "Join"}
            </button>
          </form>

          {message && (
            <p
              className={`text-xs mt-3 ${
                message.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-900 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} OdishaCrafts. Built with ❤️ for Odisha.
        </p>
      </div>
    </footer>
  );
};

export default Footer;