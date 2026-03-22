import React from 'react';
import { useTodos } from './hooks/useTodos';
import { SummaryCards } from './components/SummaryCards';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';

export function DashboardPage() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted, total, completed, remaining, completionRate } = useTodos();

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">TODO Dashboard</h1>
        <SummaryCards total={total} completed={completed} remaining={remaining} completionRate={completionRate} />
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <TodoInput onAdd={addTodo} />
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          {completed > 0 && (
            <button
              onClick={clearCompleted}
              className="mt-4 text-sm text-red-400 hover:text-red-600 underline"
            >
              완료된 항목 전체 삭제 ({completed}개)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
