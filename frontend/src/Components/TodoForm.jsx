import React, { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, completed: false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-lg placeholder:text-white text-white bg-white/20 backdrop-blur-sm"
      />

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors text-white px-6 rounded-2xl shadow-lg"
      >
        Add
      </button>
    </form>
  );
}
