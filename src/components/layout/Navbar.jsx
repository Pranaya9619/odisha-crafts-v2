import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Heart, User } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount, wishlist } = useStore();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer font-serif text-2xl font-bold"
        >
          OdishaCrafts
        </div>

        <div className="flex gap-8 items-center">

          <button onClick={() => navigate("/shop")}>Shop</button>
          <button onClick={() => navigate("/artisans")}>Artisans</button>
          <button onClick={() => navigate("/impact")}>Impact</button>

          {/* Wishlist */}
          <button onClick={() => navigate("/wishlist")} className="relative">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button onClick={() => navigate("/cart")} className="relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Section */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Avatar Click → Profile */}
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <User size={18} />
                )}
                <span className="hidden md:block text-sm font-medium">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {/* Small Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;