import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store';

export function ThemeToggle() {
  const { theme, setTheme } = useAppStore();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun size={20} className="text-gray-400" />
      )}
    </button>
  );
}