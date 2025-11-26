import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 mb-3 bg-white/30 rounded-2xl shadow-md hover:shadow-xl hover:bg-white/50 transition-all duration-300">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, { completed: !todo.completed })}
          className="w-5 h-5 accent-pink-500"
        />
        <span
          className={`text-lg font-medium ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.name}
        </span>
      </div>
      <button onClick={() => onDelete(todo.id)} className="text-red-500 hover:text-red-700 transition">
        <FiTrash2 size={20} />
      </button>
    </div>
  );
}
