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
  const incompleteCount = todos.length - completedCount;
  const completionRate = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TODO Dashboard</h1>
          <p className="text-gray-600">할 일을 관리하고 추적하세요</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards
          total={todos.length}
          completed={completedCount}
          incomplete={incompleteCount}
          completionRate={completionRate}
        />

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          {/* Input Section */}
          <TodoInput onAdd={addTodo} />

          {/* Todo List Section */}
          <div className="mt-6">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">할 일이 없습니다</p>
              </div>
            ) : (
              <>
                <TodoList
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />

                {/* Clear Completed Button */}
                {completedCount > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={deleteCompletedTodos}
                      className="text-sm px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors font-medium"
                    >
                      완료 항목 전체 삭제 ({completedCount})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>총 {todos.length}개의 할 일 중 {completedCount}개 완료</p>
        </div>
      </div>
    </div>
  );
}