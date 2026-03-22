import React from 'react';
import { Todo } from '../types/todo';

interface SummaryCardsProps {
  total: number;
  completed: number;
  remaining: number;
  completionRate: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  total,
  completed,
  remaining,
  completionRate,
}) => {
  return (
    <div className="flex gap-4">
      <div className="bg-blue-500 text-white p-4 rounded-lg shadow w-full">
        <h3 className="text-lg font-bold">Total</h3>
        <p className="text-4xl font-bold">{total}</p>
      </div>
      <div className="bg-green-500 text-white p-4 rounded-lg shadow w-full">
        <h3 className="text-lg font-bold">Completed</h3>
        <p className="text-4xl font-bold">{completed}</p>
      </div>
      <div className="bg-orange-500 text-white p-4 rounded-lg shadow w-full">
        <h3 className="text-lg font-bold">Remaining</h3>
        <p className="text-4xl font-bold">{remaining}</p>
      </div>
      <div className="bg-purple-500 text-white p-4 rounded-lg shadow w-full">
        <h3 className="text-lg font-bold">Completion Rate</h3>
        <p className="text-4xl font-bold">{completionRate.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default SummaryCards;