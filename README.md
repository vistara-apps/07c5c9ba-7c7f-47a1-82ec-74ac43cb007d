# RightsGuard - Base Mini App

**Your rights, simplified. Know what to say, when to say it.**

RightsGuard is a production-ready Next.js Base Mini App that provides users with instant access to state-specific legal guidance, scenario-based scripts, and emergency recording tools to protect their rights during police interactions.

## 🚀 Features

### Core Features

1. **Concise Legal Snapshots**
   - Mobile-first, one-page guides for common scenarios (traffic stops, questioning)
   - State-specific legal information tailored to local laws
   - Available in English and Spanish

2. **Scenario-Based Scripts**
   - Pre-written, legally sound phrases for various situations
   - Context-aware scripts with text-to-speech functionality
   - Copy-to-clipboard functionality for quick access

3. **One-Tap Incident Recorder & Alert**
   - Emergency recording with location tracking
   - Automatic alerts to pre-selected emergency contacts
   - Secure audio storage and documentation

4. **Auto-Generated Shareable Cards**
   - AI-powered incident summaries
   - Easy sharing with trusted contacts or legal counsel
   - Timestamped and location-tagged documentation

### Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Supabase** for backend and database
- **Stripe** for secure payments
- **OpenAI** for content generation
- **Progressive Web App** (PWA) capabilities
- **Mobile-optimized** responsive design

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Payments**: Stripe
- **AI**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rightsguard-miniapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   - Create a new Supabase project
   - Run the SQL schema from `database/schema.sql` in your Supabase SQL editor
   - Enable Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── guides/        # Rights guides endpoints
│   │   ├── payment/       # Stripe payment endpoints
│   │   ├── scripts/       # Script generation endpoints
│   │   └── recording/     # Recording endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/                  # Library configurations
│   ├── supabase.ts       # Supabase client
│   ├── stripe.ts         # Stripe configuration
│   └── openai.ts         # OpenAI client
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   ├── constants.ts      # App constants
│   └── helpers.ts        # Helper functions
└── hooks/                # Custom React hooks
```

## 🎨 Design System

The app uses a custom design system built with Tailwind CSS:

### Color Tokens
- **Primary**: `hsl(210, 100%, 50%)` - Main brand color
- **Accent**: `hsl(130, 70%, 50%)` - Success/positive actions
- **Error**: `hsl(0, 80%, 50%)` - Error states
- **Surface**: `hsl(210, 30%, 100%)` - Card backgrounds
- **Background**: `hsl(210, 30%, 95%)` - Page background

### Spacing & Layout
- **Grid**: 12-column fluid grid with 16px gutters
- **Container**: max-width 768px (3xl) with responsive padding
- **Spacing**: 8px, 12px, 16px, 24px scale

### Typography
- **Display**: 3xl font-bold for main headings
- **Heading**: xl font-semibold for section headings
- **Body**: base leading-7 for body text
- **Caption**: sm text-secondary for supporting text

## 🔧 API Endpoints

### Rights Guides
- `GET /api/guides` - Fetch available guides
- `POST /api/guides` - Create new guide

### Payment
- `POST /api/payment/create-intent` - Create Stripe payment intent

### Scripts
- `GET /api/scripts/generate` - Fetch scenario scripts
- `POST /api/scripts/generate` - Generate new script

### Recording
- `POST /api/recording/start` - Start emergency recording
- `POST /api/recording/stop` - Stop recording and process

## 💳 Business Model

### Micro-transactions
- **Single Guide**: $0.99 per state-specific guide
- **Full Access**: $2.99 for unlimited access to all guides
- **Incident Recording**: $0.50 per emergency recording session

### Payment Flow
1. User selects a guide or feature
2. Stripe payment intent created
3. User completes payment
4. Content unlocked immediately
5. Purchase tracked in database

## 🔒 Security & Privacy

- **Row Level Security** (RLS) enabled on all user data
- **Encrypted audio storage** via Supabase Storage
- **HTTPS-only** communication
- **No tracking** of user location without explicit consent
- **GDPR compliant** data handling

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📱 PWA Features

- **Offline support** for critical features
- **Install prompt** for mobile devices
- **Push notifications** for emergency alerts
- **Background sync** for recordings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@rightsguard.app or create an issue in this repository.

## 🙏 Acknowledgments

- Built for the Base ecosystem
- Designed for Farcaster integration
- Inspired by civil rights advocacy organizations
- Powered by modern web technologies

---

**⚠️ Legal Disclaimer**: This app provides general legal information and should not be considered legal advice. Always consult with a qualified attorney for specific legal situations.
