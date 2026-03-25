import React from 'react';

interface SummaryCardsProps {
  total: number;
  completed: number;
  remaining: number;
  completionRate: number;
}

export function SummaryCards({
  total,
  completed,
  remaining,
  completionRate,
}: SummaryCardsProps) {
  const cards = [
    {
      label: '전체',
      value: total,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      icon: '📋',
    },
    {
      label: '완료',
      value: completed,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      icon: '✅',
    },
    {
      label: '미완료',
      value: remaining,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      icon: '⏳',
    },
    {
      label: '완료율',
      value: `${completionRate}%`,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      icon: '📊',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`${card.bgColor} border ${card.borderColor} rounded-lg p-6 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{card.icon}</span>
            <span className={`text-sm font-medium ${card.textColor}`}>
              {card.label}
            </span>
          </div>
          <div className={`text-3xl font-bold ${card.textColor}`}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}