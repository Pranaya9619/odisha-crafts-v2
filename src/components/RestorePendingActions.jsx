import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

const RestorePendingActions = () => {
  const { user } = useAuth();
  const { addToCart, toggleWishlist } = useStore();

  useEffect(() => {
    if (!user) return;

    const pendingCart = localStorage.getItem("pendingCart");
    const pendingWishlist = localStorage.getItem("pendingWishlist");

    if (pendingCart) {
      addToCart(JSON.parse(pendingCart));
      localStorage.removeItem("pendingCart");
    }

    if (pendingWishlist) {
      toggleWishlist(JSON.parse(pendingWishlist));
      localStorage.removeItem("pendingWishlist");
    }

  }, [user]); 

  // This component doesn't render any UI
  return null; 
};

export default RestorePendingActions;