import { Category } from './types';

export const initialCategories: Category[] = [
  // Expense categories
  { 
    id: 'food',
    name: 'Comida',
    nameEn: 'Food',
    type: 'expense',
    color: '#EF4444' // red
  },
  { 
    id: 'transport',
    name: 'Transporte',
    nameEn: 'Transport',
    type: 'expense',
    color: '#F59E0B' // amber
  },
  { 
    id: 'entertainment',
    name: 'Entretenimiento',
    nameEn: 'Entertainment',
    type: 'expense',
    color: '#10B981' // emerald
  },
  { 
    id: 'shopping',
    name: 'Compras',
    nameEn: 'Shopping',
    type: 'expense',
    color: '#6366F1' // indigo
  },
  { 
    id: 'health',
    name: 'Salud',
    nameEn: 'Health',
    type: 'expense',
    color: '#EC4899' // pink
  },
  { 
    id: 'gifts',
    name: 'Regalos',
    nameEn: 'Gifts',
    type: 'expense',
    color: '#8B5CF6' // violet
  },
  { 
    id: 'vacation',
    name: 'Vacaciones',
    nameEn: 'Vacation',
    type: 'expense',
    color: '#14B8A6' // teal
  },
  { 
    id: 'bills',
    name: 'Facturas',
    nameEn: 'Bills',
    type: 'expense',
    color: '#F97316' // orange
  },
  
  // Income categories
  { 
    id: 'salary',
    name: 'Salario',
    nameEn: 'Salary',
    type: 'income',
    color: '#22C55E' // green
  },
  { 
    id: 'freelance',
    name: 'Trabajo Freelance',
    nameEn: 'Freelance Work',
    type: 'income',
    color: '#06B6D4' // cyan
  },
  { 
    id: 'investments',
    name: 'Inversiones',
    nameEn: 'Investments',
    type: 'income',
    color: '#3B82F6' // blue
  },
  { 
    id: 'gifts-received',
    name: 'Regalos Recibidos',
    nameEn: 'Gifts Received',
    type: 'income',
    color: '#A855F7' // purple
  },
];

export const translations = {
  es: {
    title: 'Control de Gastos',
    calendar: 'Calendario',
    monthlySummary: 'Resumen Mensual',
    categories: 'Categorías',
    income: 'Ingresos',
    expense: 'Gasto',
    expenses: 'Gastos',
    balance: 'Balance',
    newTransaction: 'Nueva Transacción',
    amount: 'Cantidad',
    category: 'Categoría',
    note: 'Nota',
    optional: 'opcional',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    noTransactions: 'No hay transacciones',
    noTransactionsFor: 'No hay transacciones para el',
    selectCategory: 'Selecciona una categoría',
    monthlyIncome: 'Ingresos del Mes',
    monthlyExpenses: 'Gastos del Mes',
    noIncome: 'No hay ingresos este mes',
    noExpenses: 'No hay gastos este mes',
    manageCategories: 'Gestionar Categorías',
    expenseCategories: 'Categorías de Gastos',
    incomeCategories: 'Categorías de Ingresos',
    categoryName: 'Nombre de la categoría',
    add: 'Añadir',
    cantDeleteCategory: 'No se puede eliminar una categoría que tiene transacciones asociadas',
    weekDays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    deleteConfirmation: '¿Estás seguro de que quieres eliminar esta transacción?'
  },
  en: {
    title: 'Expense Tracker',
    calendar: 'Calendar',
    monthlySummary: 'Monthly Summary',
    categories: 'Categories',
    income: 'Income',
    expense: 'Expense',
    expenses: 'Expenses',
    balance: 'Balance',
    newTransaction: 'New Transaction',
    amount: 'Amount',
    category: 'Category',
    note: 'Note',
    optional: 'optional',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    noTransactions: 'No transactions',
    noTransactionsFor: 'No transactions for',
    selectCategory: 'Select a category',
    monthlyIncome: 'Monthly Income',
    monthlyExpenses: 'Monthly Expenses',
    noIncome: 'No income this month',
    noExpenses: 'No expenses this month',
    manageCategories: 'Manage Categories',
    expenseCategories: 'Expense Categories',
    incomeCategories: 'Income Categories',
    categoryName: 'Category name',
    add: 'Add',
    cantDeleteCategory: 'Cannot delete a category that has associated transactions',
    weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    deleteConfirmation: 'Are you sure you want to delete this transaction?'
  },
};