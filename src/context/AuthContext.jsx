import React, { createContext, useContext, useEffect, useState } from "react";
import API, { setAccessToken } from "../services/api";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Auto refresh on app load
  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await API.post("/auth/refresh");

        setAccessToken(res.data.accessToken);

        // Optional: fetch current user profile if needed
        const profile = await API.get("/auth/me");
        setUser(profile.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    refreshAuth();
  }, []);

  // 🔥 Login
  const login = async (email, password) => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  // 🔥 Logout
  const logout = async () => {
    console.log("Logout triggered");

    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Logout error ignored:", err);
    }

    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);