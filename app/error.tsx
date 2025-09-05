'use client';

import { Shield, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex items-center justify-center w-20 h-20 bg-red-500 bg-opacity-20 rounded-2xl mx-auto">
          <Shield className="w-10 h-10 text-red-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Something went wrong!
          </h2>
          <p className="text-white text-opacity-80">
            We encountered an error while loading RightsGuard. This might be a temporary issue.
          </p>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Try again</span>
          </button>
          
          <p className="text-sm text-white text-opacity-60">
            If the problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
