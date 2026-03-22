import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteCompletedTodos: () => void;
}

export function TodoList({ todos, onToggle, onDelete, onDeleteCompletedTodos }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <ul className="space-y-4">
        {todos.length === 0 ? (
          <li className="text-gray-400 text-center">할 일이 없습니다.</li>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </ul>
      {todos.some((todo) => todo.completed) && (
        <button
          onClick={onDeleteCompletedTodos}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          완료 항목 전체 삭제
        </button>
      )}
    </div>
  );
}