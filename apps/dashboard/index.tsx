import React, { useState } from 'react';
import { Todo } from './types/todo';
import DashboardPage from './DashboardPage';

const initialTodos: Todo[] = [
  { id: '1', title: '파이프라인 테스트하기', completed: true, createdAt: '2026-03-22' },
  { id: '2', title: 'Dashboard 사양 작성', completed: true, createdAt: '2026-03-22' },
  { id: '3', title: 'PR 미리보기 URL 확인', completed: false, createdAt: '2026-03-22' },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    const newTodo: Todo = { id: crypto.randomUUID(), title, completed: false, createdAt: new Date().toISOString() };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <DashboardPage
      todos={todos}
      addTodo={addTodo}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      deleteCompletedTodos={deleteCompletedTodos}
    />
  );
};

export default App;