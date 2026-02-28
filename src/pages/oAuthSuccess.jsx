import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API, { setAccessToken } from "../services/api";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const token = searchParams.get("accessToken");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // 1️⃣ Set access token in axios
        setAccessToken(token);

        // 2️⃣ Fetch logged-in user profile
        const res = await API.get("/auth/me");

        // 3️⃣ Store user in context
        setUser(res.data);

        // 4️⃣ Redirect home
        navigate("/", { replace: true });
      } catch (err) {
        console.error("OAuth error:", err);
        navigate("/login", { replace: true });
      }
    };

    handleGoogleLogin();
  }, [navigate, searchParams, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging you in...
    </div>
  );
};

export default OAuthSuccess;