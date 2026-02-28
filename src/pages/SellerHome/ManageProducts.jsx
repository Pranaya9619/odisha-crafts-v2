import React, { useState, useEffect, useRef } from "react";

const MAX_IMAGES = 5;
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const ManageProducts = ({ products, setProducts }) => {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    district: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");

  // Clean object URLs
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = files => {
    const fileArray = Array.from(files);

    if (fileArray.length + previews.length > MAX_IMAGES) {
      setError(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = fileArray.filter(file => {
      if (file.size > MAX_SIZE) {
        setError("Each image must be under 2MB");
        return false;
      }
      return true;
    });

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));

    setImages(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    setError("");
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    handleImageChange(e.dataTransfer.files);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = index => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", category: "", district: "", stock: "" });
    setImages([]);
    setPreviews([]);
    setEditId(null);
    setShowForm(false);
    setError("");
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!previews.length) {
      setError("Please upload at least one image");
      return;
    }

    if (editId) {
      const updatedProducts = products.map(p =>
        p.id === editId ? { ...p, ...form, images: previews } : p
      );
      setProducts(updatedProducts);
      alert("Product Updated Successfully!");
    } else {
      const newProduct = { id: crypto.randomUUID(), ...form, images: previews, status: "Pending" };
      setProducts([...products, newProduct]);
      alert("Product Added Successfully!");
    }

    resetForm();
  };

  const handleEdit = product => {
    setForm({ ...product });
    setPreviews(product.images);
    setEditId(product.id);
    setShowForm(true);
  };

  const deleteProduct = id => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition"
        >
          {showForm ? "Close Form" : "+ Add Product"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              >
                <option value="">Select Category</option>
                <option>Ikat</option>
                <option>Pattachitra</option>
                <option>Silver Filigree</option>
                <option>Terracotta</option>
              </select>

              <input
                name="district"
                placeholder="District"
                value={form.district}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
            </div>

            {/* Upload Box */}
            <div
              onClick={() => fileInputRef.current.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
            >
              <p className="text-gray-500">Drag & Drop images or Click to Upload</p>
              <p className="text-xs text-gray-400 mt-1">Max {MAX_IMAGES} images (2MB each)</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={e => handleImageChange(e.target.files)}
                className="hidden"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt="" className="w-full h-28 object-cover rounded-lg shadow" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-500 transition">
              {editId ? "Update Product" : "Submit Product"}
            </button>
          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th>Price</th>
              <th>Status</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map(p => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td>₹{p.price}</td>
                  <td>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      {p.status}
                    </span>
                  </td>
                  <td>{p.stock}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No Products Added Yet 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;