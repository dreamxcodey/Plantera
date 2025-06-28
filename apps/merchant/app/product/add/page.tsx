'use client';

import { useEffect, useState } from 'react';

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/categories/${selectedCategory}/subcategories`)
        .then((res) => res.json())
        .then((data) => setSubcategories(data));
    }
  }, [selectedCategory]);

  const createCategory = async () => {
    const name = prompt('Enter new category name');
    if (!name) return;
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newCat = await res.json();
    setCategories([...categories, newCat]);
    setSelectedCategory(newCat.id);
  };

  const createSubcategory = async () => {
    const name = prompt('Enter new subcategory name');
    if (!name || !selectedCategory) return;
    const res = await fetch('/api/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, categoryId: selectedCategory }),
    });
    const newSub = await res.json();
    setSubcategories([...subcategories, newSub]);
  };

  const createProduct = async () => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        description,
        image,
        tags: tags.split(',').map((t) => t.trim()),
        categoryId: parseInt(selectedCategory),
        subcategoryId: parseInt(selectedSubcategory),
        userId: 1,
      }),
    });
    const result = await res.json();
    console.log('Product created:', result);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <label className="block mb-1">Category</label>
      <div className="flex gap-2 mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={createCategory}
          className="bg-green-600 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>

      <label className="block mb-1">Subcategory</label>
      <div className="flex gap-2 mb-4">
        <select
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Subcategory</option>
          {subcategories.map((sub: any) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
        <button
          onClick={createSubcategory}
          className="bg-green-600 text-white px-2 py-1 rounded"
        >
          +
        </button>
      </div>

      <label className="block mb-1">Product Name</label>
      <input type="text" className="border px-3 py-2 rounded w-full mb-4" value={name} onChange={(e) => setName(e.target.value)} />

      <label className="block mb-1">Price (₹)</label>
      <input type="number" className="border px-3 py-2 rounded w-full mb-4" value={price} onChange={(e) => setPrice(e.target.value)} />

      <label className="block mb-1">Stock</label>
      <input type="number" className="border px-3 py-2 rounded w-full mb-4" value={stock} onChange={(e) => setStock(e.target.value)} />

      <label className="block mb-1">Description</label>
      <textarea className="border px-3 py-2 rounded w-full mb-4" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label className="block mb-1">Image URL</label>
      <input type="text" className="border px-3 py-2 rounded w-full mb-4" value={image} onChange={(e) => setImage(e.target.value)} />

      <label className="block mb-1">Tags (comma-separated)</label>
      <input type="text" className="border px-3 py-2 rounded w-full mb-6" value={tags} onChange={(e) => setTags(e.target.value)} />

      <button onClick={createProduct} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full">
        Submit Product
      </button>
    </div>
  );
}
