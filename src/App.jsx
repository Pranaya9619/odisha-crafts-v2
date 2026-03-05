import React, { useEffect, useState } from "react";
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
import { useAuth } from "./context/AuthContext";
import OAuthSuccess from "./pages/oAuthSuccess";
import MainLayout from "./components/layout/MainLayout";
import Profile from "./pages/Profile";
import VerifyOTP from "./pages/VerifyOTP";
import SellerLogin from "./pages/Seller/SellerLogin";
import SellerDashboard from "./pages/Seller/SellerDashboard";
import ProtectedSellerRoute from "./components/seller/ProtectedSellerRoute";
import SellerLayout from "./components/layout/SellerLayout";
import SellerHome from "./pages/Seller/SellerHome";
import SellerProfile from "./pages/Seller/SellerProfile";
import SellerOrders from "./pages/Seller/SellerOrders";
import SellerReviews from "./pages/Seller/SellerReviews";
import SellerAnalytics from "./pages/Seller/SellerAnalytics";
import ArtisanManager from "./components/seller/ArtisanManager";
import ProductManager from "./components/seller/ProductManager";
import SellerSettings from "./pages/Seller/SellerSettings";

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

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location}>

          {/* 🔵 BUYER SIDE */}
          <Route element={<MainLayout />}>
            <Route path="/profile" element={<Profile />} />
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
            <Route path="/verify-otp" element={<VerifyOTP />} />
          </Route>

          <Route element={<SellerLayout />}>

            <Route path="/seller/login" element={<SellerLogin />} />

            <Route element={<ProtectedSellerRoute />}>

              <Route path="/seller" element={<SellerDashboard />}>

                <Route index element={<Navigate to="dashboard" />} />

                <Route path="dashboard" element={<SellerHome />} />
                <Route path="profile" element={<SellerProfile />} />
                <Route path="artisans" element={<ArtisanManager />} />
                <Route path="products" element={<ProductManager />} />
                <Route path="orders" element={<SellerOrders />} />
                <Route path="reviews" element={<SellerReviews />} />
                <Route path="analytics" element={<SellerAnalytics />} />
                <Route path="settings" element={<SellerSettings />} />

              </Route>

            </Route>

          </Route>

          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;