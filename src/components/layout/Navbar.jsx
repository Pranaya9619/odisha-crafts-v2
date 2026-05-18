import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Search,
} from "lucide-react";

import { useStore } from "../../context/StoreContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { cartCount, wishlist } =
    useStore();

  const { user, logout } =
    useAuth();

  const [showNavbar, setShowNavbar] =
    useState(true);

  const [lastScrollY, setLastScrollY] =
    useState(0);

  const [search, setSearch] =
    useState("");

  // Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY;

      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 80
      ) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [lastScrollY]);

  // LIVE SEARCH
  useEffect(() => {
    const delayDebounce =
      setTimeout(() => {

        const trimmed =
          search.trim();

        // move to shop + search
        if (trimmed) {

          navigate(
            `/shop?search=${encodeURIComponent(
              trimmed
            )}`
          );

        }

        // clear search
        else if (
          location.pathname === "/shop"
        ) {

          navigate("/shop");

        }

      }, 300);

    return () =>
      clearTimeout(delayDebounce);

  }, [search]);

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  const navLinkStyle =
    "relative text-[17px] font-medium text-zinc-700 hover:text-orange-700 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-700 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/90 border-b border-orange-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-transform duration-500 ${
        showNavbar
          ? "translate-y-0"
          : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center gap-10">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer group flex-shrink-0"
        >
          <h1 className="font-serif text-4xl font-bold tracking-wide text-zinc-900">
            Odisha
            <span className="text-orange-700 group-hover:text-orange-800 transition">
              Crafts
            </span>
          </h1>

          <div className="h-[2px] w-0 bg-orange-700 group-hover:w-full transition-all duration-500"></div>
        </div>

        {/* Center */}
        <div className="hidden lg:flex items-center gap-12 flex-1 justify-center">

          {/* Nav Links */}
          <div className="flex gap-10 items-center">

            <NavLink
              to="/shop"
              className={navLinkStyle}
            >
              Shop
            </NavLink>

            <NavLink
              to="/artisans"
              className={navLinkStyle}
            >
              Artisans
            </NavLink>

            <NavLink
              to="/impact"
              className={navLinkStyle}
            >
              Impact
            </NavLink>

          </div>

          {/* Search */}
          <div className="relative group">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-700 transition duration-300"
            />

            <input
              type="text"
              placeholder="Search crafts, artisans..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-[320px]
                pl-11
                pr-5
                py-3
                rounded-full
                bg-zinc-100/80
                border
                border-zinc-200
                text-[15px]
                text-zinc-800
                placeholder:text-zinc-400
                outline-none
                focus:border-orange-300
                focus:bg-white
                focus:ring-4
                focus:ring-orange-100
                transition-all
                duration-300
              "
            />

          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5 flex-shrink-0">

          {/* Wishlist */}
          <button
            onClick={() =>
              navigate("/wishlist")
            }
            className="relative text-zinc-700 hover:text-orange-700 transition"
          >
            <Heart
              size={26}
              strokeWidth={1.8}
            />

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() =>
              navigate("/cart")
            }
            className="relative text-zinc-700 hover:text-orange-700 transition"
          >
            <ShoppingBag
              size={22}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-zinc-300 hidden md:block"></div>

          {/* User */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* Profile */}
              <button
                onClick={() =>
                  navigate(
                    "/profile"
                  )
                }
                className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition px-2 py-1.5 rounded-full border border-zinc-200"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <User
                      size={18}
                      className="text-orange-700"
                    />
                  </div>
                )}

                <span className="hidden md:block text-sm font-medium text-zinc-800">
                  {
                    user.name.split(
                      " "
                    )[0]
                  }
                </span>
              </button>

              {/* Logout */}
              <button
                onClick={
                  handleLogout
                }
                className="hidden md:flex items-center gap-1 text-sm text-zinc-500 hover:text-red-500 transition"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          ) : (
            <button
              onClick={() =>
                navigate("/login")
              }
              className="px-6 py-2.5 rounded-full bg-orange-700 text-white text-base font-medium hover:bg-orange-800 transition shadow-md hover:shadow-lg"
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