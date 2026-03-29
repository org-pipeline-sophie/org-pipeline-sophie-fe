import React from 'react';

interface Props {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}

export function SummaryCards({ total, completed, pending, completionRate }: Props) {
  const cards = [
    {
      label: '전체',
      value: total,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      label: '완료',
      value: completed,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      label: '미완료',
      value: pending,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      borderColor: 'border-orange-200',
    },
    {
      label: '완료율',
      value: `${completionRate}%`,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} border ${card.borderColor} rounded-lg p-6 shadow-sm`}
        >
          <p className="text-sm text-gray-600 font-medium mb-2">{card.label}</p>
          <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}