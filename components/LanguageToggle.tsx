'use client';

import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'en_es';
}

export function LanguageToggle({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'en_es' 
}: LanguageToggleProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center space-x-3 mb-3">
        <Globe className="w-5 h-5 text-cyan-300" />
        <span className="font-medium text-white">Language</span>
      </div>
      
      <div className="flex bg-white bg-opacity-10 rounded-lg p-1">
        <button
          onClick={() => onLanguageChange('en')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            currentLanguage === 'en'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'text-white text-opacity-70 hover:text-opacity-100'
          }`}
        >
          English
        </button>
        <button
          onClick={() => onLanguageChange('es')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            currentLanguage === 'es'
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'text-white text-opacity-70 hover:text-opacity-100'
          }`}
        >
          Español
        </button>
      </div>
      
      <p className="text-xs text-white text-opacity-60 mt-2">
        {currentLanguage === 'es' 
          ? 'Guías legales y scripts en español'
          : 'Legal guides and scripts in English'
        }
      </p>
    </div>
  );
}
