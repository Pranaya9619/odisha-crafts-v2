import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  /* ================= INITIAL STATE ================= */

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  /* ================= PERSISTENCE ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  /* ================= CART FUNCTIONS ================= */

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (_id) =>
    setCart((prev) =>
      prev.filter((item) => item._id !== _id)
    );

  const increaseQty = (_id) =>
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  const decreaseQty = (_id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === _id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  /* ================= WISHLIST ================= */

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev.filter(
          (item) => item._id !== product._id
        );
      }

      return [...prev, product];
    });
  };

  /* ================= CLEAR STORE (FOR LOGOUT) ================= */

  const clearStore = () => {
    setCart([]);
    setWishlist([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
  };

  /* ================= DERIVED VALUES ================= */

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [cart]
  );

  /* ================= PROVIDER ================= */

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        toggleWishlist,
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