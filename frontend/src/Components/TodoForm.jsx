import React, { useState } from "react";
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

export default function TodoForm({ onAdd }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Name and description are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category || 'general'
      });

      setFormData({
        name: '',
        description: '',
        category: 'general'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
          Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
          className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg placeholder:text-white/70 text-white bg-white/20 backdrop-blur-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter item description"
          rows="3"
          className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg placeholder:text-white/70 text-white bg-white/20 backdrop-blur-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg text-white bg-white/20 backdrop-blur-sm cursor-pointer"
        >
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
        </select>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors text-white py-3 px-6 rounded-xl shadow-lg font-medium text-lg ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            'Add Item'
          )}
        </button>
      </div>
    </form>
  );
}
