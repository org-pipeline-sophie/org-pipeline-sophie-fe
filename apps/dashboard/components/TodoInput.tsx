import React, { useState } from 'react';

interface Props {
  onAddTodo: (title: string) => void;
}

export function TodoInput({ onAddTodo }: Props) {
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAddTodo(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const isInputEmpty = input.trim() === '';

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      <button
        onClick={handleAddTodo}
        disabled={isInputEmpty}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
      >
        추가
      </button>
    </div>
  );
}