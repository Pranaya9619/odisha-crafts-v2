import {
  useEffect,
  useState,
} from "react";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";

const StepStore = () => {

  const [storeName, setStoreName] =
    useState("");

  const {
    seller,
    loading,
    error,
    setError,
    saveStep,
    goBack,
  } = useSellerOnboarding(3);

  /* =====================================================
     PREFILL
  ===================================================== */

  useEffect(() => {

    if (
      seller?.storeName &&
      !storeName
    ) {
      setStoreName(
        seller.storeName
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

      if (
        !storeName.trim()
      ) {
        return setError(
          "Store name is required"
        );
      }

      if (
        storeName.trim()
          .length < 3
      ) {
        return setError(
          "Store name must be at least 3 characters"
        );
      }

      await saveStep(
        {
          storeName,
        },
        4
      );
    };

  return (
    <SellerOnboardingLayout
      title="Create Your Store"
      subtitle="Choose the public name customers will see."
      step={3}
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
           STORE NAME
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            Store Name
          </label>

          <input
            type="text"
            value={storeName}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s+/g, " ")
                  .slice(0, 50);

              setStoreName(value);
            }}
            placeholder="Ex: Pattachitra Studio"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-sm text-stone-500 mt-2">
            This can be changed later in Settings.
          </p>

        </div>

        {/* =================================================
           STORE PREVIEW
        ================================================= */}

        {storeName.trim() && (

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

            <p className="text-xs uppercase tracking-wide text-stone-500 mb-2">
              Store Preview
            </p>

            <h3 className="text-2xl font-bold text-stone-900">
              {storeName}
            </h3>

            <p className="text-sm text-stone-500 mt-2">
              This is how your store may appear to customers.
            </p>

          </div>

        )}

        {/* =================================================
           ERROR
        ================================================= */}

        {error && (

          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>

        )}

        {/* =================================================
           ACTIONS
        ================================================= */}

        <div className="flex gap-4">

          <button
            type="button"
            onClick={() =>
              goBack(2)
            }
            className="flex-1 border border-stone-300 py-3 rounded-xl hover:bg-stone-100 transition"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-medium disabled:opacity-60"
          >

            {loading
              ? "Saving..."
              : "Continue"}

          </button>

        </div>

      </form>

    </SellerOnboardingLayout>
  );
};

export default StepStore;