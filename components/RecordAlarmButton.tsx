'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, AlertTriangle, MapPin } from 'lucide-react';
import { getCurrentLocation } from '@/lib/utils';

interface RecordAlarmButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  variant?: 'active' | 'inactive';
}

export function RecordAlarmButton({ 
  isRecording, 
  onToggleRecording, 
  variant = 'inactive' 
}: RecordAlarmButtonProps) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleToggleRecording = async () => {
    if (!isRecording) {
      // Get location before starting recording
      try {
        const position = await getCurrentLocation();
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error('Failed to get location:', error);
      }
    }
    
    onToggleRecording();
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Main Record Button */}
      <div className="relative">
        <button
          onClick={handleToggleRecording}
          className={`relative w-24 h-24 rounded-full font-bold text-lg transition-all duration-200 shadow-2xl ${
            isRecording
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse-slow'
              : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 hover:scale-105'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8 mx-auto" />
          ) : (
            <Mic className="w-8 h-8 mx-auto" />
          )}
          
          {isRecording && (
            <div className="absolute -inset-2 rounded-full border-4 border-red-400 animate-ping opacity-75"></div>
          )}
        </button>
        
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-white">
            {isRecording ? 'Stop Recording' : 'Record & Alert'}
          </span>
        </div>
      </div>

      {/* Recording Status */}
      {isRecording && (
        <div className="glass-card p-4 space-y-3 fade-in">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full recording-pulse"></div>
            <span className="text-white font-mono text-lg">
              {formatDuration(recordingDuration)}
            </span>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-white text-opacity-80">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Recording active</span>
            </div>
            
            {location && (
              <div className="flex items-center justify-center space-x-2 text-white text-opacity-60">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">
                  Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </span>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-xs text-white text-opacity-60">
              Emergency contacts have been notified
            </p>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isRecording && (
        <div className="glass-card p-4">
          <h3 className="font-semibold text-white mb-2">Emergency Recording</h3>
          <ul className="text-sm text-white text-opacity-80 space-y-1">
            <li>• Starts audio recording immediately</li>
            <li>• Captures your current location</li>
            <li>• Alerts your emergency contacts</li>
            <li>• Tap again to stop recording</li>
          </ul>
        </div>
      )}
    </div>
  );
}
