"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

export default function AddPlant() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    const selectedIds = options.map(option => parseInt(option.value));
    setSelectedCategoryIds(selectedIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        categories: selectedCategoryIds
      };

      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        router.push("/products");
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Failed to create product"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl font-bold mb-4">Add a New Plant</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Plant name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            placeholder="0"
            min="0"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Product details..."
            rows={3}
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Categories</label>
          <select
            multiple
            size={4}
            value={selectedCategoryIds.map(String)}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple categories
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
