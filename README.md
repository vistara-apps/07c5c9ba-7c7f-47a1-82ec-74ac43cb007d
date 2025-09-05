# RightsGuard - Base Mini App

Your rights, simplified. Know what to say, when to say it.

## Overview

RightsGuard is a mobile-first Base Mini App that provides one-page, mobile-optimized guides on user rights during police interactions. It features scenario-based scripts, on-the-spot assistance tools, and is designed for Base Wallet MiniApps and Farcaster integration.

## Features

### 🛡️ Concise Legal Snapshots
- Mobile-first, one-page guides for common scenarios
- State-specific legal information
- Available in English and Spanish
- Easily digestible and actionable content

### 📝 Scenario-Based Scripts
- Pre-written, legally sound phrases
- Context-aware responses for different situations
- Audio playback and copy-to-clipboard functionality
- Multi-language support

### 🚨 One-Tap Incident Recorder & Alert
- Immediate audio recording with location capture
- Automatic emergency contact notifications
- Visual recording indicators
- Secure incident documentation

### 📤 Auto-Generated Shareable Cards
- AI-powered incident summaries
- Social media ready formats
- Easy sharing to Twitter and Farcaster
- Blockchain-verifiable reports (future feature)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API for content generation
- **Backend**: Supabase for data persistence
- **Payments**: Stripe for micro-transactions
- **Social**: Farcaster integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Base wallet for testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/rightsguard-base-miniapp.git
cd rightsguard-base-miniapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `OPENAI_API_KEY`: OpenAI API key for content generation
- `SUPABASE_URL` & `SUPABASE_ANON_KEY`: Supabase configuration
- `STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY`: Stripe payment keys

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

### Component Structure
```
components/
├── AppFrame.tsx          # Main app layout with navigation
├── RightsCard.tsx        # Legal guide display component
├── ScriptButton.tsx      # Interactive script component
├── RecordAlarmButton.tsx # Emergency recording functionality
├── ShareButton.tsx       # Social sharing component
├── StateSelector.tsx     # State selection dropdown
└── LanguageToggle.tsx    # Language switching component
```

### Data Models

#### User
- `userId`: Unique identifier
- `farcasterId`: Optional Farcaster ID
- `walletAddress`: Base wallet address
- `preferredState`: Selected state for legal guidance
- `preferredLanguage`: 'en' or 'es'
- `registeredContacts`: Emergency contact list

#### RightsGuide
- `guideId`: Unique guide identifier
- `state`: US state code
- `title`: Guide title
- `content`: Legal guidance content
- `language`: Content language
- `scenario`: Interaction type
- `price`: Guide cost in USD

#### SessionLog
- `logId`: Session identifier
- `userId`: Associated user
- `startTime`/`endTime`: Recording timestamps
- `location`: GPS coordinates and address
- `audioRecordingUrl`: Recording file URL
- `incidentType`: Type of interaction

## Business Model

RightsGuard operates on a micro-transaction model:

- **Pay-per-guide**: $0.50-$1.00 per state-specific guide
- **Full access unlock**: $2.99 for all guides
- **Premium features**: Advanced scenarios, multi-language support

## Deployment

### Base Testnet
1. Configure your Base testnet wallet
2. Deploy to Vercel or similar platform
3. Test MiniApp integration in Base wallet

### Production
1. Set up production environment variables
2. Configure Stripe for live payments
3. Deploy to production Base network

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Legal Disclaimer

RightsGuard provides general legal information and should not be considered legal advice. Users should consult with qualified attorneys for specific legal situations. The app's content is for educational purposes only.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@rightsguard.app or join our community on Farcaster.

---

Built with ❤️ for civil rights and digital empowerment.
