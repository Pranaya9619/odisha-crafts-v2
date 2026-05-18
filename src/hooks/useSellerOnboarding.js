import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/sellerApi";


const useSellerOnboarding =
  (step) => {

    const navigate =
      useNavigate();

    const [
      seller,
      setSeller,
    ] = useState(null);

    const [
      loading,
      setLoading,
    ] = useState(false);

    const [
      error,
      setError,
    ] = useState("");

    /* =====================================================
       PREFILL
    ===================================================== */

    useEffect(() => {

      const fetchSeller =
        async () => {

          try {

            const res =
              await API.get(
                "/seller/profile"
              );

            setSeller(
              res.data
            );

          } catch (err) {

            console.error(
              "Seller fetch error:",
              err
            );

          }
        };

      fetchSeller();

    }, []);

    /* =====================================================
       SAVE STEP
    ===================================================== */

    const saveStep =
      async (
        data,
        nextStep
      ) => {

        try {

          if (loading) return;

          setLoading(true);

          setError("");

          const res =
            await API.post(
              "/seller/onboarding",
              {
                step,
                data,
              }
            );

          // ✅ SYNC WITH BACKEND
          const updatedSeller =
            res.data.seller;

          setSeller(
            updatedSeller
          );

          // ✅ USE SERVER STEP
          const targetStep =
            updatedSeller
              ?.onboardingStep;

          if (
            nextStep &&
            targetStep
          ) {

            // FINAL STEP
            if (
              updatedSeller.onboardingCompleted
            ) {

              navigate(
                "/seller/dashboard",
                {
                  replace: true,
                }
              );

              return true;

            }

            navigate(
              `/seller/onboarding/step-${targetStep}`,
              {
                replace: true,
              }
            );

          }

          return true;

        } catch (err) {

          console.error(
            err
          );

          setError(
            err.response?.data
              ?.message ||
            "Something went wrong"
          );

        } finally {

          setLoading(false);

        }
      };

    /* =====================================================
       BACK
    ===================================================== */

    const goBack =
      (
        previousStep
      ) => {

        navigate(
          `/seller/onboarding/step-${previousStep}`,
          {
            replace: true,
          }
        );

      };

    return {

      seller,

      loading,

      error,

      setError,

      saveStep,

      goBack,
    };

  };

export default
  useSellerOnboarding;