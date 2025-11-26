import React, { useEffect, useState } from "react";
import TodoForm from "../Components/TodoForm";
import TodoList from "../components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again.');
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      const newTodo = await createTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      toast.success('Item added successfully!');
    } catch (err) {
      console.error('Failed to add todo:', err);
      toast.error('Failed to add item');
      throw err;
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const updatedTodo = await updateTodo(id, updatedData);
      setTodos((prev) => prev.map((t) => (t.itemId === id ? updatedTodo : t)));
      toast.success('Item updated successfully!');
      return updatedTodo;
    } catch (err) {
      console.error('Failed to update item:', err);
      toast.error('Failed to update item');
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.itemId !== id));
      toast.success('Item deleted successfully!');
    } catch (err) {
      console.error('Failed to delete todo:', err);
      toast.error('Failed to delete item');
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="backdrop-blur-md bg-white/20 rounded-3xl shadow-2xl p-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          🚀 Serverless CRUD App
        </h1>
        <div className="mb-8">
          <TodoForm onAdd={handleAdd} />
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Your Items</h2>
          <TodoList 
            todos={todos} 
            onToggle={handleUpdate} 
            onDelete={handleDelete} 
          />
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
