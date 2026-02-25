import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Impact from "./pages/Impact/Impact";
import Artisans from "./pages/Artisans/Artisans";
import Cart from "./pages/Cart/cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const location = useLocation();

  return (
    <div className="font-sans text-stone-800 bg-stone-50 min-h-screen flex flex-col">
      
      <ScrollToTop />

      <Navbar />

      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/artisans" element={<Artisans />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;