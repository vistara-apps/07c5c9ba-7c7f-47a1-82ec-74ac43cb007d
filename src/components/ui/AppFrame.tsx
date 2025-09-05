'use client';

import { ArrowLeft } from 'lucide-react';
import { AppFrameProps } from '@/types';
import { cn } from '@/utils/helpers';

export function AppFrame({ 
  children, 
  title, 
  showBack = false, 
  onBack 
}: AppFrameProps) {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-base"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-text-primary" />
                </button>
              )}
              {title && (
                <h1 className="text-xl font-semibold text-text-primary">
                  {title}
                </h1>
              )}
            </div>
            
            {/* App Logo/Brand */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RG</span>
              </div>
              <span className="text-sm font-medium text-text-secondary hidden sm:block">
                RightsGuard
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-gray-200 bg-surface">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center text-sm text-text-secondary">
            <p>Your rights, simplified. Know what to say, when to say it.</p>
            <div className="mt-2 space-x-4">
              <a 
                href="/privacy" 
                className="hover:text-primary transition-colors duration-base"
              >
                Privacy
              </a>
              <a 
                href="/terms" 
                className="hover:text-primary transition-colors duration-base"
              >
                Terms
              </a>
              <a 
                href="/support" 
                className="hover:text-primary transition-colors duration-base"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
