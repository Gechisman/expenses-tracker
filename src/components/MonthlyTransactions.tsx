import React, { useState } from 'react';
import { format } from 'date-fns';
import { Transaction, Category } from '../types';
import { Euro, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

type MonthlyTransactionsProps = {
  transactions: Transaction[];
  categories: Category[];
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onDeleteTransaction: (id: string) => void;
  translations: any;
  locale: Locale;
};

export function MonthlyTransactions({
  transactions,
  categories,
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onDeleteTransaction,
  translations: t,
  locale
}: MonthlyTransactionsProps) {
  const { language } = useAppStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return language === 'en' ? category?.nameEn : category?.name || '';
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteTransaction(deleteId);
      setDeleteId(null);
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const incomeTransactions = sortedTransactions.filter((t) => t.type === 'income');
  const expenseTransactions = sortedTransactions.filter((t) => t.type === 'expense');

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy', { locale })}
          </h2>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4 text-green-600">{t.monthlyIncome}</h3>
            <div className="space-y-4">
              {incomeTransactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t.noIncome}</p>
              ) : (
                incomeTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-600">
                          +{transaction.amount.toFixed(2)} €
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(transaction.date), 'd MMM', { locale })}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {getCategoryName(transaction.categoryId)}
                        </span>
                        {transaction.note && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{transaction.note}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4 text-red-600">{t.monthlyExpenses}</h3>
            <div className="space-y-4">
              {expenseTransactions.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t.noExpenses}</p>
              ) : (
                expenseTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-red-600">
                          -{transaction.amount.toFixed(2)} €
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(transaction.date), 'd MMM', { locale })}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {getCategoryName(transaction.categoryId)}
                        </span>
                        {transaction.note && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{transaction.note}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={deleteId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        translations={t}
      />
    </>
  );
}