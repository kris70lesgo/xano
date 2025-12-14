'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Check, X, Download, Printer, ExternalLink, MessageSquare } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import Card from '../../../../components/ui/Card';

export default function ClientProposalView() {
    const params = useParams();
    const id = params.id as string;
    const [status, setStatus] = useState<'pending' | 'accepted' | 'declined'>('pending');

    const proposal = {
        id: id,
        contractor: {
            name: 'Contractor Solutions Inc.',
            email: 'john@contractor.com',
            phone: '(555) 123-4567',
            logo: 'CS'
        },
        client: {
            name: 'Sarah Johnson',
            project: 'Luxury Kitchen Renovation'
        },
        total: 29500,
        valid_until: 'Dec 30, 2024',
        sections: [
            {
                title: 'Executive Summary',
                content: 'Thank you for the opportunity to submit this proposal for your kitchen renovation. We understand that you are looking for a complete modernization of your space, focusing on high-quality materials and improved workflow. Our team is committed to delivering this within 4 weeks.'
            },
            {
                title: 'Scope of Work',
                items: [
                    'Demolition of existing cabinets and flooring',
                    'Installation of custom white oak cabinetry',
                    'Quartz countertop fabrication and installation (Calacatta Gold)',
                    'High-end appliance installation (Wolf/Sub-Zero)',
                    'New hardwood flooring installation and finishing',
                    'Electrical and plumbing updates'
                ]
            }
        ],
        line_items: [
            { description: 'Demolition & Disposal', amount: 2500 },
            { description: 'Cabinetry & Hardware', amount: 12500 },
            { description: 'Countertops (Material & Labor)', amount: 6500 },
            { description: 'Flooring', amount: 3500 },
            { description: 'Labor & Installation', amount: 4500 }
        ]
    };

    const handleAccept = () => {
        setStatus('accepted');
        // Trigger confetti or API call here
    };

    const handleDecline = () => {
        setStatus('declined');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-dark text-white text-2xl font-bold flex items-center justify-center rounded-lg">
                            {proposal.contractor.logo}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-dark">{proposal.contractor.name}</h1>
                            <p className="text-gray-500">Proposal #{id.substring(0, 6)}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                </div>

                {/* Status Banner */}
                {status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-green-800 mb-2">Proposal Accepted!</h2>
                        <p className="text-green-700">Thank you, {proposal.client.name}. We will be in touch shortly to schedule the project kickoff.</p>
                    </div>
                )}

                {status === 'declined' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                        <h2 className="text-xl font-bold text-red-800 mb-2">Proposal Declined</h2>
                        <p className="text-red-700">We appreciate you reviewing our proposal.</p>
                    </div>
                )}

                {/* Main Document */}
                <Card className="p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    {/* Decorative top border */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-orange-400"></div>

                    <div className="flex justify-between items-end border-b border-gray-100 pb-8 mb-8">
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Prepared For</h2>
                            <div className="text-xl font-bold text-dark">{proposal.client.name}</div>
                            <div className="text-gray-600">{proposal.client.project}</div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Estimate</h2>
                            <div className="text-4xl font-serif font-bold text-primary">${proposal.total.toLocaleString()}</div>
                            <div className="text-sm text-gray-500 mt-1">Valid until {proposal.valid_until}</div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {proposal.sections.map((section, idx) => (
                            <div key={idx}>
                                <h3 className="text-lg font-bold text-dark mb-3 font-serif">{section.title}</h3>
                                {section.content && <p className="text-gray-600 leading-relaxed">{section.content}</p>}
                                {section.items && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {section.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-700">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        <div>
                            <h3 className="text-lg font-bold text-dark mb-4 font-serif">Pricing Breakdown</h3>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="space-y-3">
                                    {proposal.line_items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-gray-700 border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                                            <span>{item.description}</span>
                                            <span className="font-mono font-medium">${item.amount.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t-2 border-gray-200 flex justify-between items-center">
                                    <span className="font-bold text-dark text-lg">Total</span>
                                    <span className="font-bold text-dark text-xl">${proposal.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Action Bar */}
                {status === 'pending' && (
                    <div className="sticky bottom-6 z-50">
                        <div className="bg-dark text-white p-4 rounded-xl shadow-2xl flex items-center justify-between max-w-4xl mx-auto backdrop-blur-md bg-opacity-90">
                            <div className="hidden md:block">
                                <div className="font-bold">Ready to proceed?</div>
                                <div className="text-xs text-gray-400">Accepting will notify the contractor instantly.</div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button
                                    onClick={handleDecline}
                                    className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors font-medium"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="flex-1 md:flex-none px-8 py-3 rounded-lg bg-primary hover:bg-red-600 transition-colors font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    Accept Proposal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center text-gray-400 text-sm py-8">
                    Powered by Tendr
                </div>
            </div>
        </div>
    );
}
