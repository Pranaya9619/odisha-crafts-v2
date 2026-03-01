import React, { createContext, useContext, useMemo, useState } from "react";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Cart & Wishlist
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Orders
  const [orders, setOrders] = useState([]);
  const addOrder = (order) => setOrders((prev) => [...prev, order]);

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const addAddress = (addr) =>
    setAddresses((prev) => (prev.includes(addr) ? prev : [...prev, addr]));
  const editAddress = (index, newAddr) =>
    setAddresses((prev) =>
      prev.map((addr, i) => (i === index ? newAddr : addr))
    );
  const removeAddress = (index) =>
    setAddresses((prev) => prev.filter((_, i) => i !== index));

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const increaseQty = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product];
    });
  };

  // Memoized values
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addresses,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        toggleWishlist,
        clearCart,
        addOrder,
        addAddress,
        editAddress,
        removeAddress,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
};