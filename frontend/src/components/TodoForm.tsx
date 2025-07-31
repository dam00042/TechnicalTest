// src/components/TodoForm.tsx
import React from "react";

interface TodoFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e?: React.FormEvent) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ title, setTitle, description, setDescription, addTodo }) => {
  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <form className="flex flex-col gap-2 mb-2" onSubmit={addTodo}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />
      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
          title="Add new task"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-orange-200 hover:bg-orange-300 text-orange-900 px-4 py-2 rounded-lg transition cursor-pointer border border-orange-300"
          title="Clear fields"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
