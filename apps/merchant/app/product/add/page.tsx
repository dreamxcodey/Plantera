'use client';

import { useEffect, useState } from 'react';

export default function AddPlant() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [brands, setBrands] = useState<[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [specifications, setSpecifications] = useState<{ key: string, value: string }[]>([
    { key: '', value: '' }
  ]);
  const [sizes, setSizes] = useState([
    { dimension: '', label: '', price: '', stock: '0', images: [''] }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    mrp: '',
    taxInfo: '',
    shortDescription: '',
    fullDescription: '',
    categoryId: '',
    subcategoryId: '',
    newCategory: '',
    newSubcategory: '',
    userId: '1',
    brandId: '',
  });

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(() => setErrors({ fetch: 'Failed to load categories' }));

    fetch('/api/tags')
      .then(res => res.json())
      .then(setAllTags)
      .catch(() => setErrors({ fetch: 'Failed to load tags' }));

    fetch('/api/brands')
      .then(res => res.json())
      .then(setBrands)
      .catch(() => setErrors({ fetch: 'Failed to load brands' }));
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      fetch(`/api/categories/${formData.categoryId}/subcategories`)
        .then(res => res.json())
        .then(setSubcategories)
        .catch(() => setErrors({ fetch: 'Failed to load subcategories' }));
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // Size handling functions
  const handleSizeChange = (index: number, field: string, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const handleSizeImageChange = (sizeIndex: number, imgIndex: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].images[imgIndex] = value;
    setSizes(newSizes);
  };

  const addSizeImageField = (sizeIndex: number) => {
    const newSizes = [...sizes];
    newSizes[sizeIndex].images.push('');
    setSizes(newSizes);
  };

  const removeSizeImageField = (sizeIndex: number, imgIndex: number) => {
    if (sizes[sizeIndex].images.length <= 1) return;
    const newSizes = [...sizes];
    newSizes[sizeIndex].images.splice(imgIndex, 1);
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { dimension: '', label: '', price: '', stock: '0', images: [''] }]);
  };

  const removeSize = (index: number) => {
    if (sizes.length <= 1) return;
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  // Specification handling functions
  const handleSpecChange = (index: number, field: 'key' | 'value', text: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = text;
    setSpecifications(newSpecs);
  };

  const addSpecField = () => setSpecifications([...specifications, { key: '', value: '' }]);
  const removeSpecField = (index: number) => {
    if (specifications.length <= 1) return;
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    setSpecifications(newSpecs);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Plant name is required';
    if (!formData.shortDescription) newErrors.shortDescription = 'Short description is required';
    if (!formData.categoryId && !formData.newCategory.trim()) newErrors.category = 'Category is required';

    // Validate sizes
    sizes.forEach((size, index) => {
      if (!size.dimension.trim()) newErrors[`size-${index}-dimension`] = 'Dimension is required';
      if (!size.label.trim()) newErrors[`size-${index}-label`] = 'Label is required';
      if (!size.price) newErrors[`size-${index}-price`] = 'Price is required';
      if (Number(size.price) <= 0) newErrors[`size-${index}-price`] = 'Price must be greater than 0';
      if (Number(size.stock) < 0) newErrors[`size-${index}-stock`] = 'Stock cannot be negative';

      // Image validation for each size
      const validImages = size.images.filter(img => img.trim());
      if (validImages.length === 0) {
        newErrors[`size-${index}-images`] = 'At least one image is required for this size';
      } else {
        validImages.forEach(img => {
          if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(img)) {
            newErrors[`size-${index}-images`] = 'Invalid image URL format (must be jpg, jpeg, png, or webp)';
          }
        });
      }
    });

    return newErrors;
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Calculate default price (lowest size price)
      const defaultPrice = Math.min(...sizes.map(size => parseFloat(size.price)));

      const payload = {
        ...formData,
        slug: generateSlug(formData.name),
        tags: selectedTags,
        specifications: specifications.filter(spec => spec.key && spec.value),
        mrp: formData.mrp || null,
        taxInfo: formData.taxInfo || null,
        brandId: formData.brandId || null,
        defaultPrice,
        stock: sizes.reduce((total, size) => total + parseInt(size.stock || '0'), 0),
        sizes: sizes.map(size => ({
          dimension: size.dimension,
          label: size.label,
          price: parseFloat(size.price),
          stock: parseInt(size.stock || '0'),
          images: size.images.filter(img => img.trim())
        }))
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add plant');
      }

      setSuccessMessage('🌿 Plant added successfully!');
      // Reset form
      setFormData({
        name: '',
        mrp: '',
        taxInfo: '',
        shortDescription: '',
        fullDescription: '',
        categoryId: '',
        subcategoryId: '',
        newCategory: '',
        newSubcategory: '',
        userId: '1',
        brandId: '',
      });
      setSelectedTags([]);
      setSizes([{ dimension: '', label: '', price: '', stock: '0', images: [''] }]);
      setSpecifications([{ key: '', value: '' }]);
    } catch (error: any) {
      setErrors({ submit: error.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-amber-50 border border-green-200 rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          Add New Plant
        </h1>
        <p className="text-green-600 mt-2">Grow your collection with a new green friend</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}

      {errors.fetch && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {errors.fetch}
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Plant Name *
            </label>
            <input
              name="name"
              placeholder="e.g., Monstera Deliciosa"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors.name ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Original Price ($)
            </label>
            <input
              name="mrp"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Tax Information
            </label>
            <input
              name="taxInfo"
              placeholder="e.g., GST 5%"
              value={formData.taxInfo}
              onChange={handleChange}
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Brand
            </label>
            <select
              name="brandId"
              value={formData.brandId}
              onChange={handleChange}
              className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
            >
              <option value="">Select brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-2">
            Short Description *
          </label>
          <textarea
            name="shortDescription"
            placeholder="Brief description for product listings"
            value={formData.shortDescription}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 min-h-[100px] ${errors.shortDescription ? 'border-red-500 bg-red-50' : 'border-green-200'
              }`}
          />
          {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-2">
            Full Description
          </label>
          <textarea
            name="fullDescription"
            placeholder="Detailed description about the plant"
            value={formData.fullDescription}
            onChange={handleChange}
            className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 min-h-[120px]"
          />
        </div>

        {/* Bag Sizes Section */}
        <div>
          <label className="block text-green-700 font-medium mb-2">
            Bag Sizes *
          </label>
          {sizes.map((size, sizeIndex) => (
            <div key={sizeIndex} className="border border-green-200 rounded-lg p-4 mb-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-green-700 font-medium mb-2">Dimension *</label>
                  <input
                    value={size.dimension}
                    onChange={(e) => handleSizeChange(sizeIndex, 'dimension', e.target.value)}
                    placeholder="e.g., S, M, L or 1kg, 2kg"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors[`size-${sizeIndex}-dimension`] ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
                  />
                  {errors[`size-${sizeIndex}-dimension`] && <p className="text-red-500 text-sm mt-1">{errors[`size-${sizeIndex}-dimension`]}</p>}
                </div>
                <div>
                  <label className="block text-green-700 font-medium mb-2">Label *</label>
                  <input
                    value={size.label}
                    onChange={(e) => handleSizeChange(sizeIndex, 'label', e.target.value)}
                    placeholder="e.g., Small, Medium, Large"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors[`size-${sizeIndex}-label`] ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
                  />
                  {errors[`size-${sizeIndex}-label`] && <p className="text-red-500 text-sm mt-1">{errors[`size-${sizeIndex}-label`]}</p>}
                </div>
                <div>
                  <label className="block text-green-700 font-medium mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={size.price}
                    onChange={(e) => handleSizeChange(sizeIndex, 'price', e.target.value)}
                    placeholder="0.00"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors[`size-${sizeIndex}-price`] ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
                  />
                  {errors[`size-${sizeIndex}-price`] && <p className="text-red-500 text-sm mt-1">{errors[`size-${sizeIndex}-price`]}</p>}
                </div>
                <div>
                  <label className="block text-green-700 font-medium mb-2">Stock *</label>
                  <input
                    type="number"
                    value={size.stock}
                    onChange={(e) => handleSizeChange(sizeIndex, 'stock', e.target.value)}
                    placeholder="0"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors[`size-${sizeIndex}-stock`] ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
                  />
                  {errors[`size-${sizeIndex}-stock`] && <p className="text-red-500 text-sm mt-1">{errors[`size-${sizeIndex}-stock`]}</p>}
                </div>
              </div>

              <div>
                <label className="block text-green-700 font-medium mb-2">
                  Image URLs for this size *
                  <span className="text-sm text-gray-500 ml-2">(At least one required)</span>
                </label>
                {size.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="flex gap-2 mb-2">
                    <input
                      value={img}
                      onChange={(e) => handleSizeImageChange(sizeIndex, imgIndex, e.target.value)}
                      placeholder="https://example.com/plant.jpg"
                      className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors[`size-${sizeIndex}-images`] ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSizeImageField(sizeIndex, imgIndex)}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                      disabled={size.images.length <= 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSizeImageField(sizeIndex)}
                  className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                >
                  + Add Another Image
                </button>
                {errors[`size-${sizeIndex}-images`] && <p className="text-red-500 text-sm mt-1">{errors[`size-${sizeIndex}-images`]}</p>}
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => removeSize(sizeIndex)}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                  disabled={sizes.length <= 1}
                >
                  Remove Size
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addSize}
            className="mt-4 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
          >
            + Add Another Size
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              Category *
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors.category ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
            >
              <option value="">Select existing category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <div className="mt-2">
              <input
                name="newCategory"
                placeholder="Create new category"
                value={formData.newCategory}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${errors.category ? 'border-red-500 bg-red-50' : 'border-green-200'}`}
              />
            </div>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-green-700 font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Subcategory
            </label>
            <select
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={handleChange}
              disabled={!formData.categoryId}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${!formData.categoryId ? 'bg-gray-100' : ''} border-green-200`}
            >
              <option value="">Select existing subcategory</option>
              {subcategories.map((sub: any) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>

            <div className="mt-2">
              <input
                name="newSubcategory"
                placeholder="Create new subcategory"
                value={formData.newSubcategory}
                onChange={handleChange}
                disabled={!formData.categoryId}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 ${!formData.categoryId ? 'bg-gray-100' : ''} border-green-200`}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-2">
            Specifications
          </label>
          {specifications.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
              <input
                value={spec.key}
                onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                placeholder="Key (e.g., Height)"
                className="md:col-span-2 p-3 border border-green-200 rounded-lg"
              />
              <input
                value={spec.value}
                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                placeholder="Value (e.g., 30cm)"
                className="md:col-span-2 p-3 border border-green-200 rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeSpecField(index)}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                disabled={specifications.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecField}
            className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
          >
            + Add Specification
          </button>
        </div>

        <div>
          <label className="block text-green-700 font-medium mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Plant Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                type="button"
                key={tag}
                className={`px-3 py-1.5 rounded-full border transition-all flex items-center ${selectedTags.includes(tag)
                  ? 'bg-green-600 text-white border-green-700'
                  : 'bg-white text-green-800 border-green-300 hover:bg-green-100'}`}
                onClick={() => toggleTag(tag)}
              >
                {selectedTags.includes(tag) && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all flex items-center justify-center ${isSubmitting
            ? 'bg-green-400 cursor-not-allowed'
            : 'bg-green-700 hover:bg-green-800 hover:shadow-lg'
            }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Plant...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Add to Collection
            </>
          )}
        </button>
      </form>
    </div>
  );
}
