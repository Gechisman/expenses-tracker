export type Category = {
  id: string;
  name: string;
  nameEn: string;
  type: 'income' | 'expense';
  color: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  date: string;
  note?: string;
};

export type DayTransactions = {
  date: string;
  transactions: Transaction[];
};

export type Language = 'es' | 'en';

export type Theme = 'light' | 'dark';