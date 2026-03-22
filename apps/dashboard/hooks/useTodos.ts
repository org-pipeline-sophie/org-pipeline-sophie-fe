import { useState, useCallback } from 'react';
import { Todo } from '../types/todo';

interface UseTodosResult {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  deleteCompletedTodos: () => void;
}

const useTodos = (): UseTodosResult => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: '파이프라인 테스트하기', completed: true, createdAt: '2026-03-22' },
    { id: '2', title: 'Dashboard 사양 작성', completed: true, createdAt: '2026-03-22' },
    { id: '3', title: 'PR 미리보기 URL 확인', completed: false, createdAt: '2026-03-22' },
  ]);

  const addTodo = useCallback((title: string) => {
    if (title.trim() === '') return;
    const newTodo: Todo = { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const deleteCompletedTodos = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  return { todos, addTodo, toggleTodo, deleteTodo, deleteCompletedTodos };
};

export default useTodos;