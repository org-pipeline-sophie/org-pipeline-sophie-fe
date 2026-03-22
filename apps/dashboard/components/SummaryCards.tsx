import React from 'react';

interface Props {
  total: number;
  completed: number;
  remaining: number;
  completionRate: number;
}

export function SummaryCards({ total, completed, remaining, completionRate }: Props) {
  const cards = [
    { label: '전체', value: total, color: 'bg-blue-500', icon: '📋' },
    { label: '완료', value: completed, color: 'bg-green-500', icon: '✅' },
    { label: '미완료', value: remaining, color: 'bg-orange-500', icon: '⏳' },
    { label: '완료율', value: completionRate + '%', color: 'bg-purple-500', icon: '📊' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <span className="text-2xl mb-1">{card.icon}</span>
          <span className={`text-2xl font-bold ${card.color.replace('bg-', 'text-')}`}>{card.value}</span>
          <span className="text-sm text-gray-500 mt-1">{card.label}</span>
        </div>
      ))}
    </div>
  );
}
