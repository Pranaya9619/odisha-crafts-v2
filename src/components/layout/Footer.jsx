import React, { useState } from "react";
import {
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

const Footer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const goToSeller = () => {
    navigate("/seller/login");
  };

  const handleNewsletterSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setLoading(true);
      setMessage(null);

      await API.post(
        "/newsletter",
        { email }
      );

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

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#120d08] via-[#140d08] to-black text-stone-400 border-t border-stone-900">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-900/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-700/10 blur-3xl rounded-full"></div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 items-start">

          {/* LEFT */}
          <div>

            <h2 className="text-white text-5xl font-serif font-bold tracking-tight mb-6 leading-none">
              Odisha
              <span className="text-orange-500">
                Crafts
              </span>
            </h2>

            <p className="text-[17px] leading-9 text-stone-400 max-w-2xl">
              OdishaCrafts is a digital initiative dedicated to
              preserving and celebrating the timeless artistic
              heritage of Odisha. From the intricate brushwork of
              Pattachitra to the woven poetry of Sambalpuri Ikat,
              we connect master artisans and age-old traditions
              with a global audience that values authenticity,
              craftsmanship, and cultural storytelling. Every
              creation carries generations of skill, patience,
              and identity — handcrafted not merely as products,
              but as living expressions of Odisha’s soul. Through
              thoughtful design, ethical collaboration, and
              modern technology, we aim to empower artisan
              communities, sustain traditional livelihoods, and
              ensure these extraordinary crafts continue to
              inspire future generations across the world.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-5 mt-10">

              {[
                {
                  Icon: Instagram,
                  link: "https://www.instagram.com/",
                },
                {
                  Icon: Youtube,
                  link: "https://www.youtube.com/",
                },
                {
                  Icon: Twitter,
                  link: "https://twitter.com/",
                },
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full hover:bg-orange-700 hover:border-orange-600 hover:scale-110 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">

            {/* NEWSLETTER */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-8">

              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-[0.3em]">
                Newsletter
              </h3>

              <p className="text-[15px] leading-7 mb-6 text-stone-400">
                Letters from the looms.
                <br />
                Stories from the soil.
              </p>

              <form
                onSubmit={
                  handleNewsletterSubmit
                }
                className="flex overflow-hidden rounded-2xl border border-white/10 bg-black/20"
              >

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Email Address"
                  required
                  className="bg-transparent px-5 py-4 w-full text-sm text-white placeholder:text-stone-500 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-orange-700 text-white px-7 py-4 font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-60"
                >
                  {loading
                    ? "..."
                    : "Join"}
                </button>

              </form>

              {message && (
                <p
                  className={`text-xs mt-3 ${message.type ===
                      "success"
                      ? "text-green-400"
                      : "text-red-400"
                    }`}
                >
                  {message.text}
                </p>
              )}

            </div>

            {/* SELLER */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-8">

              <h3 className="text-white text-2xl font-semibold leading-snug mb-4">
                Sell on OdishaCrafts
              </h3>

              <p className="text-[15px] leading-8 text-stone-400 mb-7">
                Share your craft with the world.
                Join our growing artisan
                marketplace.
              </p>

              <button
                onClick={goToSeller}
                className="w-full bg-gradient-to-r from-orange-700 to-orange-500 text-white py-4 rounded-2xl text-[15px] font-semibold hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-900/30 transition-all duration-300"
              >
                Become a Seller
              </button>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 border-t border-white/10"></div>

        {/* BOTTOM */}
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">

          <p>
            © {new Date().getFullYear()} OdishaCrafts.
          </p>

          <p>
            Preserving heritage through digital craftsmanship.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;