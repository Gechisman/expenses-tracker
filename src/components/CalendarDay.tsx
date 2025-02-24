import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '../types';
import { Euro } from 'lucide-react';

type CalendarDayProps = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  transactions: Transaction[];
  onClick: () => void;
  locale: Locale;
};

export function CalendarDay({ date, isCurrentMonth, isToday, transactions, onClick, locale }: CalendarDayProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const hasTransactions = transactions.length > 0;

  return (
    <div
      onClick={onClick}
      className={`
        min-h-[100px] p-2 bg-white dark:bg-gray-800 cursor-pointer relative
        hover:bg-gray-50 dark:hover:bg-gray-700
        ${!isCurrentMonth ? 'opacity-50' : ''}
        ${hasTransactions && balance > 0 ? 'bg-green-50 dark:bg-green-900/20' : ''}
        ${hasTransactions && balance < 0 ? 'bg-red-50 dark:bg-red-900/20' : ''}
        ${isToday ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
      `}
    >
      <div className={`
        text-sm font-medium
        ${isToday ? 'bg-blue-500 dark:bg-blue-400 text-white rounded-full w-6 h-6 flex items-center justify-center mb-1' : 'text-gray-700 dark:text-gray-300'}
      `}>
        {format(date, 'd')}
      </div>
      {transactions.length > 0 && (
        <div className="mt-2 space-y-1">
          {totalIncome > 0 && (
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <Euro size={14} className="mr-1" />
              +{totalIncome.toFixed(2)}
            </div>
          )}
          {totalExpenses > 0 && (
            <div className="flex items-center text-sm text-red-600 dark:text-red-400">
              <Euro size={14} className="mr-1" />
              -{totalExpenses.toFixed(2)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}