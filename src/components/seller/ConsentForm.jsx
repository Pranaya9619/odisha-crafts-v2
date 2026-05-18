import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../../services/sellerApi";


const ConsentForm = () => {

  const navigate =
    useNavigate();

  const [
    agreed,
    setAgreed,
  ] = useState(false);

  const [
    signature,
    setSignature,
  ] = useState(null);

  const [
    preview,
    setPreview,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleFileChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      setSignature(file);

      setPreview(
        URL.createObjectURL(file)
      );

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!agreed) {
        return alert(
          "You must agree to continue."
        );
      }

      if (!signature) {
        return alert(
          "Please upload your signature."
        );
      }

      try {

        setLoading(true);

        // TEMP PLACEHOLDER
        // Replace with Cloudinary later
        const signatureUrl =
          "temp-signature";

        // ✅ NEW ONBOARDING FLOW
        await API.post(
          "/seller/onboarding",
          {
            step: 6,

            data: {
              agreed: true,

              signatureUrl,
            },
          }
        );

        alert(
          "Consent submitted! Await admin approval."
        );

        // ✅ SEND TO DASHBOARD FLOW
        navigate(
          "/seller/dashboard"
        );

      } catch (err) {

        alert(
          err.response?.data
            ?.message ||
            "Submission failed"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-6">

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">

        <h1 className="text-2xl font-bold text-gray-800 text-center">

          Seller Consent Form

        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">

          By signing this form, you agree to provide authentic products,
          maintain quality standards, and comply with platform guidelines.

        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          {/* Agreement */}

          <label className="flex items-center gap-3 text-sm text-gray-700">

            <input
              type="checkbox"
              checked={agreed}
              onChange={() =>
                setAgreed(
                  !agreed
                )
              }
            />

            I agree to the terms and conditions

          </label>

          {/* Signature Upload */}

          <div>

            <label className="text-sm text-gray-700 block mb-2">

              Upload Signature

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleFileChange
              }
              className="block w-full text-sm"
            />

            {preview && (

              <img
                src={preview}
                alt="Signature Preview"
                className="mt-3 h-20 object-contain border rounded"
              />

            )}

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg transition-all duration-200"
          >

            {loading
              ? "Submitting..."
              : "Submit Consent"}

          </button>

        </form>

      </div>

    </div>
  );

};

export default ConsentForm;