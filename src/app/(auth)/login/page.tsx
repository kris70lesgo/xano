'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Zap, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Card from '../../../components/ui/Card';

import { loginAction } from '../../actions/auth';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await loginAction(formData.email, formData.password);

        setLoading(false);
        if (result.success) {
            toast.success('Welcome back!');
            router.push('/dashboard');
        } else {
            toast.error(result.error || 'Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center px-8 lg:px-20 py-12 bg-white">
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-8">
                        <Zap className="w-8 h-8 text-primary fill-primary" />
                        <span className="text-2xl font-serif font-bold text-dark">Tendr</span>
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-dark mb-3">Welcome Back</h1>
                    <p className="text-gray-600">Enter your details to access your workspace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="email"
                                required
                                className="pl-10 h-12"
                                placeholder="john@contractor.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="password"
                                required
                                className="pl-10 h-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full h-12 text-lg shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed" disabled={loading}>
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
                    </Button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center h-12 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-dark">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Google
                        </button>
                        <button type="button" className="flex items-center justify-center h-12 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-dark">
                            Apple
                        </button>
                    </div>

                    <p className="text-center text-gray-600 mt-8">
                        Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Create free account</Link>
                    </p>
                </form>
            </div>

            {/* Right Side - Visual */}
            <div className="hidden lg:flex flex-col bg-dark relative overflow-hidden text-white p-20 justify-between">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
                        <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-5xl font-serif font-bold leading-tight mb-6">
                        Win More Jobs,<br />With Less Work.
                    </h2>
                    <p className="text-xl text-gray-300 max-w-md leading-relaxed">
                        Join thousands of contractors using AI to automate RFQ responses and create winning proposals in minutes.
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-3xl font-bold mb-1">10x</div>
                        <div className="text-sm text-gray-400">Faster Proposals</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold mb-1">$50M+</div>
                        <div className="text-sm text-gray-400">Revenue Generated</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
