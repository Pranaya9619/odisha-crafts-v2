import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProfileOverview = () => {
  const { user, setUser } = useAuth();
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

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Email */}
        <div className="border rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Email</h3>
          <p className="font-medium">{user.email}</p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            {user.isEmailVerified ? (
              <>
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-green-600">Verified</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-red-500">Not Verified</span>
              </>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="border rounded-xl p-4">
          <h3 className="text-sm text-gray-500">Phone</h3>
          <p className="font-medium">
            {user.phone || "No phone number added"}
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            {user.phone && user.isPhoneVerified ? (
              <>
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-green-600">Verified</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} className="text-red-500" />
                <span className="text-red-500">
                  {user.phone ? "Not Verified" : "Not Added"}
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileOverview;