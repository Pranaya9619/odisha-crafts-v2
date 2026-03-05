import { Link, useLocation } from "react-router-dom";
import { Store, ShoppingBag, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SellerNavbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/seller/login" ||
    location.pathname === "/seller/register";

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">

      {/* Logo */}
      <Link to="/seller/dashboard" className="flex items-center gap-2">
        <Store className="text-orange-500" size={22} />
        <span className="font-semibold text-lg">OdishaCrafts</span>
      </Link>

      {/* Menu */}
      <div className="flex gap-6 items-center text-sm">

        <Link
          to="/marketplace"
          className="flex items-center gap-1 hover:text-orange-400 transition"
        >
          <ShoppingBag size={16} />
          Marketplace
        </Link>

        {!isAuthPage && (
          <>
            <Link
              to="/seller/profile"
              className="flex items-center gap-1 hover:text-orange-400 transition"
            >
              <User size={16} />
              Profile
            </Link>

            <button
              onClick={() => {
                logout();
                navigate("/seller/login");
              }}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default SellerNavbar;