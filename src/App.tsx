import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Calendar } from './components/Calendar';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { MonthSummary } from './components/MonthSummary';
import { CategoryManager } from './components/CategoryManager';
import { MonthlyTransactions } from './components/MonthlyTransactions';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { Transaction, Category } from './types';
import { initialCategories, translations } from './data';
import { useAppStore } from './store';
import { Plus, X, ChevronLeft, ChevronRight, Menu } from 'lucide-react';

type View = 'calendar' | 'categories' | 'monthly';

function App() {
  const { language, theme } = useAppStore();
  const t = translations[language];
  const dateLocale = language === 'es' ? es : enUS;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });
  const [currentView, setCurrentView] = useState<View>('calendar');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date >= monthStart && date <= monthEnd;
  });

  const selectedDateTransactions = transactions.filter((t) => 
    selectedDate && t.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const handleSaveTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions([
      ...transactions,
      { ...newTransaction, id: crypto.randomUUID() }
    ]);
    setShowForm(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSaveCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (transactions.some(t => t.categoryId === categoryId)) {
      alert(t.cantDeleteCategory);
      return;
    }
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setShowMobileMenu(false);
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors`}>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
            <div className="flex space-x-4">
              <button
                onClick={() => handleViewChange('calendar')}
                className={`px-4 py-2 rounded-lg ${
                  currentView === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t.calendar}
              </button>
              <button
                onClick={() => handleViewChange('monthly')}
                className={`px-4 py-2 rounded-lg ${
                  currentView === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t.monthlySummary}
              </button>
              <button
                onClick={() => handleViewChange('categories')}
                className={`px-4 py-2 rounded-lg ${
                  currentView === 'categories'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {t.categories}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="sm:hidden w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-4">
              <div className="flex justify-end space-x-4 mb-4">
                <LanguageToggle />
                <ThemeToggle />
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleViewChange('calendar')}
                  className={`px-4 py-2 rounded-lg ${
                    currentView === 'calendar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {t.calendar}
                </button>
                <button
                  onClick={() => handleViewChange('monthly')}
                  className={`px-4 py-2 rounded-lg ${
                    currentView === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {t.monthlySummary}
                </button>
                <button
                  onClick={() => handleViewChange('categories')}
                  className={`px-4 py-2 rounded-lg ${
                    currentView === 'categories'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {t.categories}
                </button>
              </div>
            </div>
          )}
        </div>

        {currentView === 'categories' ? (
          <CategoryManager
            categories={categories}
            onSave={handleSaveCategory}
            onDelete={handleDeleteCategory}
            translations={t}
          />
        ) : currentView === 'monthly' ? (
          <MonthlyTransactions
            transactions={monthTransactions}
            categories={categories}
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onDeleteTransaction={handleDeleteTransaction}
            translations={t}
            locale={dateLocale}
          />
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <MonthSummary
                transactions={monthTransactions}
                translations={t}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <button
                      onClick={handlePreviousMonth}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {format(currentDate, 'MMMM yyyy', { locale: dateLocale })}
                    </h2>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  <Calendar
                    currentDate={currentDate}
                    transactions={monthTransactions}
                    onDayClick={setSelectedDate}
                    translations={t}
                    locale={dateLocale}
                  />
                </div>
              </div>

              <div>
                {selectedDate && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {format(selectedDate, language === 'en' ? 'd \'of\' MMMM' : 'd \'de\' MMMM', { locale: dateLocale })}
                      </h3>
                      {!showForm && (
                        <button
                          onClick={() => setShowForm(true)}
                          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Plus size={16} className="mr-1" />
                          {t.newTransaction}
                        </button>
                      )}
                      {showForm && (
                        <button
                          onClick={() => setShowForm(false)}
                          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>

                    {showForm ? (
                      <TransactionForm
                        date={selectedDate}
                        categories={categories}
                        onSave={handleSaveTransaction}
                        onClose={() => setShowForm(false)}
                        translations={t}
                      />
                    ) : (
                      <TransactionList
                        date={selectedDate}
                        transactions={selectedDateTransactions}
                        categories={categories}
                        onDelete={handleDeleteTransaction}
                        translations={t}
                        locale={dateLocale}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;