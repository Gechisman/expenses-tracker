import React from 'react';
import { Transaction } from '../types';
import { Euro } from 'lucide-react';

type MonthSummaryProps = {
  transactions: Transaction[];
  translations: any;
};

export function MonthSummary({ transactions, translations: t }: MonthSummaryProps) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <div className="text-sm text-green-600 dark:text-green-400 font-medium">{t.income}</div>
        <div className="mt-1 flex items-center text-lg font-semibold text-green-700 dark:text-green-300">
          <Euro size={20} className="mr-1" />
          {totalIncome.toFixed(2)}
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <div className="text-sm text-red-600 dark:text-red-400 font-medium">{t.expenses}</div>
        <div className="mt-1 flex items-center text-lg font-semibold text-red-700 dark:text-red-300">
          <Euro size={20} className="mr-1" />
          {totalExpenses.toFixed(2)}
        </div>
      </div>

      <div className={`p-4 rounded-lg ${
        balance >= 0 
          ? 'bg-blue-50 dark:bg-blue-900/20' 
          : 'bg-orange-50 dark:bg-orange-900/20'
      }`}>
        <div className={`text-sm font-medium ${
          balance >= 0 
            ? 'text-blue-600 dark:text-blue-400' 
            : 'text-orange-600 dark:text-orange-400'
        }`}>
          {t.balance}
        </div>
        <div className={`mt-1 flex items-center text-lg font-semibold ${
          balance >= 0 
            ? 'text-blue-700 dark:text-blue-300' 
            : 'text-orange-700 dark:text-orange-300'
        }`}>
          <Euro size={20} className="mr-1" />
          {balance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}