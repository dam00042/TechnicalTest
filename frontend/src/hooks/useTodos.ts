import { useState, useEffect, useCallback } from "react";
import { getTodos, createTodo, toggleTodoStatus, deleteTodo, toggleFavorite, updateTodo } from "../api/todo";
import type { Todo } from "../types/todo";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(() => {
    getTodos().then(setTodos).catch(err => console.error("Failed to load todos", err));
  }, []);

  const addTodo = useCallback((title: string, description: string) => {
    if (!title.trim()) return;
    createTodo(title, description).then(loadTodos);
  }, [loadTodos]);

  const handleTodoUpdate = useCallback((updatedTodo: Todo) => {
    setTodos(prevTodos => prevTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleTodoStatus(id, todo.completed).then(handleTodoUpdate);
  }, [todos, handleTodoUpdate]);

  const deleteTodoHandler = useCallback((id: string) => {
    deleteTodo(id).then(() => {
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
    });
  }, []);

  const toggleFavoriteHandler = useCallback((id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    toggleFavorite(id, todo.favorite).then(handleTodoUpdate);
  }, [todos, handleTodoUpdate]);

  const updateTodoHandler = useCallback((updated: Todo) => {
    updateTodo(updated).then(handleTodoUpdate);
  }, [handleTodoUpdate]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo: deleteTodoHandler,
    toggleFavorite: toggleFavoriteHandler,
    updateTodo: updateTodoHandler,
  };
};

export default useTodos;
