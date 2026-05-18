import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/sellerApi";

import RestrictedAccess from "./RestrictedAccess";


const ProtectedSellerRoute =
  () => {

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      authenticated,
      setAuthenticated,
    ] = useState(false);

    const [
      seller,
      setSeller,
    ] = useState(null);

    const location =
      useLocation();

    /* =====================================================
       AUTH CHECK
    ===================================================== */

    useEffect(() => {

      const checkAuth =
        async () => {

          try {

            const res =
              await API.get(
                "/seller/me"
              );

            setSeller(
              res.data
            );

            setAuthenticated(
              true
            );

          } catch {

            setAuthenticated(
              false
            );

          } finally {

            setLoading(
              false
            );

          }
        };

      checkAuth();

    }, []);

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">

          <div className="text-center">

            <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-5" />

            <p className="text-stone-600 font-medium">
              Checking seller session...
            </p>

          </div>

        </div>
      );

    }

    /* =====================================================
       NOT AUTHENTICATED
    ===================================================== */

    if (!authenticated) {

      return (
        <Navigate
          to="/seller/login"
          replace
        />
      );

    }

    /* =====================================================
       BLOCK ONBOARDING ACCESS FOR COMPLETED SELLERS
    ===================================================== */

    if (
      seller?.onboardingCompleted &&
      location.pathname.startsWith(
        "/seller/onboarding"
      )
    ) {

      return (
        <Navigate
          to="/seller/dashboard"
          replace
        />
      );

    }

    /* =====================================================
       FORCE ONBOARDING FLOW
    ===================================================== */

    if (
      !seller?.onboardingCompleted &&
      !location.pathname.startsWith(
        "/seller/onboarding"
      )
    ) {

      return (
        <Navigate
          to={`/seller/onboarding/step-${
            seller?.onboardingStep ||
            1
          }`}
          replace
        />
      );

    }

    /* =====================================================
       APPROVED SELLERS → FULL ACCESS
    ===================================================== */

    if (
      seller?.status ===
        "approved" &&
      seller?.onboardingCompleted
    ) {

      return <Outlet />;

    }

    /* =====================================================
       DEFAULT ACCESS
    ===================================================== */

    return <Outlet />;

  };

export default
  ProtectedSellerRoute;