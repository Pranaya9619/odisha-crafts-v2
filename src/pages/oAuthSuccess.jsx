// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import API, { setAccessToken } from "../services/api";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const { toggleWishlist } = useStore();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const token = searchParams.get("accessToken");
      const redirect =
        searchParams.get("redirect") || "/";

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // ✅ Set token globally
        setAccessToken(token);

        // ✅ Fetch logged-in user
        const res = await API.get("/auth/me");
        setUser(res.data);

        // ✅ Handle pending wishlist
        const pending = localStorage.getItem("pendingWishlist");

        if (pending) {
          const product = JSON.parse(pending);
          toggleWishlist(product);
          localStorage.removeItem("pendingWishlist");
        }

        navigate(redirect, { replace: true });
      } catch (err) {
        console.error("OAuth error:", err);
        navigate("/login", { replace: true });
      }
    };

    handleGoogleLogin();
  }, [navigate, searchParams, setUser, toggleWishlist]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging you in...
    </div>
  );
};

export default OAuthSuccess;