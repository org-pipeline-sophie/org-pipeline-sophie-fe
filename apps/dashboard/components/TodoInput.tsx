import React, { useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmedInput = input.trim();
    if (trimmedInput) {
      onAdd(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const isDisabled = !input.trim();

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하세요..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        onClick={handleAdd}
        disabled={isDisabled}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          isDisabled
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        추가
      </button>
    </div>
  );
}