'use client';

import { Languages } from 'lucide-react';
import { LanguageToggleProps } from '@/types';
import { cn } from '@/utils/helpers';

export function LanguageToggle({
  variant = 'en_es',
  currentLanguage,
  onLanguageChange,
}: LanguageToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-text-secondary" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onLanguageChange('en')}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-base",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            currentLanguage === 'en'
              ? "bg-surface text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          English
        </button>
        <button
          onClick={() => onLanguageChange('es')}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-base",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            currentLanguage === 'es'
              ? "bg-surface text-text-primary shadow-sm"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          Español
        </button>
      </div>
    </div>
  );
}
