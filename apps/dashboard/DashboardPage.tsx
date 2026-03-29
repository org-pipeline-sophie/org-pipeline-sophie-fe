import React from 'react';
import { useTodos } from '../hooks/useTodos';
import { SummaryCards } from './SummaryCards';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

export function DashboardPage() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
  } = useTodos();

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const incompletedCount = totalCount - completedCount;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const hasCompletedTodos = completedCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TODO Dashboard</h1>
          <p className="text-gray-600">할 일을 효율적으로 관리하세요</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          total={totalCount}
          completed={completedCount}
          incompleted={incompletedCount}
          completionRate={completionRate}
        />

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          {/* Input Section */}
          <div className="mb-6">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Delete Completed Button */}
          {hasCompletedTodos && (
            <div className="mb-4 pb-4 border-b border-gray-200">
              <button
                onClick={deleteCompletedTodos}
                className="text-sm bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-3 py-2 rounded transition-colors"
              >
                완료 항목 전체 삭제 ({completedCount})
              </button>
            </div>
          )}

          {/* Todo List Section */}
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {/* Stats Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            전체 {totalCount}개 • 완료 {completedCount}개 • 미완료 {incompletedCount}개
          </p>
        </div>
      </div>
    </div>
  );
}