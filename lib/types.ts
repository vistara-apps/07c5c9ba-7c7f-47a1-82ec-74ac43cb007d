// User types
export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferredState: string;
  preferredLanguage: 'en' | 'es';
  registeredContacts: string[];
}

// Rights Guide types
export interface RightsGuide {
  guideId: string;
  state: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  scenario: string;
  price: number;
}

// Session Log types
export interface SessionLog {
  logId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  audioRecordingUrl?: string;
  sharedCardUrl?: string;
  incidentType?: string;
  isActive: boolean;
}

// Script types
export interface ScenarioScript {
  id: string;
  scenario: string;
  language: 'en' | 'es';
  scripts: {
    situation: string;
    response: string;
    explanation: string;
  }[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface RightsCardProps {
  guide: RightsGuide;
  variant?: 'compact' | 'detailed';
  onPurchase?: (guideId: string) => void;
  isPurchased?: boolean;
}

export interface ScriptButtonProps {
  script: string;
  variant?: 'default' | 'spanish';
  onSpeak?: () => void;
  onCopy?: () => void;
}

export interface RecordAlarmButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  variant?: 'active' | 'inactive';
}

export interface ShareButtonProps {
  content: string;
  variant?: 'iconOnly' | 'withText';
  onShare?: () => void;
}

export interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  variant?: 'dropdown';
}

export interface LanguageToggleProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'en_es';
}

// Constants
export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const SCENARIOS = [
  'traffic-stop',
  'questioning',
  'search-request',
  'arrest',
  'home-visit',
  'workplace-interaction'
];
