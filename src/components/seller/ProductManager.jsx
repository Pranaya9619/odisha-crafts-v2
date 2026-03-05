import React, { useState, useEffect } from "react";
import API from "../../services/sellerApi";

const ProductManager = () => {

  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    district: "",
    image: "",
    artisan: "",
  });



  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchProducts();
    fetchArtisans();
  }, []);


  const fetchProducts = async () => {
    const res = await API.get("/products/my");
    setProducts(res.data);
  };


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



  /* ================= CREATE PRODUCT ================= */

  const submit = async (e) => {

    e.preventDefault();
    console.log("Submit clicked");

    try {

      console.log("Submitting product:", form);

      const res = await API.post("/products", form);

      setProducts([res.data, ...products]);

      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        district: "",
        image: "",
        artisan: "",
      });

      setMessage("Product added successfully");
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {

      console.error("Create product error:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add product";

      setMessage(message);
      setTimeout(() => setMessage(""), 3000);
    }

  };



  /* ================= DELETE PRODUCT ================= */

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await API.delete(`/products/${id}`);

      setProducts(products.filter((p) => p._id !== id));

    } catch (err) {
      console.error("Delete error:", err);
    }

  };



  return (

    <div className="space-y-8">

      {/* ================= ADD PRODUCT ================= */}

      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >

        <h2 className="text-lg font-semibold">
          Add Product
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="name"
            value={form.name}
            placeholder="Product name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            placeholder="Price"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            placeholder="Stock"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="category"
            value={form.category}
            placeholder="Category"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="district"
            value={form.district}
            placeholder="District"
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="image"
            value={form.image}
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-2 rounded"
          />

        </div>

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 rounded w-full"
          rows="3"
        />

        {/* Artisan Select */}

        <select
          name="artisan"
          value={form.artisan}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >

          <option value="">Select Artisan</option>

          {artisans.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}

        </select>


        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded">
          Add Product
        </button>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded border border-green-300">
            {message}
          </div>
        )}

      </form>



      {/* ================= PRODUCT LIST ================= */}

      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">

            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Category</th>
              <th className="p-3">Artisan</th>
              <th className="p-3">Action</th>
            </tr>

          </thead>


          <tbody>

            {products.map((p) => (

              <tr key={p._id} className="border-t">

                <td className="p-3 font-medium">
                  {p.name}
                </td>

                <td className="p-3">
                  ₹{p.price}
                </td>

                <td className="p-3">
                  {p.stock}
                </td>

                <td className="p-3">
                  {p.category}
                </td>

                <td className="p-3">
                  {p.artisan?.name}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => deleteProduct(p._id)}
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

export default ProductManager;