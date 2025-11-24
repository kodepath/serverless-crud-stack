let todos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Build Serverless App', completed: false },
];

export const getTodos = () =>
  new Promise((resolve) => setTimeout(() => resolve([...todos]), 300));

export const createTodo = (todo) =>
  new Promise((resolve) => {
    const newTodo = { id: Date.now(), ...todo };
    todos.push(newTodo);
    setTimeout(() => resolve(newTodo), 300);
  });

export const updateTodo = (id, updatedTodo) =>
  new Promise((resolve) => {
    todos = todos.map((t) => (t.id === id ? { ...t, ...updatedTodo } : t));
    setTimeout(() => resolve(todos.find((t) => t.id === id)), 300);
  });

export const deleteTodo = (id) =>
  new Promise((resolve) => {
    todos = todos.filter((t) => t.id !== id);
    setTimeout(() => resolve({ success: true }), 300);
  });
