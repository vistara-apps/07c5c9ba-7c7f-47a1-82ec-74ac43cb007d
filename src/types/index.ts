// Core data model types based on specifications

export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferredState: string;
  preferredLanguage: 'en' | 'es';
  registeredContacts: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RightsGuide {
  guideId: string;
  state: string;
  title: string;
  content: string; // Markdown/HTML content
  language: 'en' | 'es';
  scenario: string;
  price: number; // in cents
  createdAt: string;
  updatedAt: string;
}

export interface SessionLog {
  logId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  audioRecordingUrl?: string;
  sharedCardUrl?: string;
  incidentType?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ScenarioScript {
  id: string;
  scenario: string;
  language: 'en' | 'es';
  script: string;
  context: string;
  category: 'traffic_stop' | 'questioning' | 'search' | 'arrest' | 'general';
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface ShareableCard {
  id: string;
  sessionLogId: string;
  title: string;
  summary: string;
  timestamp: string;
  location?: string;
  cardUrl: string;
  createdAt: string;
}

// UI Component Props Types
export interface AppFrameProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export interface RightsCardProps {
  guide: RightsGuide;
  variant?: 'compact' | 'detailed';
  onPurchase?: (guideId: string) => void;
  isPurchased?: boolean;
}

export interface ScriptButtonProps {
  script: ScenarioScript;
  variant?: 'default' | 'spanish';
  onSpeak?: (script: string) => void;
  onCopy?: (script: string) => void;
}

export interface RecordAlarmButtonProps {
  variant?: 'active' | 'inactive';
  isRecording?: boolean;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
}

export interface ShareButtonProps {
  variant?: 'iconOnly' | 'withText';
  shareData: {
    title: string;
    text: string;
    url?: string;
  };
  onShare?: () => void;
}

export interface StateSelectorProps {
  variant?: 'dropdown';
  selectedState: string;
  onStateChange: (state: string) => void;
  states: Array<{ code: string; name: string }>;
}

export interface LanguageToggleProps {
  variant?: 'en_es';
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PurchaseResponse {
  success: boolean;
  clientSecret?: string;
  error?: string;
}

export interface GenerateScriptResponse {
  success: boolean;
  script?: string;
  error?: string;
}

// Utility Types
export type Language = 'en' | 'es';
export type Scenario = 'traffic_stop' | 'questioning' | 'search' | 'arrest' | 'general';
export type RecordingStatus = 'idle' | 'recording' | 'processing' | 'completed' | 'error';

// US States data
export interface USState {
  code: string;
  name: string;
  abbreviation: string;
}
