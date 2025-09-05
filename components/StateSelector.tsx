'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { US_STATES, getStateFullName } from '@/lib/utils';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  variant?: 'dropdown';
}

export function StateSelector({ 
  selectedState, 
  onStateChange, 
  variant = 'dropdown' 
}: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = US_STATES.filter(state =>
    getStateFullName(state).toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (state: string) => {
    onStateChange(state);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass-card p-4 flex items-center justify-between hover:bg-opacity-15 transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-cyan-300" />
          <div className="text-left">
            <div className="font-medium text-white">
              {getStateFullName(selectedState)}
            </div>
            <div className="text-sm text-white text-opacity-60">
              Selected state for legal guidance
            </div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-white text-opacity-60 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card backdrop-blur-strong z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-white border-opacity-20">
            <input
              type="text"
              placeholder="Search states..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredStates.map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className={`w-full text-left px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-all duration-200 ${
                  selectedState === state ? 'bg-cyan-500 bg-opacity-20 text-cyan-300' : 'text-white'
                }`}
              >
                <div className="font-medium">{getStateFullName(state)}</div>
                <div className="text-sm text-white text-opacity-60">{state}</div>
              </button>
            ))}
          </div>
          
          {filteredStates.length === 0 && (
            <div className="p-4 text-center text-white text-opacity-60">
              No states found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
