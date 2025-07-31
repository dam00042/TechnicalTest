import React, { useState, useRef, useEffect } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  toggleFavorite?: (id: string) => void;
  onView?: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo, toggleFavorite, onView }) => {
  const [showDesc, setShowDesc] = useState(false);
  const descRef = useRef<HTMLSpanElement>(null);
  const [descOverflow, setDescOverflow] = useState(false);

  useEffect(() => {
    if (descRef.current) {
      setDescOverflow(descRef.current.scrollWidth > descRef.current.clientWidth);
    }
  }, [todo.description, showDesc]);
  return (
    <li
      key={todo.id}
      className={`flex items-center gap-2 bg-gray-200 p-4 rounded-lg border-2 border-gray-400 mb-4 shadow transition-all duration-200`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="cursor-pointer mt-1 w-5 h-5 accent-blue-500 border-2 border-gray-400 rounded-lg"
        style={{ minWidth: '1.25rem', minHeight: '1.25rem' }}
      />
      <button
        onClick={() => toggleFavorite && toggleFavorite(todo.id)}
        className="text-yellow-500 text-2xl focus:outline-none cursor-pointer flex items-center justify-center"
        title={todo.favorite ? "Unmark as favorite" : "Mark as favorite"}
        style={{ lineHeight: 1, width: '2rem', height: '2rem', verticalAlign: 'middle' }}
        type="button"
      >
        {todo.favorite ? "★" : "☆"}
      </button>
      <div className="flex-1 min-w-0 flex flex-col justify-center pr-2">
        <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
        {todo.description && (
          <>
            {!showDesc ? (
              <span
                ref={descRef}
                className={`block mt-1 text-sm truncate overflow-hidden whitespace-nowrap align-middle ${todo.completed ? 'text-gray-400' : 'text-gray-500'}`}
                style={{ maxWidth: '100%' }}
                title={todo.description}
              >
                {todo.description}
              </span>
            ) : (
              <span
                className={`block mt-1 text-sm whitespace-pre-line break-words ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ wordBreak: 'break-word', maxWidth: '100%' }}
              >
                {todo.description}
              </span>
            )}
            {descOverflow && (
              <button
                onClick={() => setShowDesc((v) => !v)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded transition cursor-pointer border border-gray-300 whitespace-nowrap h-8 mt-2 w-fit"
                type="button"
                title={showDesc ? "Hide description" : "Show full description"}
                style={{ minWidth: '140px', maxWidth: '180px' }}
              >
                {showDesc ? "Hide Description" : "Show Description"}
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex items-center gap-2 ml-2 flex-shrink-0 justify-end">
        <button
          onClick={() => onView && onView(todo)}
          className="bg-orange-400 hover:bg-orange-500 text-white px-2 py-1 rounded transition cursor-pointer border border-orange-500"
          type="button"
          title="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded transition cursor-pointer"
          title="Delete task"
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
