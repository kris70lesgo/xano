/**
 * 🎭 MOCK AUTHENTICATION MODE ACTIVE
 * 
 * This file is currently in MOCK MODE for UI testing.
 * All authentication requests bypass the Xano API and use mock tokens.
 * 
 * To re-enable real authentication:
 * 1. Uncomment the "REAL API CODE" sections in loginAction and signupAction
 * 2. Remove or comment out the mock code sections
 */

'use server';

import { xanoClient } from '@/lib/xano';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
    try {
        // 🎭 MOCK MODE: Bypass API for UI testing
        console.log('🎭 Mock Login - Bypassing API for:', email);

        // Create a mock token
        const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store mock token in httpOnly cookie
        (await cookies()).set('auth_token', mockToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        // Simulate slight delay for realism
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('✅ Mock Login successful');
        return { success: true };

        /* REAL API CODE - Commented out for mock mode
        const result = await xanoClient.login(email, password);
        if (result.success && result.data) {
            // Store token in httpOnly cookie
            (await cookies()).set('auth_token', result.data.authToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });
            return { success: true };
        }
        return { success: false, error: result.error || 'Login failed' };
        */
    } catch (error) {
        return { success: false, error: 'Network error during login' };
    }
}

export async function signupAction(data: any) {
    try {
        // 🎭 MOCK MODE: Bypass API for UI testing
        console.log('🎭 Mock Signup - Bypassing API for:', data.email);
        console.log('🎭 Mock Signup - User data:', { name: data.name, email: data.email });

        // Create a mock token
        const mockToken = `mock_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Store mock token in httpOnly cookie
        (await cookies()).set('auth_token', mockToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        // Simulate slight delay for realism
        await new Promise(resolve => setTimeout(resolve, 800));

        console.log('✅ Mock Signup successful - Account created for:', data.email);
        return { success: true };

        /* REAL API CODE - Commented out for mock mode
        console.log('🔵 Signup Action - Request Data:', data);
        const result = await xanoClient.signup(data);
        console.log('🔵 Signup Action - Xano Response:', result);

        if (result.success && result.data) {
            console.log('✅ Signup successful, setting auth token');
            (await cookies()).set('auth_token', result.data.authToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return { success: true };
        }
        console.log('❌ Signup failed:', result.error);
        return { success: false, error: result.error || 'Signup failed' };
        */
    } catch (error) {
        console.log('❌ Signup error:', error);
        return { success: false, error: 'Network error during signup' };
    }
}

export async function logoutAction() {
    (await cookies()).delete('auth_token');
    redirect('/login');
}
