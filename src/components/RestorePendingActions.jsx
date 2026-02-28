import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

const RestorePendingActions = () => {
  const { user } = useAuth();
  const { addToCart, toggleWishlist } = useStore();

  useEffect(() => {
    // Only run this if we have a successfully authenticated user
    if (user) {
      const pendingCart = localStorage.getItem("pendingCart");
      if (pendingCart) {
        addToCart(JSON.parse(pendingCart));
        localStorage.removeItem("pendingCart");
      }

      const pendingWishlist = localStorage.getItem("pendingWishlist");
      if (pendingWishlist) {
        toggleWishlist(JSON.parse(pendingWishlist));
        localStorage.removeItem("pendingWishlist");
      }
    }
  }, [user, addToCart, toggleWishlist]);

  // This component doesn't render any UI
  return null; 
};

export default RestorePendingActions;