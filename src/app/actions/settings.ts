'use server';

import { xanoClient } from '@/lib/xano';
import { User } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getCurrentUserAction() {
    try {
        const result = await xanoClient.getCurrentUser();
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to fetch user' };
    }
}

export async function updateUserAction(data: Partial<User>) {
    try {
        const result = await xanoClient.updateUser(data);
        revalidatePath('/settings');
        revalidatePath('/dashboard'); // Profile usage
        return result;
    } catch (error) {
        return { success: false, error: 'Failed to update user' };
    }
}
