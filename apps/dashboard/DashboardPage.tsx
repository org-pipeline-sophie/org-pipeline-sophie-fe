import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { SummaryCards } from './SummaryCards';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { CompletedDeleteButton } from './CompletedDeleteButton';

export function DashboardPage(): React.ReactElement {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
  } = useTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const incompleteCount = todos.length - completedCount;
  const completionRate = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">할 일을 관리하세요</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          total={todos.length}
          completed={completedCount}
          incomplete={incompleteCount}
          completionRate={completionRate}
        />

        {/* Todo Input */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Todo List Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">할 일 목록</h2>
            {completedCount > 0 && (
              <CompletedDeleteButton onDeleteCompleted={deleteCompletedTodos} />
            )}
          </div>

          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">할 일이 없습니다</p>
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}