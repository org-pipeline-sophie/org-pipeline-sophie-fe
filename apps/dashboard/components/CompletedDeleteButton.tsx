import React from 'react';

interface Props {
  completedCount: number;
  onDeleteCompleted: () => void;
}

export function CompletedDeleteButton({ completedCount, onDeleteCompleted }: Props) {
  const isDisabled = completedCount === 0;

  return (
    <button
      onClick={onDeleteCompleted}
      disabled={isDisabled}
      className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
        isDisabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-red-500 hover:bg-red-600 text-white cursor-pointer'
      }`}
      aria-label="완료된 항목 전체 삭제"
    >
      완료 항목 전체 삭제 ({completedCount})
    </button>
  );
}