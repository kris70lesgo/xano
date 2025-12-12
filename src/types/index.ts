// Core Types
export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  pricing_rules?: PricingRule[];
  created_at: string;
}

// RFQ (Request for Quote) Types
export interface RFQ {
  id: string;
  user_id: string;
  email_subject: string;
  email_body: string;
  sender_email: string;
  sender_name?: string;
  parsed_data?: ParsedRFQ;
  status: RFQStatus;
  ai_confidence?: number;
  created_at: string;
  updated_at: string;
}

export type RFQStatus = 
  | 'received'      // Email just arrived
  | 'parsing'       // AI is processing
  | 'parsed'        // AI extraction complete
  | 'generating'    // Creating proposal
  | 'ready'         // Proposal ready for review
  | 'sent'          // Proposal sent to client
  | 'won'           // Job won
  | 'lost'          // Job lost
  | 'declined';     // User declined to quote

export interface ParsedRFQ {
  client_name: string;
  client_email: string;
  client_phone?: string;
  project_type: string;
  scope_of_work: string;
  location?: string;
  timeline?: string;
  budget_range?: {
    min?: number;
    max?: number;
    currency: string;
  };
  materials_needed?: string[];
  special_requirements?: string[];
  deadline?: string;
}

// Proposal Types
export interface Proposal {
  id: string;
  rfq_id: string;
  user_id: string;
  draft_content: ProposalContent;
  final_content?: ProposalContent;
  status: ProposalStatus;
  sent_at?: string;
  viewed_at?: string;
  won: boolean | null;
  won_at?: string;
  actual_revenue?: number;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
}

export type ProposalStatus = 
  | 'draft'
  | 'reviewing'
  | 'ready'
  | 'sent'
  | 'viewed'
  | 'accepted'
  | 'rejected';

export interface ProposalContent {
  title: string;
  client_info: {
    name: string;
    email: string;
    phone?: string;
  };
  project_overview: string;
  scope_of_work: string[];
  timeline: {
    start_date?: string;
    estimated_duration: string;
    completion_date?: string;
  };
  pricing: {
    line_items: LineItem[];
    subtotal: number;
    tax?: number;
    total: number;
    currency: string;
  };
  terms_and_conditions: string[];
  valid_until?: string;
  notes?: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total: number;
}

// Pricing Engine Types
export interface PricingRule {
  id: string;
  user_id: string;
  service_type: string;
  base_price: number;
  markup_percentage: number;
  min_price?: number;
  max_price?: number;
  unit: string;
  conditions?: PricingCondition[];
}

export interface PricingCondition {
  factor: string; // e.g., "location", "urgency", "complexity"
  multiplier: number;
}

export interface PricingSuggestion {
  recommended_price: number;
  price_range: {
    min: number;
    max: number;
  };
  confidence: number; // 0-100
  reasoning: string;
  comparable_jobs?: ComparableJob[];
}

export interface ComparableJob {
  id: string;
  project_type: string;
  quoted_price: number;
  won: boolean;
  date: string;
}

// Analytics Types
export interface Analytics {
  win_rate: {
    percentage: number;
    total_sent: number;
    total_won: number;
    total_lost: number;
  };
  revenue: {
    total: number;
    this_month: number;
    this_year: number;
    currency: string;
  };
  time_saved: {
    hours_per_week: number;
    hours_total: number;
  };
  response_time: {
    average_minutes: number;
    fastest_minutes: number;
  };
  rfq_stats: {
    total_received: number;
    total_processed: number;
    pending: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

// AI Integration Types
export interface AIParseRequest {
  email_body: string;
  email_subject?: string;
  user_context?: {
    past_jobs?: string[];
    pricing_rules?: PricingRule[];
  };
}

export interface AIParseResponse {
  parsed_data: ParsedRFQ;
  confidence: number;
  raw_prompt?: string;
  ai_reasoning?: string;
}

export interface AIProposalRequest {
  parsed_rfq: ParsedRFQ;
  pricing_suggestion: PricingSuggestion;
  user_info: {
    company_name: string;
    contact_info: string;
  };
  template_preferences?: {
    tone?: 'professional' | 'friendly' | 'formal';
    include_case_studies?: boolean;
  };
}

// Webhook Types
export interface GmailWebhookPayload {
  message: {
    data: string; // base64 encoded
    messageId: string;
    publishTime: string;
  };
  subscription: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  attachments?: EmailAttachment[];
}

export interface EmailAttachment {
  filename: string;
  mimeType: string;
  size: number;
  data?: string;
}

// Dashboard UI Types
export interface DashboardStats {
  rfqs_today: number;
  proposals_sent: number;
  win_rate: number;
  revenue_this_month: number;
}

export interface RFQCardProps {
  rfq: RFQ;
  proposal?: Proposal;
  onReview: (id: string) => void;
  onDecline: (id: string) => void;
  onSend: (id: string) => void;
}

// Settings Types
export interface UserSettings {
  notifications: {
    email_on_new_rfq: boolean;
    email_on_proposal_viewed: boolean;
    email_on_won: boolean;
  };
  proposal_defaults: {
    payment_terms: string;
    warranty_period: string;
    deposit_percentage: number;
  };
  integrations: {
    gmail_connected: boolean;
    calendar_connected: boolean;
  };
}
