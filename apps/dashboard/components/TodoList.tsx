import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteCompleted: () => void;
}

export function TodoList({ todos, onToggle, onDelete, onDeleteCompleted }: Props) {
  const completedCount = todos.filter(todo => todo.completed).length;
  const hasCompleted = completedCount > 0;

  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-gray-400 text-lg font-medium">할 일이 없습니다</p>
          <p className="text-gray-300 text-sm mt-1">새로운 할 일을 추가해보세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {hasCompleted && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <button
            onClick={onDeleteCompleted}
            className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            완료 항목 전체 삭제 ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}