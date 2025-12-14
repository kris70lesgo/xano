/**
 * 🎭 MOCK AUTHENTICATION MODE ACTIVE
 * 
 * This file is currently in MOCK MODE for UI testing.
 * All user/settings requests use mock data instead of the Xano API.
 * 
 * To re-enable real API calls:
 * 1. Uncomment the "REAL API CODE" sections
 * 2. Remove or comment out the mock code sections
 */

'use server';

import { xanoClient } from '@/lib/xano';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';

// Mock user data
let mockUser: User = {
    id: 'mock-user-1',
    name: 'John Contractor',
    email: 'john@example.com',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
};

export async function getCurrentUserAction() {
    try {
        // 🎭 MOCK MODE: Return mock user
        console.log('🎭 Mock Get Current User');
        await new Promise(resolve => setTimeout(resolve, 200));
        
        return { success: true, data: mockUser };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.getCurrentUser();
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to fetch user' };
    }
}

export async function updateUserAction(data: Partial<User>) {
    try {
        // 🎭 MOCK MODE: Simulate updating user
        console.log('🎭 Mock Update User:', data);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        mockUser = {
            ...mockUser,
            ...data,
        };
        
        revalidatePath('/settings');
        revalidatePath('/dashboard'); // Profile usage
        return { success: true, data: mockUser, message: 'Profile updated successfully' };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.updateUser(data);
        revalidatePath('/settings');
        revalidatePath('/dashboard'); // Profile usage
        return result;
        */
    } catch (error) {
        return { success: false, error: 'Failed to update user' };
    }
}
