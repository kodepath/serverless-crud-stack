import React, { useState } from "react";
import TodoItem from './TodoItem';
import { FiCloud } from 'react-icons/fi';

export default function TodoList({ todos, onToggle, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    description: '', 
    category: 'general' 
  });

  const handleEditClick = (todo) => {
    setEditingId(todo.itemId);
    setEditForm({
      name: todo.name,
      description: todo.description || '',
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

  const handleSaveEdit = async (id, formData = null) => {
    try {
      await onToggle(id, formData || editForm);
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
          <TodoItem
            todo={todo}
            isEditing={editingId === todo.itemId}
            onEditClick={() => handleEditClick(todo)}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            editForm={editingId === todo.itemId ? editForm : null}
            onEditChange={handleEditChange}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}