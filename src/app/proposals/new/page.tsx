'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Wand2, FileText, ArrowRight, Loader2 } from 'lucide-react';

import { Suspense } from 'react';

function NewProposalContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rfqId = searchParams.get('rfq');

    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleGenerate = () => {
        setLoading(true);
        // Mock AI generation delay
        setTimeout(() => {
            setLoading(false);
            // Navigate to editor with "generated" ID (mocking ID 999)
            router.push('/proposals/999/edit');
        }, 2500);
    };

    return (
        <div className="max-w-2xl mx-auto pt-12">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                    <Wand2 className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">
                    AI Proposal Generator
                </h1>
                <p className="text-xl text-gray-600">
                    Analyzing RFQ #{rfqId} to draft the perfect proposal.
                </p>
            </div>

            <Card className="p-8 relative overflow-hidden">
                {loading ? (
                    <div className="text-center py-12">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-dark mb-2">Analyzing Project Requirements...</h3>
                        <p className="text-gray-500">Extracting scope, timeline, and deliverables.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Template</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 border-2 border-primary bg-primary/5 rounded-xl text-left transition-all">
                                    <div className="font-bold text-primary mb-1">Standard Renovation</div>
                                    <div className="text-xs text-primary/70">Best for kitchen & bath remodels</div>
                                </button>
                                <button className="p-4 border border-gray-200 hover:border-primary/50 hover:bg-gray-50 rounded-xl text-left transition-all">
                                    <div className="font-bold text-dark mb-1">Commercial Build</div>
                                    <div className="text-xs text-gray-500">For office & retail spaces</div>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tone of Voice</label>
                            <select className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-primary">
                                <option>Professional & Corporate</option>
                                <option>Warm & Personable</option>
                                <option>Technical & Precise</option>
                            </select>
                        </div>

                        <Button variant="primary" className="w-full py-4 text-lg" onClick={handleGenerate}>
                            <Wand2 className="w-5 h-5 mr-2" />
                            Generate Proposal
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default function NewProposalPage() {
    return (
        <DashboardLayout>
            <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                <NewProposalContent />
            </Suspense>
        </DashboardLayout>
    );
}
