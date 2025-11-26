import React, { useState } from "react";
import TodoItem from '../Components/TodoItem'
import { FaTrash, FaEdit, FaCheck, FaTimes, FaTag } from "react-icons/fa";
import { FiCloud } from 'react-icons/fi';

export default function TodoList({ todos, onToggle, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', category: 'general' });

  const handleEditClick = (todo) => {
    setEditingId(todo.itemId);
    setEditForm({
      name: todo.name,
      description: todo.description,
      category: todo.category || 'general'
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async (id) => {
    try {
      await onToggle(id, editForm);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (!todos.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-white/90 animate-fadeIn">
        <FiCloud size={64} className="mb-4 animate-bounce" />
        <h2 className="text-2xl font-semibold mb-2">All Clear! ☁️⚡</h2>
        <p className="text-white/70 mb-4">
          Nothing to do yet… Your serverless slate is clean.
        </p>
        <p className="italic text-white/60">Add your first task above 🌟</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.itemId}
          className="bg-white/10 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition-colors"
        >
          {editingId === todo.itemId ? (
            <div className="p-4">
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-2"
                  placeholder="Item name"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-2"
                  placeholder="Description"
                  rows="2"
                />
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleSaveEdit(todo.itemId)}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {todo.category && todo.category !== 'general' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-200">
                        <FaTag className="mr-1" size={10} />
                        {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-white">{todo.name}</h3>
                  {todo.description && (
                    <p className="mt-1 text-sm text-white/80">{todo.description}</p>
                  )}
                  <div className="mt-2 text-xs text-white/50">
                    {new Date(todo.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(todo)}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(todo.itemId)}
                    className="p-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}