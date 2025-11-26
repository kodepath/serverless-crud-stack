import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck, FaTimes, FaTag } from 'react-icons/fa';

export default function TodoItem({ 
  todo, 
  onToggle, 
  onDelete,
  isEditing,
  onEditClick,
  onSaveEdit,
  onCancelEdit,
  editForm,
  onEditChange
}) {
  const [localEditForm, setLocalEditForm] = useState({
    name: todo.name,
    description: todo.description,
    category: todo.category || 'general'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (onEditChange) {
      onEditChange(e);
    } else {
      setLocalEditForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    onSaveEdit(todo.itemId, localEditForm);
  };

  if (isEditing) {
    return (
      <div className="p-4">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={editForm?.name || localEditForm.name}
            onChange={onEditChange || handleChange}
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-2"
            placeholder="Item name"
          />
          <textarea
            name="description"
            value={editForm?.description || localEditForm.description}
            onChange={onEditChange || handleChange}
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-2"
            placeholder="Description"
            rows="2"
          />
          <select
            name="category"
            value={editForm?.category || localEditForm.category}
            onChange={onEditChange || handleChange}
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
            onClick={onSaveEdit ? () => onSaveEdit(todo.itemId) : handleSave}
            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={onCancelEdit}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
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
            onClick={onEditClick}
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
  );
}
