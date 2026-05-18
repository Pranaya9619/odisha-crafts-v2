import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import API from "../../services/sellerApi";


const ProtectedOnboardingRoute =
  () => {

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      seller,
      setSeller,
    ] = useState(null);

    useEffect(() => {

      const checkSeller =
        async () => {

          try {

            const res =
              await API.get(
                "/seller/me"
              );

            setSeller(
              res.data
            );

          } catch {

            setSeller(
              null
            );

          } finally {

            setLoading(
              false
            );

          }
        };

      checkSeller();

    }, []);

    if (loading) {

      return (
        <div className="p-10">
          Checking seller...
        </div>
      );

    }

    /* NOT LOGGED IN */

    if (!seller) {

      return (
        <Navigate
          to="/seller/login"
        />
      );

    }

    /* APPROVED SELLERS
       SHOULD NOT SEE ONBOARDING */

    if (
      seller.onboardingCompleted &&
      seller.status ===
        "approved"
    ) {

      return (
        <Navigate
          to="/seller/dashboard"
        />
      );

    }

    /* REJECTED SELLERS */

    if (
      seller.status ===
      "rejected"
    ) {

      return (
        <Navigate
          to="/seller/rejected"
        />
      );

    }

    /* ARCHIVED SELLERS */

    if (
      seller.status ===
      "archived"
    ) {

      return (
        <Navigate
          to="/seller/login"
        />
      );

    }

    return <Outlet />;

  };

export default
  ProtectedOnboardingRoute;