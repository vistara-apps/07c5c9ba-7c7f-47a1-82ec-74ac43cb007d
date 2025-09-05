'use client';

import { useState } from 'react';
import { Mic, MicOff, AlertTriangle } from 'lucide-react';
import { RecordAlarmButtonProps } from '@/types';
import { cn } from '@/utils/helpers';

export function RecordAlarmButton({
  variant = 'inactive',
  isRecording = false,
  onStartRecording,
  onStopRecording,
}: RecordAlarmButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (isRecording) {
      onStopRecording?.();
    } else {
      onStartRecording?.();
    }
  };

  const isActive = variant === 'active' || isRecording;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Main Record Button */}
      <button
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={cn(
          "relative w-20 h-20 rounded-full border-4 transition-all duration-base",
          "focus:outline-none focus:ring-4 focus:ring-offset-2",
          isActive
            ? [
                "bg-error border-error text-white",
                "focus:ring-error/50",
                isRecording && "animate-pulse-red",
                isPressed && "scale-95",
              ]
            : [
                "bg-surface border-gray-300 text-text-primary hover:border-primary",
                "focus:ring-primary/50",
                isPressed && "scale-95",
              ]
        )}
        aria-label={isRecording ? "Stop recording" : "Start emergency recording"}
      >
        <div className="flex items-center justify-center">
          {isRecording ? (
            <MicOff className="w-8 h-8" />
          ) : (
            <Mic className="w-8 h-8" />
          )}
        </div>
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          </div>
        )}
      </button>

      {/* Status Text */}
      <div className="text-center">
        <p className={cn(
          "text-sm font-medium",
          isRecording ? "text-error" : "text-text-primary"
        )}>
          {isRecording ? "Recording..." : "Emergency Record"}
        </p>
        <p className="text-xs text-text-secondary mt-1">
          {isRecording 
            ? "Tap to stop & alert contacts" 
            : "Tap to start recording & alert"
          }
        </p>
      </div>

      {/* Warning Notice */}
      {!isRecording && (
        <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg max-w-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-yellow-800">
            <p className="font-medium">Emergency Feature</p>
            <p>Records audio and sends location to your emergency contacts.</p>
          </div>
        </div>
      )}

      {/* Recording Status */}
      {isRecording && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse" />
          <div className="text-xs text-red-800">
            <p className="font-medium">Recording Active</p>
            <p>Audio and location being captured</p>
          </div>
        </div>
      )}
    </div>
  );
}
