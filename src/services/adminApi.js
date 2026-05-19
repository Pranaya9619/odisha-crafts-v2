import axios from "axios";

const API = axios.create({

  baseURL:
  `${import.meta.env.VITE_API_BASE_URL}/api/admin`,

});

// Attach admin token automatically

API.interceptors.request.use(
  (req) => {

    // ✅ FIXED
    const token =
      localStorage.getItem(
        "adminToken"
      );

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;

    }

    return req;

  }
);

export default API;