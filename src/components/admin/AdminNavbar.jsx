import { Link, useLocation } from "react-router-dom";

const AdminNavbar = () => {
  const { pathname } = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg ${
      pathname === path
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-200"
    }`;

  return (
    <div className="bg-white shadow px-6 py-4 flex gap-4">

      <Link to="/admin" className={linkStyle("/admin")}>
        Dashboard
      </Link>

      <Link to="/admin/vendors" className={linkStyle("/admin/vendors")}>
        Vendors
      </Link>

      <Link to="/admin/products" className={linkStyle("/admin/products")}>
        Products
      </Link>

    </div>
  );
};

export default AdminNavbar;