# Tendr: Contractor Proposal Manager

A modern, AI-powered proposal management system for contractors. Streamline your RFQ (Request for Quote) workflow with intelligent email parsing, automated proposal generation, and comprehensive pipeline tracking.

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Email Parsing**: Automatically extract client details, project requirements, and budgets from RFQ emails using AI
- **Proposal Generation**: Generate professional, winning proposals with AI assistance
- **Confidence Scoring**: AI-powered confidence ratings for each RFQ

### 📊 Dashboard & Analytics
- **Real-time Metrics**: Track win rates, revenue, proposals sent, and time saved
- **Pipeline Visualization**: Interactive charts showing RFQ distribution and monthly performance
- **Active RFQs Table**: Manage all active requests with status tracking and quick actions

### 🔐 Authentication & Security
- **Secure Login/Signup**: User authentication with httpOnly cookies
- **Mock Mode**: Development mode for testing without backend dependencies
- **Protected Routes**: Secure dashboard and proposal management

### 💼 Proposal Management
- **Create RFQs**: Parse emails with AI or enter details manually
- **Track Status**: Monitor RFQs through the entire lifecycle (Received → Parsed → Pricing → Drafted → Sent → Won/Lost)
- **Generate Proposals**: AI-assisted proposal creation with customizable templates
- **Download PDFs**: Export proposals as professional PDF documents

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenRouter API (Claude 3.5 Sonnet)
- **Backend**: Xano (optional - works with mock mode)
- **Charts**: Recharts
- **Icons**: Lucide React
- **PDF Generation**: Built-in export functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API key (for AI features)
- Xano account (optional - mock mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd xano
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenRouter AI Configuration
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
   
   # Application URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Xano Configuration (optional - use mock mode without these)
   XANO_API_URL=your_xano_api_url
   XANO_API_KEY=your_xano_api_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Keys Setup

### OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in to your account
3. Navigate to the Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

### Xano Setup (Optional)

1. Create a [Xano](https://xano.com) account
2. Set up your workspace and API
3. Get your API URL and authentication key
4. Add them to your `.env.local` file

**Note**: The app works in mock mode without Xano configuration for development and testing.

## 📁 Project Structure

```
xano/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── actions/           # Server actions
│   │   │   ├── auth.ts
│   │   │   ├── dashboard.ts
│   │   │   ├── proposals.ts
│   │   │   └── settings.ts
│   │   ├── api/               # API routes
│   │   │   ├── generate-proposal/
│   │   │   └── parse-email/
│   │   ├── dashboard/         # Dashboard page
│   │   ├── proposals/         # Proposals management
│   │   ├── rfqs/              # RFQ management
│   │   │   ├── [id]/         # Individual RFQ view
│   │   │   └── new/          # Create new RFQ
│   │   └── settings/          # User settings
│   ├── components/
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility libraries
│   │   ├── openrouter.ts     # OpenRouter AI client
│   │   └── xano.ts           # Xano API client
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── docs/                      # Xano workspace documentation
├── .env.local                 # Environment variables
└── package.json
```

## 🎯 Usage

### Creating a New RFQ

1. **Click "New RFQ"** on the dashboard
2. **Choose input method:**
   - **AI Parse**: Paste RFQ email content and let AI extract details
   - **Manual Entry**: Fill in the form manually
3. **Review and submit** the parsed information
4. **Track progress** from the dashboard

### Managing RFQs

- **View Details**: Click on any RFQ to see full information
- **Generate Proposal**: Use AI to create a professional proposal
- **Update Status**: Track RFQs through the pipeline
- **Download PDF**: Export proposals for clients

### Dashboard Overview

- **Metrics Cards**: View key performance indicators
- **Pipeline Breakdown**: Pie chart showing RFQ distribution by status
- **Monthly Performance**: Bar chart tracking RFQs, proposals, and wins
- **Active RFQs Table**: Manage all active requests with quick actions

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Mock Mode

The application includes a comprehensive mock mode for development:

- Simulated authentication with token generation
- Mock RFQ and proposal data
- Realistic API delays (200-800ms)
- Full feature testing without backend

### Adding New Features

1. Create components in `src/components/`
2. Add server actions in `src/app/actions/`
3. Define TypeScript types in `src/types/`
4. Update API routes in `src/app/api/`

## 🎨 Customization

### Styling

The app uses Tailwind CSS for styling. Customize the design system in:
- `tailwind.config.ts` - Theme configuration
- `src/app/globals.css` - Global styles and CSS variables

### AI Prompts

Customize AI behavior by editing prompts in:
- `src/lib/openrouter.ts` - System prompts for parsing and generation

## 📝 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes (for AI) | Your OpenRouter API key |
| `OPENROUTER_MODEL` | No | AI model to use (default: claude-3.5-sonnet) |
| `NEXT_PUBLIC_APP_URL` | No | Application URL (default: localhost:3000) |
| `XANO_API_URL` | No | Xano API endpoint (optional with mock mode) |
| `XANO_API_KEY` | No | Xano authentication key (optional with mock mode) |

## 🐛 Troubleshooting

### OpenRouter API Errors

- Verify your API key is correct in `.env.local`
- Check your OpenRouter account has credits
- Ensure the model name is correct
- Restart the dev server after changing environment variables

### Build Errors

- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Mock Mode Issues

- Check browser console for detailed logs
- Verify cookies are enabled
- Clear browser cache and cookies

## 📄 License

This project is private and proprietary.

## 🤝 Support

For issues, questions, or feature requests, please contact the development team.

---

Built with ❤️ using Next.js and AI technology
