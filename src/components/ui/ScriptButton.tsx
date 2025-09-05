'use client';

import { useState } from 'react';
import { Volume2, Copy, Check } from 'lucide-react';
import { ScriptButtonProps } from '@/types';
import { cn, copyToClipboard, speakText } from '@/utils/helpers';

export function ScriptButton({
  script,
  variant = 'default',
  onSpeak,
  onCopy,
}: ScriptButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    setIsSpeaking(true);
    try {
      speakText(script.script, script.language);
      onSpeak?.(script.script);
    } catch (error) {
      console.error('Failed to speak text:', error);
    } finally {
      // Reset speaking state after a delay
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(script.script);
    if (success) {
      setIsCopied(true);
      onCopy?.(script.script);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isSpanish = variant === 'spanish' || script.language === 'es';

  return (
    <div className={cn(
      "bg-surface rounded-lg border border-gray-200 shadow-card p-4 transition-all duration-base hover:shadow-lg",
      isSpanish && "border-l-4 border-l-orange-400"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-text-primary">
            {script.scenario.replace('_', ' ').toUpperCase()}
          </h4>
          <p className="text-xs text-text-secondary mt-1">
            {script.context} • {script.language === 'en' ? 'English' : 'Español'}
          </p>
        </div>
        
        {isSpanish && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            ES
          </span>
        )}
      </div>

      {/* Script Content */}
      <div className="mb-4">
        <blockquote className={cn(
          "text-sm leading-relaxed p-3 rounded-md border-l-4",
          isSpanish 
            ? "bg-orange-50 border-l-orange-400 text-orange-900"
            : "bg-blue-50 border-l-primary text-blue-900"
        )}>
          "{script.script}"
        </blockquote>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {/* Speak Button */}
        <button
          onClick={handleSpeak}
          disabled={isSpeaking}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base",
            "border border-gray-300 hover:border-primary hover:bg-primary/5",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isSpeaking && "bg-primary/10 border-primary"
          )}
        >
          <Volume2 className={cn(
            "w-4 h-4",
            isSpeaking && "animate-pulse"
          )} />
          <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-base",
            "border border-gray-300 hover:border-accent hover:bg-accent/5",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
            isCopied && "bg-accent/10 border-accent text-accent"
          )}
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
      </div>

      {/* Usage Tip */}
      <div className="mt-3 p-2 bg-gray-50 rounded-md">
        <p className="text-xs text-text-secondary">
          💡 <strong>Tip:</strong> Practice saying this phrase calmly and clearly. 
          Remember to remain respectful during any interaction.
        </p>
      </div>
    </div>
  );
}
