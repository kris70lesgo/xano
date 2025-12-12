# TenderFlow - AI-Powered Proposal Automation

**Win More Jobs in 5 Minutes**

TenderFlow is a complete full-stack application that helps contractors respond to RFQs (Requests for Quote) 10x faster using AI-powered automation. From email parsing to proposal generation, TenderFlow streamlines your entire bidding process.

## 🚀 Features

### ✨ Core Functionality
- **AI Email Parsing** - Forward RFQ emails and AI extracts job details automatically
- **Smart Pricing Engine** - Get AI-powered pricing suggestions based on your history
- **Instant Proposal Generation** - Create professional proposals in under 60 seconds
- **Pipeline Management** - Visual workflow from email → parsed → proposal → sent
- **Win Rate Tracking** - Real-time analytics on your proposal performance

### 🎨 Design System
- **Color Palette**: Cream (`#FDFCF6`), Primary Red (`#FF6B6B`), Dark (`#1A1A1A`)
- **Typography**: Manrope (body), Playfair Display (headings)
- **Animations**: Smooth transitions, parallax effects, fade-in animations
- **Responsive**: Mobile-first design with adaptive layouts

### 📱 Pages & Routes
- `/` - Landing page with hero, features, pricing, testimonials
- `/dashboard` - Main dashboard with RFQ pipeline and metrics
- `/proposals` - Manage all proposals with status tracking
- `/settings` - User settings, notifications, integrations

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

### Backend
- **API**: Xano (PostgreSQL)
- **AI**: OpenRouter API (Claude 3.5 Sonnet)
- **Storage**: Supabase
- **Email**: Gmail API
- **PDF**: PDF.co API

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**

Update `.env.local` with your API keys:

```env
OPENROUTER_API_KEY="sk-or-xxxxx"
XANO_API_KEY="your-xano-api-key"
XANO_BASE_URL="https://api.xano.com/api:YourInstanceName"
```

3. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to access the dashboard.

## 📦 Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components
│   └── dashboard/   # Dashboard components
├── lib/             # API integrations
├── hooks/           # Custom React hooks
└── types/           # TypeScript types
```

## 🗄️ Xano Backend Setup

Create these tables in Xano:
- `users` - User accounts
- `rfqs` - Request for quotes
- `proposals` - Generated proposals
- `pricing_rules` - Pricing engine rules

Refer to the full documentation for detailed schema.

## 📄 License

MIT License

---

Built with ❤️ for contractors.
