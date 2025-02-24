import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, addDays, subDays } from 'date-fns';
import { Transaction } from '../types';
import { CalendarDay } from './CalendarDay';

type CalendarProps = {
  currentDate: Date;
  transactions: Transaction[];
  onDayClick: (date: Date) => void;
  translations: any;
  locale: Locale;
};

export function Calendar({ currentDate, transactions, onDayClick, translations: t, locale }: CalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  
  // Get the first day of the week (Monday = 1, Sunday = 0)
  let start = monthStart;
  const dayOfWeek = getDay(start);
  // If it's not Monday (1), adjust to previous Monday
  if (dayOfWeek !== 1) {
    start = subDays(start, dayOfWeek === 0 ? 6 : dayOfWeek - 1);
  }

  // Get the last day to show (ensure we show complete weeks)
  let end = monthEnd;
  const endDayOfWeek = getDay(end);
  if (endDayOfWeek !== 0) {
    end = addDays(end, 7 - endDayOfWeek);
  }

  const days = eachDayOfInterval({ start, end });
  const today = new Date();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700">
        {t.weekDays.map((day: string) => (
          <div key={day} className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            isCurrentMonth={isSameMonth(day, currentDate)}
            isToday={isSameDay(day, today)}
            transactions={transactions.filter(
              (t) => t.date === format(day, 'yyyy-MM-dd')
            )}
            onClick={() => onDayClick(day)}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}