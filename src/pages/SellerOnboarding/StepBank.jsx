import {
  useEffect,
  useState,
} from "react";

import {
  Landmark,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";

// import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();

// const handleLogout = () => {

//   localStorage.removeItem(
//     "sellerToken"
//   );

//   navigate("/seller/login");

// };

const StepBank = () => {

  const [accountName, setAccountName] =
    useState("");

  const [accountNumber, setAccountNumber] =
    useState("");

  const [ifscCode, setIfscCode] =
    useState("");

  const {
    seller,
    loading,
    error,
    setError,
    saveStep,
    goBack,
  } = useSellerOnboarding(5);

  /* =====================================================
     PREFILL
  ===================================================== */

  useEffect(() => {

    if (
      seller?.bankDetails
        ?.accountName &&
      !accountName
    ) {
      setAccountName(
        seller.bankDetails
          .accountName
      );
    }

    if (
      seller?.bankDetails
        ?.accountNumber &&
      !accountNumber
    ) {
      setAccountNumber(
        seller.bankDetails
          .accountNumber
      );
    }

    if (
      seller?.bankDetails
        ?.ifscCode &&
      !ifscCode
    ) {
      setIfscCode(
        seller.bankDetails
          .ifscCode
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

      const ifscRegex =
        /^[A-Z]{4}0[A-Z0-9]{6}$/;

      if (
        !accountName.trim()
      ) {
        return setError(
          "Account holder name is required"
        );
      }

      if (
        !accountNumber.trim() ||
        accountNumber.length < 8
      ) {
        return setError(
          "Invalid account number"
        );
      }

      if (
        !ifscRegex.test(
          ifscCode
        )
      ) {
        return setError(
          "Invalid IFSC format"
        );
      }

      await saveStep(
        {
          accountName,
          accountNumber,
          ifscCode,
        },
        6
      );
    };

  return (
    <SellerOnboardingLayout
      title="Bank Details"
      subtitle="Add payout details where your earnings will be transferred securely."
      step={5}
    >

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* =================================================
           SECURITY CARD
        ================================================= */}

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">

              <ShieldCheck
                size={24}
                className="text-orange-600"
              />

            </div>

            <div>

              <h3 className="font-semibold text-stone-900">
                Secure Payout Verification
              </h3>

              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Your payout details are securely stored and used only for transferring seller earnings.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
           ACCOUNT HOLDER
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            Account Holder Name
          </label>

          <input
            type="text"
            value={accountName}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s+/g, " ")
                  .slice(0, 60);

              setAccountName(value);
            }}
            placeholder="Enter account holder name"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

        {/* =================================================
           ACCOUNT NUMBER
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            Account Number
          </label>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 18);

              setAccountNumber(value);
            }}
            placeholder="Enter bank account number"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-xs text-stone-500 mt-2">
            Only numeric characters are allowed.
          </p>

        </div>

        {/* =================================================
           IFSC
        ================================================= */}

        <div>

          <label className="block text-sm font-medium text-stone-700 mb-2">
            IFSC Code
          </label>

          <input
            type="text"
            value={ifscCode}
            onChange={(e) => {

              const value =
                e.target.value
                  .replace(/\s/g, "")
                  .toUpperCase()
                  .slice(0, 11);

              setIfscCode(value);
            }}
            placeholder="HDFC0001234"
            className="w-full border border-stone-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <p className="text-xs text-stone-500 mt-2">
            IFSC codes are 11 characters long.
          </p>

        </div>

        {/* =================================================
           BANK PREVIEW
        ================================================= */}

        {(accountName ||
          accountNumber ||
          ifscCode) && (

            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <Landmark
                  size={18}
                  className="text-orange-500"
                />

                <p className="font-medium text-stone-900">
                  Payout Preview
                </p>

              </div>

              <div className="space-y-2 text-sm text-stone-600">

                <p>
                  <span className="font-medium text-stone-900">
                    Account Holder:
                  </span>{" "}
                  {accountName || "-"}
                </p>

                <p>
                  <span className="font-medium text-stone-900">
                    Account Number:
                  </span>{" "}
                  {accountNumber
                    ? `••••${accountNumber.slice(-4)}`
                    : "-"}
                </p>

                <p>
                  <span className="font-medium text-stone-900">
                    IFSC:
                  </span>{" "}
                  {ifscCode || "-"}
                </p>

              </div>

            </div>

          )}

        {/* =================================================
           VERIFIED INFO
        ================================================= */}

        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">

          <BadgeCheck
            size={20}
            className="text-green-600 mt-0.5"
          />

          <p className="text-sm text-green-800 leading-relaxed">
            Payout verification is reviewed manually during seller approval.
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
           ACTIONS
        ================================================= */}

        <div className="flex gap-4">

          <button
            type="button"
            onClick={() =>
              goBack(4)
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

      {/* <div className="flex justify-end mb-6">

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 px-5 py-2.5 rounded-xl shadow-sm transition font-medium"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div> */}

    </SellerOnboardingLayout>
  );
};

export default StepBank;