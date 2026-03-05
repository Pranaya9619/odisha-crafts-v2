import React, { useEffect, useState } from "react";
import API from "../../services/sellerApi";

const SellerProfile = () => {

  const [seller, setSeller] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
  });

  const [originalSeller, setOriginalSeller] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");



  /* ================= LOAD PROFILE ================= */

  const fetchProfile = async () => {
    try {

      const res = await API.get("/seller/profile");

      setSeller(res.data);
      setOriginalSeller(res.data);
      setLoading(false);

    } catch (err) {

      console.error("Profile load error:", err);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);



  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setSeller((prev) => ({
      ...prev,
      [name]: value,
    }));

  };



  /* ================= SAVE PROFILE ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);
      setMessage("");

      const res = await API.put("/seller/profile", seller);

      setSeller(res.data.seller);
      setOriginalSeller(res.data.seller);

      setEditing(false);
      setMessage("Profile updated successfully ✨");

    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {

      setSaving(false);

    }

  };

  /* ================= CANCEL EDIT ================= */

  const cancelEdit = () => {

    setSeller(originalSeller);
    setEditing(false);

  };

  if (loading) {
    return <div className="p-8 text-gray-600">Loading profile...</div>;
  }

  return (

    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Seller Profile
      </h1>

      <div className="bg-white shadow rounded-lg p-8">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={seller.name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              required
            />
          </div>



          {/* EMAIL */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              value={seller.email}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />
          </div>



          {/* PHONE */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={seller.phone}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              required
            />
          </div>



          {/* DISTRICT */}

          <div>
            <label className="block text-sm font-medium mb-1">
              District
            </label>

            <input
              type="text"
              name="district"
              value={seller.district}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
              required
            />
          </div>



          {/* BUTTONS */}

          {!editing ? (

            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
            >
              Edit Profile
            </button>

          ) : (

            <div className="flex gap-3">

              <button
                type="submit"
                disabled={saving}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                {saving ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="border px-6 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          )}



          {message && (
            <p className="text-green-600 text-sm mt-2">
              {message}
            </p>
          )}

        </form>

      </div>

    </div>

  );
};

export default SellerProfile;