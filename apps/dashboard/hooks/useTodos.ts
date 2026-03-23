import { useState } from 'react';
import { Todo } from '../types/todo';

const INITIAL_TODOS: Todo[] = [
  {
    id: '1',
    title: '파이프라인 테스트하기',
    completed: true,
    createdAt: '2026-03-22',
  },
  {
    id: '2',
    title: 'Dashboard 사양 작성',
    completed: true,
    createdAt: '2026-03-22',
  },
  {
    id: '3',
    title: 'PR 미리보기 URL 확인',
    completed: false,
    createdAt: '2026-03-22',
  },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const addTodo = (title: string) => {
    if (!title.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    incompleted: todos.filter((todo) => !todo.completed).length,
    completionRate:
      todos.length === 0 ? 0 : Math.round((todos.filter((todo) => todo.completed).length / todos.length) * 100),
  };

  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
    stats,
    hasCompletedTodos,
  };
}