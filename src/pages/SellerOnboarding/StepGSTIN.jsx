import {
  useEffect,
  useState,
} from "react";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";

const StepGSTIN = () => {

  const [gstin, setGstin] =
    useState("");

  const {
    seller,
    loading,
    error,
    setError,
    saveStep,
  } = useSellerOnboarding(1);

  /* =====================================================
     PREFILL
  ===================================================== */

  useEffect(() => {

    if (
      seller?.gstin &&
      !gstin
    ) {
      setGstin(
        seller.gstin
      );
    }

  }, [seller]);

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      const gstRegex =
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

      if (
        !gstRegex.test(gstin)
      ) {
        return setError(
          "Invalid GSTIN format"
        );
      }

      await saveStep(
        {
          gstin,
        },
        2
      );
    };

  return (
    <SellerOnboardingLayout
      title="GST Verification"
      subtitle="Enter your GSTIN number to continue seller registration."
      step={1}
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
           INPUT
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            GSTIN Number
          </label>

          <input
            type="text"
            value={gstin}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s/g, "")
                  .toUpperCase()
                  .slice(0, 15);

              setGstin(value);
            }}
            placeholder="22AAAAA0000A1Z5"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-xs text-stone-500 mt-2">
            GSTIN must be 15 characters long.
          </p>

        </div>

        {/* =================================================
           ERROR
        ================================================= */}

        {error && (

          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>

        )}

        {/* =================================================
           BUTTON
        ================================================= */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-medium disabled:opacity-60"
        >

          {loading
            ? "Saving..."
            : "Continue"}

        </button>

      </form>

    </SellerOnboardingLayout>
  );
};

export default StepGSTIN;