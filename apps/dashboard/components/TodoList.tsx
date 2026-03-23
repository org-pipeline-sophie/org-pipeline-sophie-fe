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
  const hasCompletedTodos = completedCount > 0;

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
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg font-medium">할 일이 없습니다</p>
          <p className="text-gray-300 text-sm mt-2">새로운 할 일을 추가해보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
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

      {hasCompletedTodos && (
        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={onDeleteCompleted}
            className="w-full text-sm text-red-500 hover:text-red-600 hover:bg-red-50 py-2 px-3 rounded transition-colors"
          >
            완료 항목 전체 삭제 ({completedCount}개)
          </button>
        </div>
      )}
    </div>
  );
}