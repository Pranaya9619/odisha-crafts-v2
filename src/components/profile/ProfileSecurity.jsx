import React, { useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProfileSecurity = () => {
  const { user, setUser } = useAuth();

  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [phoneInput, setPhoneInput] = useState(user.phone || "");
  const [loading, setLoading] = useState(false);

  /* ================= EMAIL ================= */

  const sendEmailOTP = async () => {
    try {
      setLoading(true);
      await API.post("/users/verify-email/send-otp");
      alert("OTP sent to your email (check server console in dev)");
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await API.post("/users/verify-email/confirm", { otp: emailOTP });
      const res = await API.get("/users/profile");
      setUser(res.data);
      alert("Email verified successfully");
      setEmailOTP("");
    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PHONE ================= */

  const updatePhone = async () => {
    try {
      setLoading(true);
      await API.put("/users/profile", { phone: phoneInput });
      const res = await API.get("/users/profile");
      setUser(res.data);
      alert("Phone updated");
    } catch {
      alert("Failed to update phone");
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOTP = async () => {
    try {
      setLoading(true);
      await API.post("/users/verify-phone/send-otp");
      alert("Phone OTP sent (check server console in dev)");
    } catch {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhone = async () => {
    try {
      setLoading(true);
      await API.post("/users/verify-phone/confirm", { otp: phoneOTP });
      const res = await API.get("/users/profile");
      setUser(res.data);
      alert("Phone verified successfully");
      setPhoneOTP("");
    } catch {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">

      {/* Email Section */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Email Verification</h2>

        <div className="flex items-center gap-2 text-sm">
          {user.isEmailVerified ? (
            <>
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-green-600">Email Verified</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-red-500">Email Not Verified</span>
            </>
          )}
        </div>

        {!user.isEmailVerified && (
          <>
            <button
              onClick={sendEmailOTP}
              disabled={loading}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Send OTP
            </button>

            <div className="flex gap-3 mt-3">
              <input
                type="text"
                placeholder="Enter OTP"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value)}
                className="border px-3 py-2 rounded-lg w-40"
              />
              <button
                onClick={verifyEmail}
                disabled={loading}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Verify
              </button>
            </div>
          </>
        )}
      </div>

      {/* Phone Section */}
      <div className="border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">Phone Verification</h2>

        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneInput}
          onChange={(e) => setPhoneInput(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full md:w-64"
        />

        <button
          onClick={updatePhone}
          disabled={loading}
          className="border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Save Phone
        </button>

        <div className="flex items-center gap-2 text-sm mt-3">
          {user.phone && user.isPhoneVerified ? (
            <>
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-green-600">Phone Verified</span>
            </>
          ) : (
            <>
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-red-500">
                {user.phone ? "Not Verified" : "No Phone Added"}
              </span>
            </>
          )}
        </div>

        {user.phone && !user.isPhoneVerified && (
          <>
            <button
              onClick={sendPhoneOTP}
              disabled={loading}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Send OTP
            </button>

            <div className="flex gap-3 mt-3">
              <input
                type="text"
                placeholder="Enter OTP"
                value={phoneOTP}
                onChange={(e) => setPhoneOTP(e.target.value)}
                className="border px-3 py-2 rounded-lg w-40"
              />
              <button
                onClick={verifyPhone}
                disabled={loading}
                className="border px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Verify
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default ProfileSecurity;