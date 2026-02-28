import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

API.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {

    const originalRequest = err.config;

    // 🔥 Prevent infinite loop
    if (
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/logout")
    ) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        accessToken = res.data.accessToken;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return API(originalRequest);
      } catch (refreshErr) {
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default API;