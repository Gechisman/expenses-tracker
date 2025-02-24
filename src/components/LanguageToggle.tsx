import React from 'react';
import { useAppStore } from '../store';

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  return (
    <button
      onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
      className="px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
    >
      {language === 'es' ? 'EN' : 'ES'}
    </button>
  );
}