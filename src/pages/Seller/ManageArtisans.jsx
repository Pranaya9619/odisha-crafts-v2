import React, { useState, useEffect } from "react";
import API from "../../services/api";

const ManageArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [form, setForm] = useState({
    name: "",
    district: "",
    craft: "",
    bio: "",
    image: "",
    experience: "",
    quote: "",
  });

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    const token = localStorage.getItem("sellerToken");

    const res = await API.get("/artisans/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setArtisans(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("sellerToken");

    const res = await API.post("/artisans", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setArtisans((prev) => [res.data, ...prev]);
    setForm({
      name: "",
      district: "",
      craft: "",
      bio: "",
      image: "",
      experience: "",
      quote: "",
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow">
        <input name="name" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="border p-2 w-full rounded" />
        <input name="district" placeholder="District" value={form.district} onChange={(e) => setForm({...form, district: e.target.value})} required className="border p-2 w-full rounded" />
        <input name="craft" placeholder="Craft" value={form.craft} onChange={(e) => setForm({...form, craft: e.target.value})} required className="border p-2 w-full rounded" />
        <textarea name="bio" placeholder="Bio" value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} required className="border p-2 w-full rounded" />
        <input name="image" placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} className="border p-2 w-full rounded" />
        <input name="experience" placeholder="Experience" value={form.experience} onChange={(e) => setForm({...form, experience: e.target.value})} className="border p-2 w-full rounded" />
        <input name="quote" placeholder="Quote" value={form.quote} onChange={(e) => setForm({...form, quote: e.target.value})} className="border p-2 w-full rounded" />

        <button className="bg-orange-600 text-white px-4 py-2 rounded">
          Add Artisan
        </button>
      </form>

      <div className="space-y-3">
        {artisans.map((a) => (
          <div key={a._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{a.name}</h3>
            <p>{a.craft} • {a.district}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArtisans;