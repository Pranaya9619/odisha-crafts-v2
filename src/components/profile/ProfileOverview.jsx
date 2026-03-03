import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useStore } from "../../context/StoreContext";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProfileOverview = ({ setActiveTab }) => {
  const { user, setUser } = useAuth();
  const { cart = [], wishlist = [] } = useStore();

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error("Profile fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleSave = async () => {
    try {
      const res = await API.put("/users/profile", { name });
      setUser(res.data.user);
      setEditing(false);
    } catch (err) {
      console.error("Update failed");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  const profileCompletion = [
    user.name,
    user.email,
    user.phone,
    user.isEmailVerified,
  ].filter(Boolean).length * 25;

  let completionMessage = "";

  if (profileCompletion === 100) {
    completionMessage = "Your profile is fully complete. You're all set ✨";
  } else if (profileCompletion >= 75) {
    completionMessage = "Almost there! Just a few steps left.";
  } else if (profileCompletion >= 50) {
    completionMessage = "You're halfway done. Keep going!";
  } else if (profileCompletion > 0) {
    completionMessage = "Let’s build your profile to unlock full features.";
  } else {
    completionMessage = "Start completing your profile to get the best experience.";
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-serif font-bold">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border px-3 py-1 rounded-lg"
              />
            ) : (
              user.name
            )}
          </h2>
          <p className="text-gray-500 text-sm">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {editing ? (
          <button
            onClick={handleSave}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Edit
          </button>
        )}
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Cart Items</p>
          <p className="text-2xl font-bold mt-2">{cart.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Wishlist</p>
          <p className="text-2xl font-bold mt-2">{wishlist.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">Orders</p>
          <p className="text-2xl font-bold mt-2">
            {/* Replace with real order length later */}
            0
          </p>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <p className="text-sm font-medium mb-2">Profile Completion</p>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              profileCompletion === 100
                ? "bg-green-500"
                : profileCompletion >= 50
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {completionMessage}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Email */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h3 className="text-sm text-gray-500">Email</h3>
          <p className="font-medium">{user.email || "No email added"}</p>

          <div className="mt-3 flex items-center justify-between text-sm">
            {user.email && user.isEmailVerified && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                Verified
              </div>
            )}

            {user.email && !user.isEmailVerified && (
              <>
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={16} />
                  Not Verified
                </div>

                <button
                  onClick={() => setActiveTab("security")}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Verify Now
                </button>
              </>
            )}

            {!user.email && (
              <button
                onClick={() => setActiveTab("security")}
                className="text-sm px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Add Now
              </button>
            )}
          </div>
        </div>


        {/* Phone */}
        <div className="border rounded-xl p-5 bg-white shadow-sm">
          <h3 className="text-sm text-gray-500">Phone</h3>
          <p className="font-medium">
            {user.phone || "No phone number added"}
          </p>

          <div className="mt-3 flex items-center justify-between text-sm">

            {user.phone && user.isPhoneVerified && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                Verified
              </div>
            )}

            {user.phone && !user.isPhoneVerified && (
              <>
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle size={16} />
                  Not Verified
                </div>

                <button
                  onClick={() => setActiveTab("security")}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Verify Now
                </button>
              </>
            )}

            {!user.phone && (
              <button
                onClick={() => setActiveTab("security")}
                className="text-sm px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Add Now
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileOverview;