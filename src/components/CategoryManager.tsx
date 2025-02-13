import React, { useState } from 'react';
import { Category } from '../types';
import { Trash2 } from 'lucide-react';
import { useAppStore } from '../store';

type CategoryManagerProps = {
  categories: Category[];
  onSave: (category: Category) => void;
  onDelete: (id: string) => void;
  translations: any;
};

export function CategoryManager({ categories, onSave, onDelete, translations: t }: CategoryManagerProps) {
  const { language } = useAppStore();
  const [name, setName] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCategory: Category = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name.trim(),
      nameEn: name.trim(), // You might want to add a separate field for English name
      type,
      color: type === 'income' ? '#22C55E' : '#EF4444', // Default colors
    };

    onSave(newCategory);
    setName('');
  };

  const getCategoryName = (category: Category) => {
    return language === 'en' ? category.nameEn : category.name;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">{t.manageCategories}</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4 mb-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              type === 'expense'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t.expenseCategories}
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex-1 py-2 px-4 rounded-lg ${
              type === 'income'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {t.incomeCategories}
          </button>
        </div>

        <div className="flex space-x-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.categoryName}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {t.add}
          </button>
        </div>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-3 text-red-600">{t.expenseCategories}</h3>
          <div className="space-y-2">
            {categories
              .filter((c) => c.type === 'expense')
              .map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-white">{getCategoryName(category)}</span>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3 text-green-600">{t.incomeCategories}</h3>
          <div className="space-y-2">
            {categories
              .filter((c) => c.type === 'income')
              .map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-white">{getCategoryName(category)}</span>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}