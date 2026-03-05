import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Users, Package, ShoppingBag, Star, BarChart3, Settings, LogOut } from "lucide-react";

const SellerDashboard = () => {

  const location = useLocation();

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/seller/dashboard" },
    { id: "profile", label: "Profile", icon: User, path: "/seller/profile" },
    { id: "artisans", label: "Artisans", icon: Users, path: "/seller/artisans" },
    { id: "products", label: "Products", icon: Package, path: "/seller/products" },
    { id: "orders", label: "Orders", icon: ShoppingBag, path: "/seller/orders" },
    { id: "reviews", label: "Reviews", icon: Star, path: "/seller/reviews" },
    { id: "analytics", label: "Analytics", icon: BarChart3, path: "/seller/analytics" },
    { id: "settings", label: "Settings", icon: Settings, path: "/seller/settings" },
  ];


  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    window.location.href = "/seller/login";
  };


  /* ================= DEFAULT REDIRECT ================= */

  if (location.pathname === "/seller") {
    return <Navigate to="/seller/dashboard" replace />;
  }


  return (
    <div className="flex min-h-[calc(100vh-120px)]">

      {/* Sidebar */}

      <aside className="w-64 bg-stone-900 text-white p-6 flex flex-col">

        <h2 className="text-xl font-semibold mb-8 tracking-wide">
          Seller Panel
        </h2>


        {/* Menu */}

        <nav className="flex flex-col gap-2 flex-1">

          {menu.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded transition ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-stone-800 text-stone-300"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}

        </nav>


        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 mt-6 px-3 py-2 rounded hover:bg-red-600 bg-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>


      {/* Content */}

      <main className="flex-1 p-8 bg-stone-100 overflow-y-auto">

        <Outlet />

      </main>

    </div>
  );
};

export default SellerDashboard;