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
import OAuthSuccess from "./pages/oAuthSuccess";

import SellerRegister from "./pages/SellerRegister/SellerRegister";
//import SellerLogin from "./pages/SellerHome/SellerLogin";
import SellerDashboard from "./pages/SellerHome/SellerDashboard";

import { useAuth } from "./context/AuthContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Hide Navbar + Footer on seller pages
  const hideLayout =
    location.pathname.startsWith("/seller");

  return (
    <div className="font-sans text-stone-800 bg-stone-50 min-h-screen flex flex-col">

      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/artisans" element={<Artisans />} />

            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />

            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* SELLER ROUTES */}
            <Route path="/seller-register" element={<SellerRegister />} />
            

            <Route
              path="/seller-dashboard"
              element={
                localStorage.getItem("seller")
                  ? <SellerDashboard />
                  : <Navigate to="/seller-login" />
              }
            />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </AnimatePresence>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;