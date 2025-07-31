// src/App.tsx
import { useState, useCallback } from "react";
import useFilteredTodos from "./hooks/useFilteredTodos";
import type { Todo } from "./types/todo";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoModal from "./components/TodoModal";
import Tabs from "./components/Tabs";
import StatusFilter from "./components/StatusFilter";
import useTodos from "./hooks/useTodos";
import AppContainer from "./components/AppContainer";

function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'not_completed'>('all');
  const [modalTodo, setModalTodo] = useState<Todo | null>(null);

  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    toggleFavorite,
    updateTodo,
  } = useTodos();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = useCallback((e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle("");
    setDescription("");
  }, [addTodo, title, description]);

  const handleOpenModal = (todo: Todo) => setModalTodo(todo);
  const handleCloseModal = () => setModalTodo(null);
  const handleSaveModal = (updated: Todo) => {
    updateTodo(updated);
    handleCloseModal();
  };

  const filteredTodos = useFilteredTodos(todos, activeTab, statusFilter);


  return (
    <AppContainer>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">ToDo List</h1>

      <TodoForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        addTodo={handleAddTodo}
      />

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <StatusFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        toggleFavorite={toggleFavorite}
        onView={handleOpenModal}
      />

      {modalTodo && (
        <TodoModal
          todo={modalTodo}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </AppContainer>
  );
}

export default App;
