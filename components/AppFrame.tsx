'use client';

import { ReactNode } from 'react';
import { Shield, Menu, Settings2 } from 'lucide-react';

interface AppFrameProps {
  children: ReactNode;
  variant?: 'default';
}

export function AppFrame({ children, variant = 'default' }: AppFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-40 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-10 blur-lg"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-cyan-300 rounded-full opacity-10 blur-xl"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-48 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute bottom-60 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white text-shadow">RightsGuard</h1>
              <p className="text-sm text-white text-opacity-80">Your rights, simplified</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="nav-item">
              <Settings2 className="w-5 h-5" />
            </button>
            <button className="nav-item">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-6 mt-auto">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-white text-opacity-60">
            Know what to say, when to say it.
          </p>
        </div>
      </footer>
    </div>
  );
}
