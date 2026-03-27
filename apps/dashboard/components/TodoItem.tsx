import React from 'react';
import { Todo } from '../types/todo';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<Props> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-sm ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {todo.title}
      </span>
      <span className="text-xs text-gray-400">{todo.createdAt}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-600 text-sm font-bold ml-1"
        aria-label="삭제"
      >
        ✕
      </button>
    </li>
  );
};