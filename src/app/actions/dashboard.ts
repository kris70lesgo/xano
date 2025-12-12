'use server';

import { xanoClient } from '@/lib/xano';
import { RFQ, DashboardStats } from '@/types';

export interface DashboardData {
    stats: DashboardStats;
    recentRfqs: RFQ[];
}

export async function getDashboardData(): Promise<{ success: boolean; data?: DashboardData; error?: string }> {
    try {
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
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return { success: false, error: 'Internal server error' };
    }
}

export async function sendProposalAction(id: string) {
    return await xanoClient.sendProposal(id);
}

export async function declineRFQAction(id: string) {
    return await xanoClient.declineRFQ(id);
}
