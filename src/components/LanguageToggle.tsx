import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-orange-100 p-1">
      <Languages size={16} className="text-orange-600 ml-2" />
      <button
        onClick={() => setLanguage('hi')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'hi'
            ? 'bg-orange-500 text-white shadow-md'
            : 'text-gray-600 hover:text-orange-600'
        }`}
      >
        हिंदी
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-orange-500 text-white shadow-md'
            : 'text-gray-600 hover:text-orange-600'
        }`}
      >
        English
      </button>
    </div>
  );
}