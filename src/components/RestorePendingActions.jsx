import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import API from "../services/api";

const RestorePendingActions = () => {
  const { user } = useAuth();
  const { fetchCart } = useStore();

  useEffect(() => {
    if (!user) return;

    const storedAction = localStorage.getItem("postLoginAction");
    if (!storedAction) return;

    // 🔥 REMOVE IMMEDIATELY
    localStorage.removeItem("postLoginAction");

    const restore = async () => {
      try {
        const action = JSON.parse(storedAction);

        if (action.type === "cart") {
          await API.post("/cart", {
            productId: action.productId,
          });
        }

        if (action.type === "wishlist") {
          await API.post("/cart/wishlist", {
            productId: action.productId,
          });
        }

        await fetchCart();
        console.log("Restore executed once.");
      } catch (err) {
        console.error("Restore failed:", err);
      }
    };

    restore();
  }, [user]);
};

export default RestorePendingActions;