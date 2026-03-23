import React from 'react';
import { Todo } from '../types/todo';

interface Props {
  todos: Todo[];
}

export function SummaryCards({ todos }: Props) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const incomplete = total - completed;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

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
      value: incomplete,
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
          <p className="text-sm font-medium text-gray-600 mb-2">{card.label}</p>
          <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}