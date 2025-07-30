import React from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li
      key={todo.id}
      className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200"
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="cursor-pointer"
      />
      <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-auto bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition cursor-pointer"
        title="Delete"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
