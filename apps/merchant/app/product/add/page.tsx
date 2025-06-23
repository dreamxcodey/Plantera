"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

export default function AddPlant() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      } catch (err) {
        console.error("Failed to fetch categories:", err);
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
    setError("");

    // Basic validation
    if (selectedCategoryIds.length === 0) {
      setError("Please select at least one category");
      setLoading(false);
      return;
    }

    try {
      const productData = {
        ...form,
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
        setError(errorData.message || "Failed to create product");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Group categories by type
  const categoryGroups: { [key: string]: Category[] } = {};
  categories.forEach(category => {
    const group = category.name.split(":")[0] || "Other";
    if (!categoryGroups[group]) {
      categoryGroups[group] = [];
    }
    categoryGroups[group].push(category);
  });

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Add New Plant</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Plant Name*
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Snake Plant, Money Tree"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Price (₹)*
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              placeholder="0"
              min="0"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/plant-image.jpg"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe the plant, its care instructions, benefits..."
            rows={4}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Categories*
          </label>
          <select
            multiple
            size={8}
            value={selectedCategoryIds.map(String)}
            onChange={handleCategoryChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
            {Object.entries(categoryGroups).map(([group, groupCategories]) => (
              <optgroup key={group} label={group}>
                {groupCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Hold Ctrl/Cmd to select multiple categories
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-3 px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {loading ? "Creating..." : "Add Plant"}
          </button>
        </div>
      </form>
    </div>
  );
}
