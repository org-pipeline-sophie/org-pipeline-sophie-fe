import React, { useState } from 'react';

interface Props {
  onAddTodo: (title: string) => void;
}

export function TodoInput({ onAddTodo }: Props) {
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() === '') {
      return;
    }
    onAddTodo(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const isDisabled = input.trim() === '';

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAddTodo}
        disabled={isDisabled}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          isDisabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        추가
      </button>
    </div>
  );
}