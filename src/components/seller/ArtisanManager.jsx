import React, { useState, useEffect } from "react";
import API from "../../services/sellerApi";

const ArtisanManager = () => {

  const [artisans, setArtisans] = useState([]);

  const [form, setForm] = useState({
    name: "",
    district: "",
    craft: "",
    bio: "",
    image: "",
    experience: "",
  });



  /* ================= FETCH ARTISANS ================= */

  useEffect(() => {
    fetchArtisans();
  }, []);


  const fetchArtisans = async () => {
    const res = await API.get("/artisans/my");
    setArtisans(res.data);
  };



  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };



  /* ================= CREATE ARTISAN ================= */

  const submit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/artisans", form);

      fetchArtisans();

      setForm({
        name: "",
        district: "",
        craft: "",
        bio: "",
        image: "",
        experience: "",
      });

    } catch (err) {
      console.error("Create artisan error:", err.response?.data || err);
    }

  };



  /* ================= DELETE ARTISAN ================= */

  const deleteArtisan = async (id) => {

    if (!window.confirm("Delete this artisan?")) return;

    try {

      await API.delete(`/artisans/${id}`);

      setArtisans(artisans.filter((a) => a._id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }

  };



  return (

    <div className="space-y-8">

      {/* ================= ADD ARTISAN ================= */}

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >

        <h2 className="text-lg font-semibold">
          Add Artisan
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="name"
            value={form.name}
            placeholder="Name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="district"
            value={form.district}
            placeholder="District"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="craft"
            value={form.craft}
            placeholder="Craft"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            name="experience"
            value={form.experience}
            placeholder="Experience (years)"
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <textarea
          name="bio"
          value={form.bio}
          placeholder="Bio"
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows="3"
          required
        />

        <input
          name="image"
          value={form.image}
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />

        <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded">
          Add Artisan
        </button>

      </form>



      {/* ================= ARTISAN LIST ================= */}

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">

            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Craft</th>
              <th className="p-3">District</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>

          <tbody>

            {artisans.map((a) => (

              <tr key={a._id} className="border-t">

                <td className="p-3 font-medium">
                  {a.name}
                </td>

                <td className="p-3">
                  {a.craft}
                </td>

                <td className="p-3">
                  {a.district}
                </td>

                <td className="p-3">
                  {a.experience || "-"}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => deleteArtisan(a._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ArtisanManager;