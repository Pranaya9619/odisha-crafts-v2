import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlist } = useStore();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

        <div
          onClick={() => navigate("/")}
          className="cursor-pointer font-serif text-2xl font-bold"
        >
          OdishaCrafts
        </div>

        <div className="flex gap-8 items-center">

          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition"
          >
            Login
          </button>
          
          <button onClick={() => navigate("/shop")}>
            Shop
          </button>
          
          <button onClick={() => navigate("/artisans")}>
            Artisans
          </button>

          <button onClick={() => navigate("/impact")}>
            Impact
          </button>

          <button onClick={() => navigate("/wishlist")} className="relative">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;