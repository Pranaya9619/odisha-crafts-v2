import {
  Outlet,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { LogOut } from "lucide-react";

const AdminLayout = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      pathname === path
        ? "bg-orange-500 text-white"
        : "text-gray-300 hover:bg-gray-800"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6 flex flex-col">

        <div>
          <h1 className="text-xl font-bold mb-8">
            Admin Panel
          </h1>

          <nav className="flex flex-col gap-2">

            <Link to="/admin" className={linkClass("/admin")}>
              Dashboard
            </Link>

            <Link
              to="/admin/vendors"
              className={linkClass("/admin/vendors")}
            >
              Vendors
            </Link>

            <Link
              to="/admin/products"
              className={linkClass("/admin/products")}
            >
              Products
            </Link>

          </nav>
        </div>

        {/* 🚪 Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;