import {
  useEffect,
  useState,
} from "react";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";

const StepPAN = () => {

  const [name, setName] =
    useState("");

  const [panNumber, setPanNumber] =
    useState("");

  const [documentUrl, setDocumentUrl] =
    useState("");

  const {
    seller,
    loading,
    error,
    setError,
    saveStep,
    goBack,
  } = useSellerOnboarding(2);

  /* =====================================================
     PREFILL
  ===================================================== */

  useEffect(() => {

    if (
      seller?.name &&
      !name
    ) {
      setName(
        seller.name
      );
    }

    if (
      seller?.pan?.number &&
      !panNumber
    ) {
      setPanNumber(
        seller.pan.number
      );
    }

    if (
      seller?.pan?.documentUrl &&
      !documentUrl
    ) {
      setDocumentUrl(
        seller.pan.documentUrl
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

      const panRegex =
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

      if (!name.trim()) {
        return setError(
          "Name is required"
        );
      }

      if (
        !panRegex.test(
          panNumber
        )
      ) {
        return setError(
          "Invalid PAN format"
        );
      }

      if (
        !documentUrl.trim()
      ) {
        return setError(
          "PAN document is required"
        );
      }

      await saveStep(
        {
          name,
          panNumber,
          documentUrl,
        },
        3
      );
    };

  return (
    <SellerOnboardingLayout
      title="PAN Verification"
      subtitle="Enter PAN details exactly as they appear on official documents."
      step={2}
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
           FULL NAME
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            Full Legal Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s+/g, " ")
                  .slice(0, 60);

              setName(value);
            }}
            placeholder="Enter full legal name"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

        {/* =================================================
           PAN NUMBER
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            PAN Number
          </label>

          <input
            type="text"
            value={panNumber}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s/g, "")
                  .toUpperCase()
                  .slice(0, 10);

              setPanNumber(value);
            }}
            placeholder="ABCDE1234F"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-xs text-stone-500 mt-2">
            PAN must be 10 characters long.
          </p>

        </div>

        {/* =================================================
           DOCUMENT URL
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            PAN Document
          </label>

          <input
            type="text"
            value={documentUrl}
            onChange={(e) =>
              setDocumentUrl(
                e.target.value
              )
            }
            placeholder="Paste uploaded document link"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-xs text-stone-500 mt-2">
            Upload your PAN document to Cloudinary or Drive and paste the shareable link here.
          </p>

        </div>

        {/* =================================================
           PREVIEW
        ================================================= */}

        {(name || panNumber) && (

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

            <p className="text-xs uppercase tracking-wide text-stone-500 mb-3">
              Verification Preview
            </p>

            <div className="space-y-2">

              <p className="text-sm text-stone-600">
                <span className="font-medium text-stone-900">
                  Name:
                </span>{" "}
                {name || "-"}
              </p>

              <p className="text-sm text-stone-600">
                <span className="font-medium text-stone-900">
                  PAN:
                </span>{" "}
                {panNumber || "-"}
              </p>

            </div>

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
              goBack(1)
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

export default StepPAN;