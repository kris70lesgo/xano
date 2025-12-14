/**
 * 🎭 MOCK AUTHENTICATION MODE ACTIVE
 * 
 * This file is currently in MOCK MODE for UI testing.
 * All dashboard data requests use mock data instead of the Xano API.
 * 
 * To re-enable real API calls:
 * 1. Uncomment the "REAL API CODE" sections
 * 2. Remove or comment out the mock code sections
 */

'use server';

import { xanoClient } from '@/lib/xano';
import { RFQ, DashboardStats } from '@/types';

export interface DashboardData {
    stats: DashboardStats;
    recentRfqs: RFQ[];
}

export async function getDashboardData(): Promise<{ success: boolean; data?: DashboardData; error?: string }> {
    try {
        // 🎭 MOCK MODE: Return mock dashboard data
        console.log('🎭 Mock Dashboard - Returning mock data');
        
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

        const mockStats: DashboardStats = {
            rfqs_today: 3,
            proposals_sent: 12,
            win_rate: 67,
            revenue_this_month: 125000
        };

        const mockRFQs: RFQ[] = [
            {
                id: 'mock-rfq-1',
                user_id: 'mock-user-1',
                email_subject: 'RFQ: Commercial Office Renovation Project',
                email_body: 'We are looking for quotes on a complete office renovation...',
                sender_email: 'projects@abcproperties.com',
                sender_name: 'ABC Properties Ltd',
                status: 'ready',
                ai_confidence: 92,
                parsed_data: {
                    client_name: 'ABC Properties Ltd',
                    client_email: 'projects@abcproperties.com',
                    client_phone: '+1 (555) 123-4567',
                    project_type: 'Office Renovation',
                    scope_of_work: 'Full renovation of 5,000 sq ft office space including electrical, HVAC, and interior finishes',
                    location: 'Downtown District',
                    timeline: '3-4 months',
                    budget_range: {
                        min: 150000,
                        max: 200000,
                        currency: 'USD'
                    },
                    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                },
                created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 'mock-rfq-2',
                user_id: 'mock-user-1',
                email_subject: 'Quote Request: New Home Construction',
                email_body: 'We need a quote for building a single-family home...',
                sender_email: 'build@greenvalley.com',
                sender_name: 'Green Valley Developers',
                status: 'parsing',
                ai_confidence: 85,
                parsed_data: {
                    client_name: 'Green Valley Developers',
                    client_email: 'build@greenvalley.com',
                    client_phone: '+1 (555) 234-5678',
                    project_type: 'Residential Construction',
                    scope_of_work: '2,500 sq ft single-family home with 3 bedrooms, 2.5 bathrooms, modern design',
                    location: 'Suburban Area',
                    timeline: '6-8 months',
                    budget_range: {
                        min: 350000,
                        max: 425000,
                        currency: 'USD'
                    },
                    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                },
                created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 'mock-rfq-3',
                user_id: 'mock-user-1',
                email_subject: 'Warehouse Expansion - Quote Needed',
                email_body: 'Looking for contractors for warehouse expansion project...',
                sender_email: 'ops@logisticsolutions.com',
                sender_name: 'Logistics Solutions Inc',
                status: 'sent',
                ai_confidence: 88,
                parsed_data: {
                    client_name: 'Logistics Solutions Inc',
                    client_email: 'ops@logisticsolutions.com',
                    client_phone: '+1 (555) 345-6789',
                    project_type: 'Warehouse Expansion',
                    scope_of_work: '10,000 sq ft warehouse expansion with loading docks, storage systems, and climate control',
                    location: 'Industrial Park',
                    timeline: '4-5 months',
                    budget_range: {
                        min: 500000,
                        max: 650000,
                        currency: 'USD'
                    },
                    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
                },
                created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            },
            {
                id: 'mock-rfq-4',
                user_id: 'mock-user-1',
                email_subject: 'Retail Store Fitout Quote Request',
                email_body: 'We need pricing for a high-end retail store fitout...',
                sender_email: 'projects@fashionretail.com',
                sender_name: 'Fashion Retail Group',
                status: 'ready',
                ai_confidence: 95,
                parsed_data: {
                    client_name: 'Fashion Retail Group',
                    client_email: 'projects@fashionretail.com',
                    client_phone: '+1 (555) 456-7890',
                    project_type: 'Retail Fitout',
                    scope_of_work: 'High-end retail store fitout including custom fixtures, LED lighting, premium flooring, and branded finishes',
                    location: 'Premium Shopping Mall',
                    timeline: '2-3 months',
                    budget_range: {
                        min: 200000,
                        max: 275000,
                        currency: 'USD'
                    },
                    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                },
                created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
                updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            },
        ];

        return {
            success: true,
            data: {
                stats: mockStats,
                recentRfqs: mockRFQs
            }
        };

        /* REAL API CODE - Commented out for mock mode
        // Fetch stats and RFQs in parallel for performance
        const [statsResponse, rfqsResponse] = await Promise.all([
            xanoClient.getDashboardStats(),
            xanoClient.getRFQs(1, 4) // Get top 4 recent RFQs
        ]);

        if (!statsResponse.success && !rfqsResponse.success) {
            return { success: false, error: 'Failed to fetch dashboard data' };
        }

        return {
            success: true,
            data: {
                stats: statsResponse.data || {
                    rfqs_today: 0,
                    proposals_sent: 0,
                    win_rate: 0,
                    revenue_this_month: 0
                },
                recentRfqs: rfqsResponse.data?.data || []
            }
        };
        */
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return { success: false, error: 'Internal server error' };
    }
}

export async function sendProposalAction(id: string) {
    // 🎭 MOCK MODE: Simulate sending proposal
    console.log('🎭 Mock Send Proposal - Simulating for RFQ:', id);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Proposal sent successfully' };

    /* REAL API CODE - Commented out for mock mode
    return await xanoClient.sendProposal(id);
    */
}

export async function declineRFQAction(id: string) {
    // 🎭 MOCK MODE: Simulate declining RFQ
    console.log('🎭 Mock Decline RFQ - Simulating for RFQ:', id);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, message: 'RFQ declined successfully' };

    /* REAL API CODE - Commented out for mock mode
    return await xanoClient.declineRFQ(id);
    */
}
