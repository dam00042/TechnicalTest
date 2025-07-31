import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8000/todos";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error fetching todos");
  return res.json();
};

export const createTodo = async (title: string, description: string = ""): Promise<void> => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, completed: false, favorite: false }),
  });
};

export const toggleTodoStatus = async (
  id: string,
  currentStatus: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !currentStatus }),
  });
  if (!res.ok) throw new Error("Error toggling todo status");
  return res.json();
};

export const toggleFavorite = async (
  id: string,
  currentFavorite: boolean
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: !currentFavorite }),
  });
  if (!res.ok) throw new Error("Error toggling favorite");
  return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting todo");
};


export const updateTodo = async (updated: Todo): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${updated.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: updated.title,
      description: updated.description,
      favorite: updated.favorite,
      completed: updated.completed,
    }),
  });
  if (!res.ok) throw new Error("Error updating todo");
  return res.json();
};