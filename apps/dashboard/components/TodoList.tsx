import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {todos.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-400 text-lg">할 일이 없습니다</p>
        </div>
      ) : (
        <ul className="space-y-0">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}