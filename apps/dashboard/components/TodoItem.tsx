import React from 'react';
import { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className="flex items-center gap-3 py-3 px-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 accent-blue-500 cursor-pointer rounded"
      />
      <span
        className={`flex-1 text-sm font-medium ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-700'
        }`}
      >
        {todo.title}
      </span>
      <span className="text-xs text-gray-400 whitespace-nowrap">
        {todo.createdAt}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 text-lg font-bold ml-2 transition-colors"
        aria-label="삭제"
        type="button"
      >
        ✕
      </button>
    </li>
  );
}