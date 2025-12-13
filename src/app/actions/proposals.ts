'use server';

import { xanoClient } from '@/lib/xano';
import { Proposal } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getProposalsAction(page = 1, perPage = 20) {
    try {
        const result = await xanoClient.getProposals(page, perPage);
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to fetch proposals' };
    }
}

export async function getProposalByIdAction(id: string) {
    try {
        const result = await xanoClient.getProposalById(id);
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to fetch proposal' };
    }
}

export async function createProposalAction(data: Partial<Proposal>) {
    try {
        const result = await xanoClient.createProposal(data);
        revalidatePath('/proposals');
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to create proposal' };
    }
}

export async function updateProposalAction(id: string, data: Partial<Proposal>) {
    try {
        const result = await xanoClient.updateProposal(id, data);
        revalidatePath('/proposals');
        revalidatePath(`/proposals/${id}/edit`);
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to update proposal' };
    }
}

export async function sendProposalAction(id: string) {
    try {
        const result = await xanoClient.sendProposal(id);
        revalidatePath('/proposals');
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to send proposal' };
    }
}

export async function markProposalWonAction(id: string) {
    try {
        const result = await xanoClient.markProposalWon(id);
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to mark proposal as won' };
    }
}

export async function markProposalLostAction(id: string) {
    try {
        const result = await xanoClient.markProposalLost(id);
        revalidatePath('/proposals');
        revalidatePath('/dashboard');
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to mark proposal as lost' };
    }
}
