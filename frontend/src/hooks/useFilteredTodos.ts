import { useMemo } from "react";
import type { Todo } from "../types/todo";

export type StatusFilter = 'all' | 'completed' | 'not_completed';
export type TabFilter = 'all' | 'favorites';

export default function useFilteredTodos(
  todos: Todo[],
  activeTab: TabFilter,
  statusFilter: StatusFilter
) {
  return useMemo(() => {
    let filtered = activeTab === 'all' ? todos : todos.filter(t => t.favorite);
    if (statusFilter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (statusFilter === 'not_completed') {
      filtered = filtered.filter(t => !t.completed);
    }
    return filtered;
  }, [todos, activeTab, statusFilter]);
}
