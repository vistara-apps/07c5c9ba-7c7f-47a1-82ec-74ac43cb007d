'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppFrame } from '@/components/AppFrame';
import { RightsCard } from '@/components/RightsCard';
import { ScriptButton } from '@/components/ScriptButton';
import { RecordAlarmButton } from '@/components/RecordAlarmButton';
import { ShareButton } from '@/components/ShareButton';
import { StateSelector } from '@/components/StateSelector';
import { LanguageToggle } from '@/components/LanguageToggle';
import { RightsGuide, SessionLog, ScenarioScript, SCENARIOS } from '@/lib/types';
import { getScenarioTitle } from '@/lib/utils';
import { generateScenarioScript, generateRightsGuide, generateShareableCardContent } from '@/lib/openai';
import { Shield, BookOpen, Mic, Share2, TrendingUp, DollarSign } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [selectedState, setSelectedState] = useState('CA');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
  const [activeTab, setActiveTab] = useState<'guides' | 'scripts' | 'record' | 'sessions'>('guides');
  const [isRecording, setIsRecording] = useState(false);
  const [currentSession, setCurrentSession] = useState<SessionLog | null>(null);
  const [purchasedGuides, setPurchasedGuides] = useState<Set<string>>(new Set());
  const [scripts, setScripts] = useState<Record<string, string[]>>({});
  const [guides, setGuides] = useState<RightsGuide[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFrameReady();
    loadInitialData();
  }, [setFrameReady]);

  const loadInitialData = async () => {
    // Initialize with sample guides
    const sampleGuides: RightsGuide[] = SCENARIOS.map((scenario, index) => ({
      guideId: `${scenario}-${selectedState}-${selectedLanguage}`,
      state: selectedState,
      title: getScenarioTitle(scenario),
      content: '',
      language: selectedLanguage,
      scenario,
      price: 0.99,
    }));
    
    setGuides(sampleGuides);
  };

  const handlePurchaseGuide = async (guideId: string) => {
    setIsLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate guide content
      const guide = guides.find(g => g.guideId === guideId);
      if (guide) {
        const content = await generateRightsGuide(guide.scenario, guide.state, guide.language);
        
        // Update guide with content
        setGuides(prev => prev.map(g => 
          g.guideId === guideId ? { ...g, content } : g
        ));
        
        // Mark as purchased
        setPurchasedGuides(prev => new Set([...prev, guideId]));
      }
    } catch (error) {
      console.error('Failed to purchase guide:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRecording = () => {
    if (!isRecording) {
      // Start recording
      const newSession: SessionLog = {
        logId: `session-${Date.now()}`,
        userId: 'current-user',
        startTime: new Date(),
        location: undefined, // Will be set by RecordAlarmButton
        isActive: true,
      };
      setCurrentSession(newSession);
      setIsRecording(true);
    } else {
      // Stop recording
      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          endTime: new Date(),
          isActive: false,
        });
      }
      setIsRecording(false);
    }
  };

  const loadScripts = async (scenario: string) => {
    if (!scripts[scenario]) {
      setIsLoading(true);
      try {
        const generatedScripts = await generateScenarioScript(scenario, selectedState, selectedLanguage);
        setScripts(prev => ({
          ...prev,
          [scenario]: generatedScripts,
        }));
      } catch (error) {
        console.error('Failed to load scripts:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const generateShareableCard = async () => {
    if (!currentSession) return '';
    
    try {
      return await generateShareableCardContent({
        startTime: currentSession.startTime,
        location: currentSession.location,
        incidentType: currentSession.incidentType,
      });
    } catch (error) {
      console.error('Failed to generate shareable card:', error);
      return 'Incident documented via RightsGuard app. #RightsGuard #CivilRights';
    }
  };

  return (
    <AppFrame>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl mx-auto shadow-2xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white text-shadow mb-2">
              RightsGuard
            </h1>
            <p className="text-lg text-white text-opacity-80">
              Your rights, simplified. Know what to say, when to say it.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="metric-card text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="text-2xl font-bold text-white">$35,1008</div>
            <div className="text-sm text-white text-opacity-60">Recorded legal action cost</div>
          </div>
          <div className="metric-card text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="text-2xl font-bold text-white">$6,98,000</div>
            <div className="text-sm text-white text-opacity-60">Coverage to community impact</div>
          </div>
        </div>

        {/* State and Language Selection */}
        <div className="space-y-4">
          <StateSelector
            selectedState={selectedState}
            onStateChange={setSelectedState}
          />
          <LanguageToggle
            currentLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="glass-card p-2">
          <div className="grid grid-cols-4 gap-1">
            {[
              { id: 'guides', icon: BookOpen, label: 'Guides' },
              { id: 'scripts', icon: Mic, label: 'Scripts' },
              { id: 'record', icon: Shield, label: 'Record' },
              { id: 'sessions', icon: Share2, label: 'Share' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-white text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'guides' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Legal Rights Guides</h2>
              <p className="text-white text-opacity-80">
                State-specific legal guidance for common police interaction scenarios.
              </p>
              
              {isLoading && (
                <div className="glass-card p-8 text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-white text-opacity-80">Processing your purchase...</p>
                </div>
              )}
              
              <div className="grid gap-4">
                {guides.map((guide) => (
                  <RightsCard
                    key={guide.guideId}
                    guide={guide}
                    variant="compact"
                    onPurchase={handlePurchaseGuide}
                    isPurchased={purchasedGuides.has(guide.guideId)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Scenario Scripts</h2>
              <p className="text-white text-opacity-80">
                Pre-written, legally sound phrases for different situations.
              </p>
              
              <div className="grid gap-4">
                {SCENARIOS.map((scenario) => (
                  <div key={scenario} className="space-y-3">
                    <button
                      onClick={() => loadScripts(scenario)}
                      className="w-full glass-card p-4 text-left hover:bg-opacity-15 transition-all duration-200"
                    >
                      <h3 className="font-semibold text-white mb-1">
                        {getScenarioTitle(scenario)}
                      </h3>
                      <p className="text-sm text-white text-opacity-60">
                        {scripts[scenario] ? 'Tap to view scripts' : 'Tap to load scripts'}
                      </p>
                    </button>
                    
                    {scripts[scenario] && (
                      <div className="space-y-2 ml-4">
                        {scripts[scenario].map((script, index) => (
                          <ScriptButton
                            key={index}
                            script={script}
                            variant={selectedLanguage === 'es' ? 'spanish' : 'default'}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'record' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Record & Alert</h2>
                <p className="text-white text-opacity-80">
                  One-tap incident recording with automatic emergency contact alerts.
                </p>
              </div>
              
              <div className="flex justify-center">
                <RecordAlarmButton
                  isRecording={isRecording}
                  onToggleRecording={handleToggleRecording}
                  variant={isRecording ? 'active' : 'inactive'}
                />
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Share Incident</h2>
              <p className="text-white text-opacity-80">
                Generate and share incident reports with your network.
              </p>
              
              {currentSession ? (
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <h3 className="font-semibold text-white mb-3">Current Session</h3>
                    <div className="space-y-2 text-sm text-white text-opacity-80">
                      <div>Started: {currentSession.startTime.toLocaleString()}</div>
                      {currentSession.endTime && (
                        <div>Ended: {currentSession.endTime.toLocaleString()}</div>
                      )}
                      <div>Status: {currentSession.isActive ? 'Active' : 'Completed'}</div>
                    </div>
                  </div>
                  
                  <ShareButton
                    content={generateShareableCard().toString()}
                    variant="withText"
                  />
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <Shield className="w-12 h-12 text-white text-opacity-30 mx-auto mb-4" />
                  <p className="text-white text-opacity-60">
                    No active recording session. Start recording to generate shareable incident reports.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppFrame>
  );
}
