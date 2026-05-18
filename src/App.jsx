import {
  useEffect,
} from "react";

import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import {
  AnimatePresence,
} from "framer-motion";

import Home from "./pages/Home/Home";

import Shop from "./pages/Shop/Shop";

import ProductDetails from "./pages/ProductDetails/ProductDetails";

import Impact from "./pages/Impact/Impact";

import Artisans from "./pages/Artisans/Artisans";

import Cart from "./pages/Cart/cart";

import Wishlist from "./pages/Wishlist/Wishlist";

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import {
  useAuth,
} from "./context/AuthContext";

import OAuthSuccess from "./pages/OAuthSuccess";

import MainLayout from "./components/layout/MainLayout";

import Profile from "./pages/Profile";

import VerifyOTP from "./pages/VerifyOTP";

import SellerLogin from "./pages/Seller/SellerLogin";

import SellerDashboard from "./pages/Seller/SellerDashboard";

import ProtectedSellerRoute from "./components/seller/ProtectedSellerRoute";

import ProtectedOnboardingRoute from "./components/seller/ProtectedOnboardingRoute";

import SellerLayout from "./components/layout/SellerLayout";

import SellerHome from "./pages/Seller/SellerHome";

import SellerProfile from "./pages/Seller/SellerProfile";

import SellerOrders from "./pages/Seller/SellerOrders";

import SellerReviews from "./pages/Seller/SellerReviews";

import SellerAnalytics from "./pages/Seller/SellerAnalytics";

import ArtisanManager from "./components/seller/ArtisanManager";

import ProductManager from "./components/seller/ProductManager";

import SellerSettings from "./pages/Seller/SellerSettings";

import StepGSTIN from "./pages/SellerOnboarding/StepGSTIN";

import StepPAN from "./pages/SellerOnboarding/StepPAN";

import StepStore from "./pages/SellerOnboarding/StepStore";

import StepShipping from "./pages/SellerOnboarding/StepShipping";

import StepBank from "./pages/SellerOnboarding/StepBank";

import StepConsent from "./pages/SellerOnboarding/StepConsent";

import AdminDashboard from "./pages/Admin/AdminDashboard";

import VendorApprovals from "./pages/Admin/VendorApprovals";

import ProductModeration from "./pages/Admin/ProductModeration";

import AdminLayout from "./components/layout/AdminLayout";

import AdminLogin from "./pages/Admin/AdminLogin";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import SellerOAuthSuccess from "./pages/Seller/SellerOAuthSuccess";

import Unsubscribe from "./pages/Unsubscribe";
import SellerForgotPassword from "./pages/Seller/SellerForgotPassword";

import Articles from "./pages/Articles/Articles";
import ArticleDetails from "./pages/Articles/ArticleDetails";

import FeaturedArtisanDetails
  from "./pages/Artisans/FeaturedArtisanDetails";

function ScrollToTop() {

  const { pathname } =
    useLocation();

  useEffect(() => {

    window.scrollTo(0, 0);

  }, [pathname]);

  return null;

}


const App = () => {

  const location =
    useLocation();

  const { user } =
    useAuth();

  // ✅ ADMIN CHECK
  const adminToken =
    localStorage.getItem(
      "adminToken"
    );

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">

        <Routes
          location={location}
        >

          {/* BUYER SIDE */}

          <Route
            element={
              <MainLayout />
            }
          >

            <Route
              path="/profile"
              element={
                <Profile />
              }
            />

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/shop"
              element={<Shop />}
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetails />
              }
            />

            <Route
              path="/impact"
              element={
                <Impact />
              }
            />

            <Route
              path="/artisans"
              element={
                <Artisans />
              }
            />

            <Route
              path="/cart"
              element={
                user
                  ? <Cart />
                  : (
                    <Navigate to="/login" />
                  )
              }
            />

            <Route
              path="/wishlist"
              element={
                <Wishlist />
              }
            />

            <Route
              path="/login"
              element={
                <Login />
              }
            />

            <Route
              path="/signup"
              element={
                <Signup />
              }
            />

            <Route
              path="/oauth-success"
              element={
                <OAuthSuccess />
              }
            />

            <Route
              path="/verify-otp"
              element={
                <VerifyOTP />
              }
            />

            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

          </Route>

          <Route path="/articles" element={<Articles />} />

          <Route
            path="/articles/:slug"
            element={<ArticleDetails />}
          />

          <Route
            path="/featured-artisans/:id"
            element={
              <FeaturedArtisanDetails />
            }
          />

          {/* SELLER */}

          <Route
            element={
              <SellerLayout />
            }
          >

            <Route
              path="/seller/login"
              element={
                <SellerLogin />
              }
            />

            <Route
              path="/seller/oauth-success"
              element={<SellerOAuthSuccess />}
            />

            <Route
              path="/seller-forgot-password"
              element={<SellerForgotPassword />}
            />

            {/* ONBOARDING */}

            <Route
              element={
                <ProtectedOnboardingRoute />
              }
            >

              <Route
                path="/seller/onboarding/step-1"
                element={
                  <StepGSTIN />
                }
              />

              <Route
                path="/seller/onboarding/step-2"
                element={
                  <StepPAN />
                }
              />

              <Route
                path="/seller/onboarding/step-3"
                element={
                  <StepStore />
                }
              />

              <Route
                path="/seller/onboarding/step-4"
                element={
                  <StepShipping />
                }
              />

              <Route
                path="/seller/onboarding/step-5"
                element={
                  <StepBank />
                }
              />

              <Route
                path="/seller/onboarding/step-6"
                element={
                  <StepConsent />
                }
              />

            </Route>

            {/* SELLER DASHBOARD */}

            <Route
              element={
                <ProtectedSellerRoute />
              }
            >

              <Route
                path="/seller"
                element={
                  <SellerDashboard />
                }
              >

                <Route
                  index
                  element={
                    <Navigate to="dashboard" />
                  }
                />

                <Route
                  path="dashboard"
                  element={
                    <SellerHome />
                  }
                />

                <Route
                  path="profile"
                  element={
                    <SellerProfile />
                  }
                />

                <Route
                  path="artisans"
                  element={
                    <ArtisanManager />
                  }
                />

                <Route
                  path="products"
                  element={
                    <ProductManager />
                  }
                />

                <Route
                  path="orders"
                  element={
                    <SellerOrders />
                  }
                />

                <Route
                  path="reviews"
                  element={
                    <SellerReviews />
                  }
                />

                <Route
                  path="analytics"
                  element={
                    <SellerAnalytics />
                  }
                />

                <Route
                  path="settings"
                  element={
                    <SellerSettings />
                  }
                />

              </Route>

            </Route>

          </Route>

          {/* ADMIN */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          <Route
            path="/admin"
            element={
              adminToken
                ? <AdminLayout />
                : <Navigate to="/admin/login" replace />
            }
          >

            <Route
              index
              element={
                <AdminDashboard />
              }
            />

            <Route
              path="vendors"
              element={
                <VendorApprovals />
              }
            />

            <Route
              path="products"
              element={
                <ProductModeration />
              }
            />

          </Route>

          <Route path="/unsubscribe" element={<Unsubscribe />} />

        </Routes>

      </AnimatePresence>
    </>
  );

};

export default App;