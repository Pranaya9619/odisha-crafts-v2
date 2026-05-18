import axios from "axios";

const API = axios.create({

  baseURL:
    "http://localhost:5000/api/admin",

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