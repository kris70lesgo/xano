import { AIParseRequest, AIParseResponse, AIProposalRequest, ParsedRFQ, ProposalContent } from '@/types';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet:free';

interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class OpenRouterClient {
  private apiKey: string;
  private model: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = OPENROUTER_API_KEY;
    this.model = OPENROUTER_MODEL;
  }

  private async complete(messages: OpenRouterMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw error;
    }
  }

  async parseRFQEmail(request: AIParseRequest): Promise<AIParseResponse> {
    const systemPrompt = `You are an expert RFQ (Request for Quote) analyzer for contractors. 
Your job is to extract structured information from customer emails requesting quotes for construction/contracting work.

Extract the following information in JSON format:
- client_name: Full name of the client
- client_email: Email address
- client_phone: Phone number if available
- project_type: Type of work (e.g., "plumbing", "electrical", "roofing", "renovation")
- scope_of_work: Detailed description of what needs to be done
- location: Project location/address
- timeline: When they need the work done
- budget_range: If they mention a budget, extract min/max/currency
- materials_needed: Array of materials mentioned
- special_requirements: Any special conditions or requirements
- deadline: When they need the quote by

Also provide:
- confidence: A score from 0-100 indicating how confident you are in the extraction
- reasoning: Brief explanation of your confidence level

Return only valid JSON, no markdown formatting.`;

    const userPrompt = `Email Subject: ${request.email_subject || 'No subject'}

Email Body:
${request.email_body}

${request.user_context?.past_jobs ? `\nContext: This contractor has worked on similar projects: ${request.user_context.past_jobs.join(', ')}` : ''}

Please extract the RFQ information in JSON format.`;

    try {
      const response = await this.complete([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ]);

      // Parse the JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        parsed_data: {
          client_name: parsed.client_name || 'Unknown',
          client_email: parsed.client_email || '',
          client_phone: parsed.client_phone,
          project_type: parsed.project_type || 'General',
          scope_of_work: parsed.scope_of_work || request.email_body.substring(0, 500),
          location: parsed.location,
          timeline: parsed.timeline,
          budget_range: parsed.budget_range,
          materials_needed: parsed.materials_needed || [],
          special_requirements: parsed.special_requirements || [],
          deadline: parsed.deadline,
        },
        confidence: parsed.confidence || 75,
        raw_prompt: userPrompt,
        ai_reasoning: parsed.reasoning,
      };
    } catch (error) {
      console.error('Error parsing RFQ:', error);
      // Return a fallback response
      return {
        parsed_data: {
          client_name: 'Unknown',
          client_email: '',
          project_type: 'General',
          scope_of_work: request.email_body,
          budget_range: { currency: 'USD' },
        },
        confidence: 30,
        ai_reasoning: 'Failed to parse email, using fallback extraction',
      };
    }
  }

  async generateProposal(request: AIProposalRequest): Promise<ProposalContent> {
    const systemPrompt = `You are an expert proposal writer for contractors. Create professional, winning proposals that are:
- Clear and specific about scope of work
- Professionally formatted
- Include detailed pricing breakdowns
- Set clear expectations on timeline
- Include standard terms and conditions

Return the proposal in JSON format matching this structure:
{
  "title": "Proposal for [Project]",
  "client_info": { "name": "", "email": "", "phone": "" },
  "project_overview": "Brief overview paragraph",
  "scope_of_work": ["item 1", "item 2", ...],
  "timeline": {
    "estimated_duration": "X weeks",
    "start_date": "YYYY-MM-DD",
    "completion_date": "YYYY-MM-DD"
  },
  "pricing": {
    "line_items": [
      { "id": "1", "description": "", "quantity": 1, "unit": "job", "unit_price": 0, "total": 0 }
    ],
    "subtotal": 0,
    "tax": 0,
    "total": 0,
    "currency": "USD"
  },
  "terms_and_conditions": ["Payment: 50% deposit...", "Warranty: ...", ...],
  "valid_until": "YYYY-MM-DD",
  "notes": "Additional notes"
}`;

    const userPrompt = `Generate a proposal for this project:

Client: ${request.parsed_rfq.client_name}
Email: ${request.parsed_rfq.client_email}
Phone: ${request.parsed_rfq.client_phone || 'Not provided'}

Project Type: ${request.parsed_rfq.project_type}
Scope: ${request.parsed_rfq.scope_of_work}
Location: ${request.parsed_rfq.location || 'Not specified'}
Timeline: ${request.parsed_rfq.timeline || 'To be determined'}

Recommended Pricing: $${request.pricing_suggestion.recommended_price}
Price Range: $${request.pricing_suggestion.price_range.min} - $${request.pricing_suggestion.price_range.max}

Company: ${request.user_info.company_name}
Contact: ${request.user_info.contact_info}

Tone: ${request.template_preferences?.tone || 'professional'}

Create a complete proposal in JSON format.`;

    try {
      const response = await this.complete([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ]);

      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const proposal = JSON.parse(jsonMatch[0]);
      return proposal;
    } catch (error) {
      console.error('Error generating proposal:', error);
      // Return a basic fallback proposal
      return {
        title: `Proposal for ${request.parsed_rfq.project_type}`,
        client_info: {
          name: request.parsed_rfq.client_name,
          email: request.parsed_rfq.client_email,
          phone: request.parsed_rfq.client_phone,
        },
        project_overview: request.parsed_rfq.scope_of_work,
        scope_of_work: [request.parsed_rfq.scope_of_work],
        timeline: {
          estimated_duration: '2-3 weeks',
        },
        pricing: {
          line_items: [{
            id: '1',
            description: request.parsed_rfq.project_type,
            quantity: 1,
            unit: 'job',
            unit_price: request.pricing_suggestion.recommended_price,
            total: request.pricing_suggestion.recommended_price,
          }],
          subtotal: request.pricing_suggestion.recommended_price,
          total: request.pricing_suggestion.recommended_price,
          currency: 'USD',
        },
        terms_and_conditions: [
          'Payment: 50% deposit required to start, 50% upon completion',
          'Warranty: 1 year on labor, manufacturer warranty on materials',
          'Changes to scope may affect pricing and timeline',
        ],
      };
    }
  }
}

export const openRouterClient = new OpenRouterClient();
