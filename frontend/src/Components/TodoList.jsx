import TodoItem from '../Components/TodoItem'
import { FiCloud } from 'react-icons/fi';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
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
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}