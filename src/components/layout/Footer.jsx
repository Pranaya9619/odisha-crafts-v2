import React, { useState } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const goToShop = (params = {}) => {
    const query = new URLSearchParams(params).toString();
    navigate(query ? `/shop?${query}` : "/shop");
  };

  const goToSeller = () => {
    navigate("/seller-register");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter a valid email.");
      return;
    }

    console.log("Subscribed:", email);
    setEmail("");
    alert("Thanks for subscribing ✨");
  };

  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-900">
      
      {/* ✅ RESPONSIVE GRID FIXED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">

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
            {[Instagram, Youtube, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
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
            {["Ikat", "Pattachitra", "Silver Filigree", "Terracotta"].map(
              (category) => (
                <li key={category}>
                  <button
                    onClick={() => goToShop({ category })}
                    className="hover:text-orange-500"
                  >
                    {category}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Discover by District */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
            Explore by District
          </h3>
          <ul className="space-y-2 text-sm">
            {["Sambalpur", "Puri", "Cuttack", "Keonjhar"].map(
              (district) => (
                <li key={district}>
                  <button
                    onClick={() => goToShop({ district })}
                    className="hover:text-orange-500"
                  >
                    {district}
                  </button>
                </li>
              )
            )}
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
              className="bg-orange-700 text-white px-4 py-2 rounded-r-md font-medium text-sm hover:bg-orange-600 transition-colors"
            >
              Join
            </button>
          </form>
        </div>

        {/* ✅ Sell on OdishaCrafts */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">
            Sell on OdishaCrafts
          </h3>

          <p className="text-sm mb-4">
            Join our artisan community and grow your business with us.
          </p>
          <button 
          onClick={goToSeller}
          className="ml-auto block bg-orange-700 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Join us
            </button>

        
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-900 text-center text-xs">
        <p>
          &copy; {new Date().getFullYear()} OdishaCrafts. Built with ❤️ for Odisha.
        </p>
      </div>
    </footer>
  );
};

export default Footer;