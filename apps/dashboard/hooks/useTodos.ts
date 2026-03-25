import { useState } from 'react';
import { Todo } from '../types/todo';

interface UseTodosReturn {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  deleteCompletedTodos: () => void;
}

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

export function useTodos(): UseTodosReturn {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const addTodo = (title: string): void => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodos = (): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
  };
}