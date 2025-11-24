import React, { useEffect, useState } from "react";
import TodoForm from "../Components/TodoForm";
import TodoList from "../components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todos";

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async (todo) => {
    const newTodo = await createTodo(todo);
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggle = async (id, updated) => {
    const updatedTodo = await updateTodo(id, updated);
    setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md bg-white/20 rounded-3xl shadow-2xl">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
        ⚡ LambdaList
      </h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
