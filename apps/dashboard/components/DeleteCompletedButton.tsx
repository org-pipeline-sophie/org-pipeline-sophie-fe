import React from 'react';
import { Todo } from '../types/todo';

interface Props {
  todos: Todo[];
  onDeleteCompleted: () => void;
}

export function DeleteCompletedButton({ todos, onDeleteCompleted }: Props) {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const hasCompleted = completedCount > 0;

  return (
    <button
      onClick={onDeleteCompleted}
      disabled={!hasCompleted}
      className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
        hasCompleted
          ? 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      }`}
      aria-label="완료된 항목 전체 삭제"
    >
      완료 항목 삭제 ({completedCount})
    </button>
  );
}