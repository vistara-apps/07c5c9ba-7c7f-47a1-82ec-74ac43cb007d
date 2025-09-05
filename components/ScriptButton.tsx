'use client';

import { useState } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';
import { copyToClipboard, speakText } from '@/lib/utils';

interface ScriptButtonProps {
  script: string;
  variant?: 'default' | 'spanish';
  onSpeak?: () => void;
  onCopy?: () => void;
}

export function ScriptButton({ 
  script, 
  variant = 'default', 
  onSpeak, 
  onCopy 
}: ScriptButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    setIsSpeaking(true);
    speakText(script, variant === 'spanish' ? 'es' : 'en');
    onSpeak?.();
    
    // Reset speaking state after estimated duration
    setTimeout(() => setIsSpeaking(false), script.length * 50);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(script);
      setIsCopied(true);
      onCopy?.();
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy script:', error);
    }
  };

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="text-white text-opacity-90 font-medium leading-relaxed">
        "{script}"
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isSpeaking
              ? 'bg-blue-500 bg-opacity-30 text-blue-300'
              : 'btn-secondary hover:bg-opacity-20'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
          <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
        </button>
        
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            isCopied
              ? 'bg-green-500 bg-opacity-30 text-green-300'
              : 'btn-secondary hover:bg-opacity-20'
          }`}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
        
        {variant === 'spanish' && (
          <span className="px-2 py-1 bg-orange-500 bg-opacity-20 text-orange-300 text-xs font-medium rounded">
            ES
          </span>
        )}
      </div>
    </div>
  );
}
