// src/App.tsx
import { useState } from "react";
import type { Todo } from "./types/todo";
import { getTodos, createTodo, toggleTodoStatus, deleteTodo } from "./api/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const loadTodos = () => {
    getTodos().then((data) => {
      setTodos(data);
    });
  };

  const addTodo = () => {
    if (!title.trim()) return;
    createTodo(title);
    setTitle("");
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    toggleTodoStatus(id, todo.completed).then((updated) => {
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    });
  };

  const handleDelete = (id: string) => {
    deleteTodo(id)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

        <TodoForm title={title} setTitle={setTitle} addTodo={addTodo} loadTodos={loadTodos} />

        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={handleDelete} />
      </div>
    </div>
  );
}

export default App;
