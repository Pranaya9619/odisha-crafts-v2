import {
  useEffect,
  useState,
} from "react";

import {
  ShieldCheck,
  FileSignature,
  CheckCircle2,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";


const StepConsent = () => {

  const navigate =
    useNavigate();

  const [
    agreed,
    setAgreed,
  ] = useState(false);

  const [
    signatureUrl,
    setSignatureUrl,
  ] = useState("");

  const {
    seller,
    loading,
    error,
    setError,
    saveStep,
    goBack,
  } = useSellerOnboarding(6);

  /* =====================================================
     PREFILL
  ===================================================== */

  useEffect(() => {

    if (
      seller?.consentForm
        ?.agreed
    ) {

      setAgreed(true);

    }

    if (
      seller?.consentForm
        ?.signatureUrl &&
      !signatureUrl
    ) {

      setSignatureUrl(
        seller
          .consentForm
          .signatureUrl
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

      if (!agreed) {

        return setError(
          "You must accept the Terms & Conditions"
        );

      }

      if (
        !signatureUrl.trim()
      ) {

        return setError(
          "Signature upload is required"
        );

      }

      // ✅ WAIT FOR RESULT
      const result =
        await saveStep(
          {
            agreed,
            signatureUrl,
          },
          6
        );

      // ✅ ONLY NAVIGATE ON SUCCESS
      if (!result) return;

      navigate(
        "/seller/dashboard",
        {
          replace: true,
        }
      );

    };

  return (
    <SellerOnboardingLayout
      title="Terms & Agreement"
      subtitle="Review platform terms and complete seller onboarding."
      step={6}
    >

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-8"
      >

        {/* =================================================
           SUCCESS HEADER
        ================================================= */}

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">

              <CheckCircle2
                size={24}
                className="text-green-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-stone-900">

                Final Verification Step

              </h3>

              <p className="text-sm text-stone-600 mt-2 leading-relaxed">

                Your seller account will enter admin review after submission.

              </p>

            </div>

          </div>

        </div>

        {/* TERMS */}

        <div className="border border-stone-300 rounded-3xl p-6 bg-stone-50 h-72 overflow-y-auto">

          <div className="flex items-center gap-3 mb-5">

            <ShieldCheck
              size={22}
              className="text-orange-500"
            />

            <h2 className="text-xl font-semibold text-stone-900">

              Seller Terms & Conditions

            </h2>

          </div>

          <div className="space-y-5 text-sm text-stone-600 leading-relaxed">

            <p>
              Sellers must provide authentic handcrafted products and maintain accurate inventory and pricing at all times.
            </p>

            <p>
              Orders should be fulfilled responsibly and within committed timelines to ensure customer satisfaction.
            </p>

            <p>
              The platform reserves the right to reject, suspend, or archive sellers violating marketplace standards or policies.
            </p>

            <p>
              Fraudulent information, misleading documentation, or counterfeit products may result in permanent account suspension.
            </p>

            <p>
              Seller payouts are processed only after successful order completion and approval cycles.
            </p>

            <p>
              Marketplace commissions, logistics rules, and seller policies may evolve over time and sellers agree to comply with updated guidelines.
            </p>

          </div>

        </div>

        {/* AGREEMENT */}

        <label className="flex items-start gap-4 bg-stone-50 border border-stone-200 rounded-2xl p-5 cursor-pointer hover:border-orange-300 transition">

          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) =>
              setAgreed(
                e.target.checked
              )
            }
            className="mt-1 w-4 h-4"
          />

          <div>

            <p className="font-medium text-stone-900">

              I agree to the marketplace terms

            </p>

            <p className="text-sm text-stone-600 mt-1 leading-relaxed">

              I confirm that all seller information and uploaded documents are authentic and valid.

            </p>

          </div>

        </label>

        {/* SIGNATURE */}

        <div>

          <div className="flex items-center gap-2 mb-3">

            <FileSignature
              size={18}
              className="text-orange-500"
            />

            <label className="text-sm font-medium text-stone-700">

              Signature Upload

            </label>

          </div>

          <input
            type="text"
            value={signatureUrl}
            onChange={(e) =>
              setSignatureUrl(
                e.target.value
              )
            }
            placeholder="Paste uploaded signature image URL"
            className="w-full border border-stone-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-sm text-stone-500 mt-2">

            Upload your signature image to Cloudinary or Drive and paste the shareable link here.

          </p>

        </div>

        {/* PREVIEW */}

        {signatureUrl && (

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

            <p className="text-xs uppercase tracking-wide text-stone-500 mb-3">

              Signature Preview

            </p>

            <img
              src={signatureUrl}
              alt="Signature"
              className="h-24 object-contain border border-stone-200 rounded-xl bg-white p-3"
            />

          </div>

        )}

        {/* ERROR */}

        {error && (

          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-xl">

            {error}

          </div>

        )}

        {/* ACTIONS */}

        <div className="flex gap-4">

          <button
            type="button"
            onClick={() =>
              goBack(5)
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
              ? "Submitting..."
              : "Complete Registration"}

          </button>

        </div>

      </form>

    </SellerOnboardingLayout>
  );

};

export default
  StepConsent;