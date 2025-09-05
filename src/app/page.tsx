'use client';

import { useState, useEffect } from 'react';
import { Shield, BookOpen, Mic, Share2, MapPin, Languages } from 'lucide-react';
import { AppFrame } from '@/components/ui/AppFrame';
import { StateSelector } from '@/components/ui/StateSelector';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { RecordAlarmButton } from '@/components/ui/RecordAlarmButton';
import { US_STATES, SCENARIOS, APP_CONFIG } from '@/utils/constants';
import { Language } from '@/types';
import { storage } from '@/utils/helpers';

export default function HomePage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isRecording, setIsRecording] = useState(false);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedState = storage.get<string>('preferredState');
    const savedLanguage = storage.get<Language>('preferredLanguage');
    
    if (savedState) setSelectedState(savedState);
    if (savedLanguage) setCurrentLanguage(savedLanguage);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    if (selectedState) {
      storage.set('preferredState', selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    storage.set('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual recording logic
    console.log('Starting emergency recording...');
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Implement stop recording logic
    console.log('Stopping emergency recording...');
  };

  const selectedStateData = US_STATES.find(state => state.code === selectedState);

  return (
    <AppFrame title={APP_CONFIG.NAME}>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-display text-text-primary">{APP_CONFIG.NAME}</h1>
              <p className="text-caption">{APP_CONFIG.TAGLINE}</p>
            </div>
          </div>
          
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Get instant access to state-specific legal guidance, scenario-based scripts, 
            and emergency recording tools to protect your rights during police interactions.
          </p>
        </div>

        {/* User Preferences */}
        <div className="card p-6 space-y-4">
          <h2 className="text-heading text-text-primary flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Your Location & Language</span>
          </h2>
          
          <div className="space-y-4">
            <StateSelector
              selectedState={selectedState}
              onStateChange={setSelectedState}
              states={US_STATES}
            />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Preferred Language</span>
              <LanguageToggle
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
              />
            </div>
          </div>

          {selectedStateData && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                ✓ Legal information will be tailored for <strong>{selectedStateData.name}</strong> laws and procedures.
              </p>
            </div>
          )}
        </div>

        {/* Emergency Recording */}
        <div className="card p-6 text-center">
          <h2 className="text-heading text-text-primary mb-4">Emergency Recording</h2>
          <RecordAlarmButton
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        </div>

        {/* Scenarios Grid */}
        <div className="space-y-4">
          <h2 className="text-heading text-text-primary flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Know Your Rights</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                className="card p-4 hover:shadow-lg transition-shadow duration-base cursor-pointer group"
                onClick={() => {
                  // TODO: Navigate to scenario page
                  console.log(`Navigate to ${scenario.id}`);
                }}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{scenario.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors duration-base">
                      {scenario.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {scenario.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {selectedStateData ? `${selectedStateData.name} specific` : 'Select state for specific info'}
                  </span>
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-xs font-medium">Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="card p-4 text-center hover:shadow-lg transition-shadow duration-base group">
            <Mic className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-base" />
            <h3 className="font-medium text-text-primary">Quick Scripts</h3>
            <p className="text-xs text-text-secondary mt-1">Ready-to-use phrases</p>
          </button>
          
          <button className="card p-4 text-center hover:shadow-lg transition-shadow duration-base group">
            <Share2 className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-base" />
            <h3 className="font-medium text-text-primary">My Sessions</h3>
            <p className="text-xs text-text-secondary mt-1">View past recordings</p>
          </button>
        </div>

        {/* Getting Started */}
        {!selectedState && (
          <div className="card p-6 bg-yellow-50 border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2">👋 Welcome to RightsGuard!</h3>
            <p className="text-sm text-yellow-700 mb-3">
              To get started, please select your state above. This ensures you receive 
              accurate legal information specific to your jurisdiction.
            </p>
            <div className="text-xs text-yellow-600">
              <p>• State-specific legal guidance</p>
              <p>• Scenario-based scripts in English & Spanish</p>
              <p>• Emergency recording with location tracking</p>
            </div>
          </div>
        )}
      </div>
    </AppFrame>
  );
}
