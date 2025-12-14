/**
 * 🎭 MOCK AUTHENTICATION MODE ACTIVE
 * 
 * This file is currently in MOCK MODE for UI testing.
 * All proposal requests use mock data instead of the Xano API.
 * 
 * To re-enable real API calls:
 * 1. Uncomment the "REAL API CODE" sections
 * 2. Remove or comment out the mock code sections
 */

'use server';

import { xanoClient } from '@/lib/xano';
import { Proposal } from '@/types';
import { revalidatePath } from 'next/cache';

// Mock proposals data
const mockProposals: Proposal[] = [
    {
        id: 'mock-proposal-1',
        rfq_id: 'mock-rfq-1',
        title: 'Commercial Office Renovation Proposal',
        status: 'sent',
        total_amount: 175000,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Full proposal for office renovation including materials and labor',
    },
    {
        id: 'mock-proposal-2',
        rfq_id: 'mock-rfq-2',
        title: 'Residential Construction Proposal',
        status: 'draft',
        total_amount: 385000,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Comprehensive proposal for single-family home construction',
    },
    {
        id: 'mock-proposal-3',
        rfq_id: 'mock-rfq-3',
        title: 'Warehouse Expansion Proposal',
        status: 'won',
        total_amount: 575000,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        content: 'Detailed proposal for warehouse expansion project',
    },
];

export async function getProposalsAction(page = 1, perPage = 20) {
    try {
        // 🎭 MOCK MODE: Return mock proposals
        console.log('🎭 Mock Get Proposals - Page:', page, 'PerPage:', perPage);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return {
            success: true,
            data: {
                data: mockProposals,
                page,
                perPage,
                totalItems: mockProposals.length,
                totalPages: Math.ceil(mockProposals.length / perPage)
            }
        };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.getProposals(page, perPage);
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to fetch proposals' };
    }
}

export async function getProposalByIdAction(id: string) {
    try {
        // 🎭 MOCK MODE: Return mock proposal
        console.log('🎭 Mock Get Proposal By ID:', id);
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const proposal = mockProposals.find(p => p.id === id) || mockProposals[0];
        return { success: true, data: proposal };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.getProposalById(id);
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to fetch proposal' };
    }
}

export async function createProposalAction(data: Partial<Proposal>) {
    try {
        // 🎭 MOCK MODE: Simulate creating proposal
        console.log('🎭 Mock Create Proposal:', data);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newProposal: Proposal = {
            id: `mock-proposal-${Date.now()}`,
            rfq_id: data.rfq_id || 'mock-rfq-new',
            title: data.title || 'New Proposal',
            status: data.status || 'draft',
            total_amount: data.total_amount || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            content: data.content || '',
        };
        
        mockProposals.push(newProposal);
        revalidatePath('/proposals');
        return { success: true, data: newProposal };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.createProposal(data);
        revalidatePath('/proposals');
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to create proposal' };
    }
}

export async function updateProposalAction(id: string, data: Partial<Proposal>) {
    try {
        // 🎭 MOCK MODE: Simulate updating proposal
        console.log('🎭 Mock Update Proposal:', id, data);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const proposalIndex = mockProposals.findIndex(p => p.id === id);
        if (proposalIndex !== -1) {
            mockProposals[proposalIndex] = {
                ...mockProposals[proposalIndex],
                ...data,
                updated_at: new Date().toISOString()
            };
        }
        
        revalidatePath('/proposals');
        revalidatePath(`/proposals/${id}/edit`);
        return { success: true, data: mockProposals[proposalIndex] };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.updateProposal(id, data);
        revalidatePath('/proposals');
        revalidatePath(`/proposals/${id}/edit`);
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to update proposal' };
    }
}

export async function sendProposalAction(id: string) {
    try {
        // 🎭 MOCK MODE: Simulate sending proposal
        console.log('🎭 Mock Send Proposal:', id);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        revalidatePath('/proposals');
        return { success: true, message: 'Proposal sent successfully' };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.sendProposal(id);
        revalidatePath('/proposals');
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to send proposal' };
    }
}

export async function markProposalWonAction(id: string) {
    try {
        // 🎭 MOCK MODE: Simulate marking proposal as won
        console.log('🎭 Mock Mark Proposal Won:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const proposalIndex = mockProposals.findIndex(p => p.id === id);
        if (proposalIndex !== -1) {
            mockProposals[proposalIndex].status = 'won';
            mockProposals[proposalIndex].updated_at = new Date().toISOString();
        }
        
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return { success: true, message: 'Proposal marked as won' };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.markProposalWon(id);
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to mark proposal as won' };
    }
}

export async function markProposalLostAction(id: string) {
    try {
        // 🎭 MOCK MODE: Simulate marking proposal as lost
        console.log('🎭 Mock Mark Proposal Lost:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const proposalIndex = mockProposals.findIndex(p => p.id === id);
        if (proposalIndex !== -1) {
            mockProposals[proposalIndex].status = 'lost';
            mockProposals[proposalIndex].updated_at = new Date().toISOString();
        }
        
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return { success: true, message: 'Proposal marked as lost' };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.markProposalLost(id);
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to mark proposal as lost' };
    }
}
