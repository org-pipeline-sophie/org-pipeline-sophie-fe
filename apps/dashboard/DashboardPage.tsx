import React from 'react';
import SummaryCards from './components/SummaryCards';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useTodos } from './hooks/useTodos';

export default function DashboardPage() {
  const { todos, addTodo, toggleTodo, deleteTodo, deleteCompletedTodos } = useTodos();

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <SummaryCards
          total={todos.length}
          completed={todos.filter((todo) => todo.completed).length}
          remaining={todos.filter((todo) => !todo.completed).length}
          completionRate={todos.length > 0 ? (todos.filter((todo) => todo.completed).length / todos.length) * 100 : 0}
        />

        <TodoInput onAddTodo={addTodo} />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onDeleteCompleted={deleteCompletedTodos} />
      </div>
    </div>
  );
}