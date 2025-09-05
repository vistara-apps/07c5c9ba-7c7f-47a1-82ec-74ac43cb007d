'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { StateSelectorProps } from '@/types';
import { cn } from '@/utils/helpers';

export function StateSelector({
  variant = 'dropdown',
  selectedState,
  onStateChange,
  states,
}: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedStateData = states.find(state => state.code === selectedState);
  
  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateCode: string) => {
    onStateChange(stateCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-3 bg-surface border border-gray-300 rounded-lg",
          "hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          "transition-colors duration-base",
          isOpen && "border-primary ring-2 ring-primary ring-offset-2"
        )}
      >
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-text-secondary" />
          <div className="text-left">
            <p className="text-sm font-medium text-text-primary">
              {selectedStateData?.name || 'Select State'}
            </p>
            <p className="text-xs text-text-secondary">
              {selectedStateData ? `${selectedStateData.code} - Legal jurisdiction` : 'Choose your state for accurate legal info'}
            </p>
          </div>
        </div>
        <ChevronDown className={cn(
          "w-5 h-5 text-text-secondary transition-transform duration-base",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-surface border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full px-3 py-2 text-sm border border-gray-300 rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                )}
                autoFocus
              />
            </div>

            {/* States List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <button
                    key={state.code}
                    onClick={() => handleStateSelect(state.code)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50",
                      "transition-colors duration-base",
                      selectedState === state.code && "bg-primary/5 text-primary"
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium">{state.name}</p>
                      <p className="text-xs text-text-secondary">{state.code}</p>
                    </div>
                    {selectedState === state.code && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-text-secondary">
                  <p className="text-sm">No states found</p>
                  <p className="text-xs mt-1">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-text-secondary text-center">
                Legal information is specific to your state's laws and procedures
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
