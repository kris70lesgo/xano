import { 
  RFQ, 
  Proposal, 
  Analytics, 
  User, 
  PricingRule,
  ApiResponse,
  PaginatedResponse 
} from '@/types';

const XANO_BASE_URL = process.env.XANO_BASE_URL || '';
const XANO_API_KEY = process.env.XANO_API_KEY || '';

class XanoClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = XANO_BASE_URL;
    this.apiKey = XANO_API_KEY;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Unknown error' }));
        return {
          success: false,
          error: error.message || `HTTP ${response.status}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
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
