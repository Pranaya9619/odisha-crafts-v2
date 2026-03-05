import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/sellerApi";

const ProtectedSellerRoute = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const checkAuth = async () => {
      try {

        await API.get("/seller/me");
        setAuthenticated(true);

      } catch {

        setAuthenticated(false);

      } finally {

        setLoading(false);

      }
    };

    checkAuth();

  }, []);

  if (loading) {
    return (
      <div className="p-10 text-gray-600">
        Checking seller session...
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/seller/login" />;
  }

  return <Outlet />;

};

export default ProtectedSellerRoute;