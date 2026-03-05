import React, { createContext, useContext, useEffect, useState } from "react";
import API, { setAccessToken } from "../services/api";
import axios from "axios";
//const { clearStore, setCart, setWishlist } = useStore();
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await API.post("/auth/refresh");

        setAccessToken(res.data.accessToken);

        const profile = await API.get("/users/profile");
        setUser(profile.data);

      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshAuth();
  }, []);

  /* ================= LOGIN ================= */

  const login = async (email, password) => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    setAccessToken(res.data.accessToken);

    // 🔥 Fetch full profile after login
    const profile = await API.get("/users/profile");
    setUser(profile.data);
    
    return res.data;
  };

  /* ================= LOGOUT ================= */

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {}

    setAccessToken(null);
    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, setUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);