import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import API from "../services/api";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // useEffect(() => {
  //   console.log("CART DATA:", cart);
  // }, [cart]);
  /* ================= SYNC FROM BACKEND ================= */

  const fetchCart = async () => {
    const res = await API.get("/cart");
    setCart(res.data.cart);
    setWishlist(res.data.wishlist);
  };

  /* ================= CART ACTIONS ================= */

  const addToCart = async (product) => {
    await API.post("/cart", { productId: product._id });
    await fetchCart();
  };

  const removeFromCart = async (productId) => {
    await API.delete(`/cart/${productId}`);
    await fetchCart();
  };

  const toggleWishlist = async (product) => {
    await API.post("/cart/wishlist", {
      productId: product._id,
    });
    await fetchCart();
  };

  const clearStore = () => {
    setCart([]);
    setWishlist([]);
  };

  const cartCount = useMemo(
    () =>
      cart.reduce((acc, item) => {
        if (!item || !item.product) return acc;
        return acc + (item.quantity || 0);
      }, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((acc, item) => {
        if (!item || !item.product) return acc;

        const price = Number(item.product.price) || 0;
        const qty = Number(item.quantity) || 0;

        return acc + price * qty;
      }, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        toggleWishlist,
        fetchCart,
        clearStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx)
    throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};