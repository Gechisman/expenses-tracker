import React, { useState } from 'react';
import { format } from 'date-fns';
import { Transaction, Category } from '../types';
import { Euro, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';

type TransactionListProps = {
  date: Date;
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
  translations: any;
  locale: Locale;
};

export function TransactionList({ date, transactions, categories, onDelete, translations: t, locale }: TransactionListProps) {
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
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        {t.noTransactionsFor} {format(date, language === 'en' ? 'd \'of\' MMMM' : 'd \'de\' MMMM', { locale })}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow"
          >
            <div className="flex-1">
              <div className="flex items-center">
                <span
                  className={`font-medium ${
                    transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {transaction.amount.toFixed(2)} €
                </span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {getCategoryName(transaction.categoryId)}
                </span>
              </div>
              {transaction.note && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{transaction.note}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(transaction.id)}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
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