'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Zap, Mail, Lock, Loader2, User, Building } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { signupAction } from '../../actions/auth';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1 = details, 2 = company
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        company: '',
        role: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Map form data to match Xano (name, email, password) - Removed company as per Xano schema
        const result = await signupAction({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            // company: formData.company // Not supported by backend yet
        });

        setLoading(false);
        if (result.success) {
            toast.success('Account created successfully!');
            router.push('/dashboard');
        } else {
            toast.error(result.error || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <Zap className="w-6 h-6 text-white text-fill-white" />
                    </div>
                </div>
                <h2 className="text-center text-3xl font-serif font-bold text-dark">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-gray-600">
                    Start automating your proposals today.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-10 shadow-xl rounded-2xl border border-gray-100">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            className="pl-10"
                                            placeholder="John Doe"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            type="email"
                                            className="pl-10"
                                            placeholder="john@example.com"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            type="password"
                                            className="pl-10"
                                            placeholder="Min. 8 characters"
                                            required
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <Button type="button" variant="primary" className="w-full" onClick={() => setStep(2)}>
                                    Next Step
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            className="pl-10"
                                            placeholder="Acme Construction Inc."
                                            required
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size (Employees)</label>
                                    <select className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                        <option>1-5 (Solo/Small Team)</option>
                                        <option>6-20 (Growing)</option>
                                        <option>21-50 (Mid-Sized)</option>
                                        <option>50+ (Enterprise)</option>
                                    </select>
                                </div>

                                <div className="flex gap-3">
                                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                                        Back
                                    </Button>
                                    <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
                                Sign in instead
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
