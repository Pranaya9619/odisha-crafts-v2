import {
  useEffect,
  useState,
} from "react";

import {
  Truck,
  PackageCheck,
  MapPin,
} from "lucide-react";

import SellerOnboardingLayout from "./SellerOnboardingLayout";

import useSellerOnboarding from "../../hooks/useSellerOnboarding";


const StepShipping =
  () => {

    const [
      shippingType,
      setShippingType,
    ] = useState(
      "easy_ship"
    );

    const [
      deliveryChargeMode,
      setDeliveryChargeMode,
    ] = useState(
      "customer_pays"
    );

    const [
      businessAddress,
      setBusinessAddress,
    ] = useState("");

    const {
      seller,
      loading,
      error,
      setError,
      saveStep,
      goBack,
    } =
      useSellerOnboarding(4);

    /* =====================================================
       PREFILL
    ===================================================== */

    useEffect(() => {

      if (
        seller
          ?.shippingPreferences
          ?.shippingType
      ) {

        setShippingType(
          seller
            .shippingPreferences
            .shippingType
        );

      }

      if (
        seller
          ?.shippingPreferences
          ?.deliveryChargeMode
      ) {

        setDeliveryChargeMode(
          seller
            .shippingPreferences
            .deliveryChargeMode
        );

      }

      // ✅ FIXED
      if (
        seller?.businessAddress &&
        !businessAddress
      ) {

        setBusinessAddress(
          seller.businessAddress
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
          !businessAddress.trim()
        ) {

          return setError(
            "Business address is required"
          );

        }

        if (
          businessAddress
            .trim().length <
          10
        ) {

          return setError(
            "Please enter a complete business address"
          );

        }

        await saveStep(
          {
            shippingType,

            deliveryChargeMode,

            businessAddress,
          },
          5
        );

      };

    return (
      <SellerOnboardingLayout
        title="Shipping Setup"
        subtitle="Configure how orders will be fulfilled and where pickups or operations will be managed."
        step={4}
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* SHIPPING TYPE */}

          <div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">

              Shipping Method

            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setShippingType(
                    "easy_ship"
                  )
                }
                className={`border rounded-2xl p-5 text-left transition ${shippingType ===
                    "easy_ship"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                  }`}
              >

                <Truck
                  className="mb-3 text-orange-500"
                />

                <h4 className="font-semibold">

                  Easy Ship

                </h4>

                <p className="text-sm text-gray-500 mt-1">

                  Platform handles logistics
                  and shipping support.

                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  setShippingType(
                    "self_ship"
                  )
                }
                className={`border rounded-2xl p-5 text-left transition ${shippingType ===
                    "self_ship"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                  }`}
              >

                <PackageCheck
                  className="mb-3 text-orange-500"
                />

                <h4 className="font-semibold">

                  Self Ship

                </h4>

                <p className="text-sm text-gray-500 mt-1">

                  You manage delivery
                  operations independently.

                </p>

              </button>

            </div>

          </div>

          {/* DELIVERY CHARGES */}

          <div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">

              Delivery Charges

            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setDeliveryChargeMode(
                    "customer_pays"
                  )
                }
                className={`border rounded-2xl p-5 text-left transition ${deliveryChargeMode ===
                    "customer_pays"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                  }`}
              >

                <h4 className="font-semibold">

                  Customer Pays

                </h4>

                <p className="text-sm text-gray-500 mt-1">

                  Delivery fees shown at
                  checkout.

                </p>

              </button>

              <button
                type="button"
                onClick={() =>
                  setDeliveryChargeMode(
                    "seller_pays"
                  )
                }
                className={`border rounded-2xl p-5 text-left transition ${deliveryChargeMode ===
                    "seller_pays"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                  }`}
              >

                <h4 className="font-semibold">

                  Seller Pays

                </h4>

                <p className="text-sm text-gray-500 mt-1">

                  You absorb delivery
                  costs for customers.

                </p>

              </button>

            </div>

          </div>

          {/* ADDRESS */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-3">

              Business Address

            </label>

            <div className="relative">

              <MapPin
                size={18}
                className="absolute left-4 top-5 text-gray-400"
              />

              <textarea
                rows={5}
                value={businessAddress}
                onChange={(e) =>
                  setBusinessAddress(
                    e.target.value
                  )
                }
                placeholder="Enter your complete pickup or business address..."
                className="w-full border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-500 resize-none"
              />

            </div>

          </div>

          {/* ERROR */}

          {error && (

            <div className="bg-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">

              {error}

            </div>

          )}

          {/* ACTIONS */}

          <div className="flex items-center justify-between pt-4">

            <button
              type="button"
              onClick={goBack}
              className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >

              Back

            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition"
            >

              {
                loading
                  ? "Saving..."
                  : "Continue"
              }

            </button>

          </div>

        </form>

      </SellerOnboardingLayout>
    );

  };

export default
  StepShipping;