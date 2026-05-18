import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

export const getFeaturedArtisans = async () => {
  const { data } = await axios.get(
    `${API}/api/featured-artisans`
  );

  return data;
};