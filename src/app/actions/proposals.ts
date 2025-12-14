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
        user_id: 'mock-user-1',
        status: 'sent',
        won: null,
        draft_content: {
            title: 'Commercial Office Renovation Proposal',
            client_info: {
                name: 'Tech Corp',
                email: 'contact@techcorp.com',
            },
            project_overview: 'Full proposal for office renovation including materials and labor',
            scope_of_work: ['Demolition', 'Framing', 'Electrical', 'Finishing'],
            timeline: {
                estimated_duration: '8 weeks',
            },
            pricing: {
                line_items: [],
                subtotal: 175000,
                total: 175000,
                currency: 'USD',
            },
            terms_and_conditions: [],
        },
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'mock-proposal-2',
        rfq_id: 'mock-rfq-2',
        user_id: 'mock-user-1',
        status: 'draft',
        won: null,
        draft_content: {
            title: 'Residential Construction Proposal',
            client_info: {
                name: 'John Smith',
                email: 'john@example.com',
            },
            project_overview: 'Comprehensive proposal for single-family home construction',
            scope_of_work: ['Foundation', 'Framing', 'Roofing', 'Interior'],
            timeline: {
                estimated_duration: '16 weeks',
            },
            pricing: {
                line_items: [],
                subtotal: 385000,
                total: 385000,
                currency: 'USD',
            },
            terms_and_conditions: [],
        },
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'mock-proposal-3',
        rfq_id: 'mock-rfq-3',
        user_id: 'mock-user-1',
        status: 'sent',
        won: true,
        draft_content: {
            title: 'Warehouse Expansion Proposal',
            client_info: {
                name: 'Logistics Inc',
                email: 'warehouse@logistics.com',
            },
            project_overview: 'Detailed proposal for warehouse expansion project',
            scope_of_work: ['Site Prep', 'Steel Structure', 'Loading Docks', 'HVAC'],
            timeline: {
                estimated_duration: '20 weeks',
            },
            pricing: {
                line_items: [],
                subtotal: 575000,
                total: 575000,
                currency: 'USD',
            },
            terms_and_conditions: [],
        },
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
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
            user_id: data.user_id || 'mock-user-1',
            status: data.status || 'draft',
            won: null,
            draft_content: data.draft_content || {
                title: 'New Proposal',
                client_info: {
                    name: 'New Client',
                    email: 'client@example.com',
                },
                project_overview: '',
                scope_of_work: [],
                timeline: {
                    estimated_duration: 'TBD',
                },
                pricing: {
                    line_items: [],
                    subtotal: 0,
                    total: 0,
                    currency: 'USD',
                },
                terms_and_conditions: [],
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
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
            mockProposals[proposalIndex].status = 'accepted';
            mockProposals[proposalIndex].won = true;
            mockProposals[proposalIndex].won_at = new Date().toISOString();
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
            mockProposals[proposalIndex].status = 'rejected';
            mockProposals[proposalIndex].won = false;
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
