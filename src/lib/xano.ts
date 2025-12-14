import {
  RFQ,
  Proposal,
  Analytics,
  User,
  PricingRule,
  ApiResponse,
  PaginatedResponse
} from '@/types';

const XANO_BASE_URL = process.env.XANO_BASE_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:328840';
const XANO_AUTH_URL = process.env.XANO_AUTH_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:325502';
const XANO_API_KEY = process.env.XANO_API_KEY || '';

class XanoClient {
  private baseUrl: string;
  private authUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = XANO_BASE_URL;
    this.authUrl = XANO_AUTH_URL;
    this.apiKey = XANO_API_KEY;
  }

  setToken(token: string) {
    this.apiKey = token; // Temporary way to set user token for requests
  }

  async login(email: string, password: string): Promise<ApiResponse<{ authToken: string; user: User }>> {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }, this.authUrl);
  }

  async signup(data: Partial<User>): Promise<ApiResponse<{ authToken: string; user: User }>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }, this.authUrl);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    baseUrl?: string
  ): Promise<ApiResponse<T>> {
    try {
      const url = baseUrl ? `${baseUrl}${endpoint}` : `${this.baseUrl}${endpoint}`;
      console.log('🌐 Xano Request:', {
        url,
        method: options.method || 'GET',
        body: options.body
      });

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...options.headers,
        },
      });

      console.log('🌐 Xano Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        console.log('❌ Xano Error Response:', error);
        return {
          success: false,
          error: error.message || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      console.log('✅ Xano Success Response:', data);
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log('❌ Xano Network Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // RFQ Methods
  async getRFQs(page = 1, perPage = 20): Promise<ApiResponse<PaginatedResponse<RFQ>>> {
    return this.request(`/rfqs?page=${page}&per_page=${perPage}`);
  }

  async getRFQById(id: string): Promise<ApiResponse<RFQ>> {
    return this.request(`/rfqs/${id}`);
  }

  async createRFQ(data: Partial<RFQ>): Promise<ApiResponse<RFQ>> {
    return this.request('/rfqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateRFQStatus(id: string, status: RFQ['status']): Promise<ApiResponse<RFQ>> {
    return this.request(`/rfqs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async declineRFQ(id: string, reason?: string): Promise<ApiResponse<RFQ>> {
    return this.request(`/rfqs/${id}/decline`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Proposal Methods
  async getProposals(page = 1, perPage = 20): Promise<ApiResponse<PaginatedResponse<Proposal>>> {
    return this.request(`/proposals?page=${page}&per_page=${perPage}`);
  }

  async getProposalById(id: string): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}`);
  }

  async getProposalByRFQId(rfqId: string): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/rfq/${rfqId}`);
  }

  async createProposal(data: Partial<Proposal>): Promise<ApiResponse<Proposal>> {
    return this.request('/proposals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProposal(id: string, data: Partial<Proposal>): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async sendProposal(id: string): Promise<ApiResponse<{ sent: boolean; pdf_url: string }>> {
    return this.request(`/proposals/${id}/send`, {
      method: 'POST',
    });
  }

  async markProposalWon(id: string, revenue?: number): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}/won`, {
      method: 'POST',
      body: JSON.stringify({ revenue }),
    });
  }

  async markProposalLost(id: string): Promise<ApiResponse<Proposal>> {
    return this.request(`/proposals/${id}/lost`, {
      method: 'POST',
    });
  }

  // Analytics Methods
  async getAnalytics(): Promise<ApiResponse<Analytics>> {
    return this.request('/analytics');
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request('/analytics/dashboard');
  }

  // User Methods
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/user/me');
  }

  async updateUser(data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request('/user/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Pricing Rules Methods
  async getPricingRules(): Promise<ApiResponse<PricingRule[]>> {
    return this.request('/pricing-rules');
  }

  async createPricingRule(data: Partial<PricingRule>): Promise<ApiResponse<PricingRule>> {
    return this.request('/pricing-rules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePricingRule(id: string, data: Partial<PricingRule>): Promise<ApiResponse<PricingRule>> {
    return this.request(`/pricing-rules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deletePricingRule(id: string): Promise<ApiResponse<void>> {
    return this.request(`/pricing-rules/${id}`, {
      method: 'DELETE',
    });
  }
}

export const xanoClient = new XanoClient();
