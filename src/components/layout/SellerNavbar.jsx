import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const sellerName = "Pranaya"; // later pull from context

  const logout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/seller-register");
  };

  return (
    <header className="h-16 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between px-8">

      {/* Left */}
      <div
        onClick={() => navigate("/seller-dashboard")}
        className="flex items-center gap-3 cursor-pointer"
      >
        <span className="text-xl font-semibold text-white">
          OdishaCrafts
        </span>
        <span className="px-3 py-1 text-xs font-medium bg-orange-600/20 text-orange-500 rounded-full">
          SELLER PORTAL
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button
          onClick={() => navigate("/")}
          className="text-sm text-stone-400 hover:text-white transition"
        >
          Marketplace
        </button>

        <div
          onClick={() => navigate("/seller-dashboard?tab=profile")}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-sm font-semibold">
            {sellerName[0]}
          </div>
          <span className="text-sm text-stone-300">
            {sellerName}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition"
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>
    </header>
  );
};

export default SellerNavbar;