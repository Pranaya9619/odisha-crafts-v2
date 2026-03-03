import React, { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProfileSecurity = () => {
  const { user, setUser } = useAuth();

  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");

  const [emailOTPSent, setEmailOTPSent] = useState(false);
  const [phoneOTPSent, setPhoneOTPSent] = useState(false);

  const [phoneInput, setPhoneInput] = useState(user.phone || "");
  const [emailInput, setEmailInput] = useState(user.email || "");

  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  /* ================= VALIDATION HELPERS ================= */

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidIndianPhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  /* ================= REFRESH USER ================= */

  const refreshUser = async () => {
    const res = await API.get("/users/profile");
    setUser(res.data);
  };

  /* ================= EMAIL ================= */

  const updateEmail = async () => {
    if (!isValidEmail(emailInput)) {
      return setMessage({
        type: "error",
        text: "Enter a valid email address.",
      });
    }

    try {
      setLoading(true);

      const res = await API.put("/users/profile", {
        email: emailInput.trim(),
      });

      await refreshUser();
      setEditingEmail(false);

      setMessage({
        type: "success",
        text: res.data.message,
      });

    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to update email.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeEmail = async () => {
    try {
      setLoading(true);

      await API.put("/users/profile", { removeEmail: true });

      setEmailOTPSent(false);
      setEmailOTP("");
      setEditingEmail(false);

      await refreshUser();

      setMessage({ type: "success", text: "Email removed." });

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendEmailOTP = async () => {
    // Show OTP field instantly
    setEmailOTPSent(true);

    try {
      setLoading(true);

      await API.post("/users/verify-email/send-otp");

      setMessage({
        type: "success",
        text: "OTP sent to your email.",
      });
    } catch (err) {
      // If request fails → hide OTP field again
      setEmailOTPSent(false);

      setMessage({
        type: "error",
        text: "Failed to send OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    try {
      setLoading(true);

      await API.post("/users/verify-email/confirm", {
        otp: emailOTP,
      });

      // 🔥 Show success instantly
      setMessage({
        type: "success",
        text: "Email verified successfully.",
      });

      setEmailOTP("");
      setEmailOTPSent(false);

      // Refresh silently
      refreshUser();

    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Invalid or expired OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= PHONE ================= */

  const updatePhone = async () => {
    if (!isValidIndianPhone(phoneInput)) {
      return setMessage({
        type: "error",
        text: "Enter a valid 10-digit Indian phone number.",
      });
    }

    try {
      setLoading(true);
      await API.put("/users/profile", { phone: phoneInput });
      await refreshUser();
      setEditingPhone(false);
      setMessage({
        type: "success",
        text: "Phone updated. Please verify your new number.",
      });
    } catch {
      setMessage({ type: "error", text: "Failed to update phone." });
    } finally {
      setLoading(false);
    }
  };

  const removePhone = async () => {
    try {
      setLoading(true);

      await API.put("/users/profile", { removePhone: true });

      // 🔥 Reset local states
      setPhoneOTPSent(false);
      setPhoneOTP("");
      setEditingPhone(false);

      await refreshUser();

      setMessage({ type: "success", text: "Phone removed." });

    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to remove phone.",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOTP = async () => {
    setPhoneOTPSent(true);

    try {
      setLoading(true);
      await API.post("/users/verify-phone/send-otp");

      setMessage({
        type: "success",
        text: "OTP sent to your phone.",
      });
    } catch {
      setPhoneOTPSent(false);

      setMessage({
        type: "error",
        text: "Failed to send OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async () => {
    try {
      setLoading(true);

      await API.post("/users/verify-phone/confirm", {
        otp: phoneOTP,
      });

      setMessage({
        type: "success",
        text: "Phone verified successfully.",
      });

      setPhoneOTP("");
      setPhoneOTPSent(false);

      refreshUser();

    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Invalid or expired OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= STYLES ================= */

  const btnPrimary =
    "px-3 py-1.5 text-sm rounded-md bg-orange-600 text-white hover:bg-orange-700 transition";

  const btnSecondary =
    "px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition";

  const btnDanger =
    "px-3 py-1.5 text-sm rounded-md border border-red-400 text-red-500 hover:bg-red-50 transition";

  const inputStyle =
    "px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="space-y-10">

      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* ================= EMAIL ================= */}

      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Email</h2>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            {user.email || "No email added"}
          </p>

          {user.email && user.isEmailVerified ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-red-500" />
          )}
        </div>

        {!editingEmail && (
          <div className="flex gap-3 flex-wrap">
            {user.email && !user.isEmailVerified && (
              <button
                onClick={sendEmailOTP}
                className={btnPrimary}
              >
                {emailOTPSent ? "Resend OTP" : "Verify"}
              </button>
            )}

            <button
              onClick={() => setEditingEmail(true)}
              className={btnSecondary}
            >
              {user.email ? "Change" : "Add"}
            </button>

            {user.email && (
              <button onClick={removeEmail} className={btnDanger}>
                Remove
              </button>
            )}
          </div>
        )}

        {editingEmail && (
          <>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className={`${inputStyle} w-full md:w-80`}
            />
            <div className="flex gap-3">
              <button onClick={updateEmail} className={btnPrimary}>
                Save
              </button>
              <button
                onClick={() => setEditingEmail(false)}
                className={btnSecondary}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {emailOTPSent && (
          <div className="flex items-center gap-3 mt-2">
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter OTP"
              value={emailOTP}
              onChange={(e) =>
                setEmailOTP(e.target.value.replace(/\D/g, ""))
              }
              className={`${inputStyle} w-32`}
            />
            <button onClick={verifyEmail} className={btnPrimary}>
              Confirm
            </button>
          </div>
        )}
      </div>

      {/* ================= PHONE ================= */}

      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Phone</h2>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            {user.phone || "No phone added"}
          </p>

          {user.phone && user.isPhoneVerified ? (
            <CheckCircle size={18} className="text-green-600" />
          ) : (
            <AlertCircle size={18} className="text-red-500" />
          )}
        </div>

        {!editingPhone && (
          <div className="flex gap-3 flex-wrap">
            {user.phone && !user.isPhoneVerified && (
              <button
                onClick={sendPhoneOTP}
                className={btnPrimary}
              >
                {phoneOTPSent ? "Resend OTP" : "Verify"}
              </button>
            )}

            <button
              onClick={() => setEditingPhone(true)}
              className={btnSecondary}
            >
              {user.phone ? "Change" : "Add"}
            </button>

            {user.phone && (
              <button onClick={removePhone} className={btnDanger}>
                Remove
              </button>
            )}
          </div>
        )}

        {editingPhone && (
          <>
            <input
              type="text"
              value={phoneInput}
              onChange={(e) =>
                setPhoneInput(e.target.value.replace(/\D/g, ""))
              }
              className={`${inputStyle} w-full md:w-80`}
            />
            <div className="flex gap-3">
              <button onClick={updatePhone} className={btnPrimary}>
                Save
              </button>
              <button
                onClick={() => setEditingPhone(false)}
                className={btnSecondary}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {phoneOTPSent && (
          <div className="flex items-center gap-3 mt-2">
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              pattern="\d*"
              placeholder="Enter OTP"
              value={phoneOTP}
              onChange={(e) =>
                setPhoneOTP(e.target.value.replace(/\D/g, ""))
              }
              className={`${inputStyle} w-32`}
            />
            <button onClick={verifyPhone} className={btnPrimary}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSecurity;