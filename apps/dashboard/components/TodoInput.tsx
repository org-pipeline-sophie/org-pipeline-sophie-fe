apps/dashboard/components/TodoInput.tsx

import React, { useState, KeyboardEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="새 할 일을 입력하세요"
        className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleAddTodo}
        disabled={inputValue.trim() === ''}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        추가
      </button>
    </div>
  );
}