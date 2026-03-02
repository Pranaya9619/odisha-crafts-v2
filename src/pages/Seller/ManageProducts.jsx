import React, { useEffect, useState } from "react";
import API from "../../services/api";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        district: "",
        image: "",
        artisan: "",
    });

    const token = localStorage.getItem("sellerToken");

    /* ================= FETCH DATA ================= */

    useEffect(() => {
        fetchProducts();
        fetchArtisans();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get("/products/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products");
        }
    };

    const fetchArtisans = async () => {
        try {
            const res = await API.get("/artisans/my", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setArtisans(res.data);
        } catch (err) {
            console.error("Failed to fetch artisans");
        }
    };

    /* ================= HANDLE CHANGE ================= */

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    /* ================= CREATE PRODUCT ================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.artisan) {
            alert("Please select an artisan.");
            return;
        }

        try {
            setLoading(true);

            const res = await API.post("/products", form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts((prev) => [res.data, ...prev]);

            setForm({
                name: "",
                price: "",
                description: "",
                category: "",
                district: "",
                image: "",
                artisan: "",
            });
        } catch (err) {
            alert("Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    /* ================= DELETE PRODUCT ================= */

    const deleteProduct = async (id) => {
        try {
            await API.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts((prev) =>
                prev.filter((p) => p._id !== id)
            );
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <div className="space-y-8">

            {/* ================= CREATE PRODUCT FORM ================= */}

            <div className="bg-white p-6 rounded-xl shadow space-y-5">
                <h2 className="text-xl font-bold">Add Product</h2>

                {artisans.length === 0 && (
                    <p className="text-red-500 text-sm">
                        You must create an artisan before adding products.
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="district"
                        placeholder="District"
                        value={form.district}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                    />

                    {/* Artisan Dropdown */}

                    <select
                        name="artisan"
                        value={form.artisan}
                        onChange={handleChange}
                        required
                        className="border p-2 w-full rounded"
                        disabled={artisans.length === 0}
                    >
                        <option value="">Select Artisan</option>
                        {artisans.map((a) => (
                            <option key={a._id} value={a._id}>
                                {a.name}
                            </option>
                        ))}
                    </select>

                    <button
                        disabled={loading || artisans.length === 0}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500 disabled:opacity-60"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>

            {/* ================= PRODUCT LIST ================= */}

            <div className="space-y-4">
                <h2 className="text-xl font-bold">Your Products</h2>

                {products.length === 0 && (
                    <p className="text-gray-500">
                        No products added yet.
                    </p>
                )}

                {products.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-bold">{p.name}</h3>
                            <p className="text-sm text-gray-600">
                                ₹{p.price}
                            </p>
                        </div>

                        <button
                            onClick={() => deleteProduct(p._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProducts;