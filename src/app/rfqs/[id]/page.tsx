'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { ArrowLeft, Clock, Calendar, MapPin, Download, ChevronRight, File, MoreHorizontal, CheckCircle } from 'lucide-react';

export default function RFQDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    // Mock data
    const rfq = {
        id: id,
        client: {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            company: 'Private Homeowner',
            phone: '+1 (555) 123-4567'
        },
        project: {
            title: 'Luxury Kitchen Renovation',
            address: '123 Maple Avenue, Beverly Hills, CA',
            budget: '$25,000 - $35,000',
            timeline: 'Start within 1 month',
            description: 'We are looking for a complete kitchen remodel including demolition of existing cabinets, installation of new custom islands, quartz countertops, and high-end appliances. The floor needs to be retiled as well.'
        },
        ai_analysis: {
            summary: 'High-value residential renovation project. Client appears improved and ready to start. Budget aligns well with scope if mid-range materials are selected.',
            score: 92,
            priority: 'High',
            risks: ['Timeline is tight', 'Plumbing relocation may be needed']
        },
        files: [
            { name: 'kitchen_floorplan.pdf', size: '2.4 MB' },
            { name: 'inspiration_images.zip', size: '15.1 MB' }
        ],
        timeline_events: [
            { date: 'Dec 10, 2024 09:30 AM', event: 'RFQ Received via Email' },
            { date: 'Dec 10, 2024 09:31 AM', event: 'AI Parsed & Analyzed' },
            { date: 'Dec 10, 2024 09:35 AM', event: 'Added to Pipeline' }
        ]
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-gray-500 hover:text-primary mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </button>

                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-dark mb-2">{rfq.project.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span className="flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border border-gray-200">
                                <MapPin className="w-3 h-3" />
                                {rfq.project.address}
                            </span>
                            <span className="flex items-center gap-1 text-sm bg-white px-3 py-1 rounded-full border border-gray-200">
                                <Clock className="w-3 h-3" />
                                {rfq.project.timeline}
                            </span>
                        </div>
                    </div>
                    <Button variant="primary" onClick={() => router.push(`/proposals/new?rfq=${rfq.id}`)}>
                        Generate Proposal
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-dark mb-4">Project Description</h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {rfq.project.description}
                        </p>

                        <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Estimated Budget</div>
                                <div className="text-xl font-bold text-dark">{rfq.project.budget}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">Project Type</div>
                                <div className="text-xl font-bold text-dark">Residential Renovation</div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500"></div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-dark mb-2">AI Analysis</h3>
                                <p className="text-gray-600 mb-4">{rfq.ai_analysis.summary}</p>

                                <div className="bg-red-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-bold text-red-800 mb-2">Potential Risks Detected</h4>
                                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                                        {rfq.ai_analysis.risks.map(risk => (
                                            <li key={risk}>{risk}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-lg font-bold text-dark mb-4">Attachments</h3>
                        <div className="space-y-3">
                            {rfq.files.map(file => (
                                <div key={file.name} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                            <File className="w-5 h-5 text-gray-500" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-dark">{file.name}</div>
                                            <div className="text-xs text-gray-500">{file.size}</div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Client Card */}
                    <Card className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Client Details</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                {rfq.client.name.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-dark">{rfq.client.name}</div>
                                <div className="text-sm text-gray-500">{rfq.client.company}</div>
                            </div>
                        </div>

                        <div className="space-y-3 pb-6 border-b border-gray-100">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Email</span>
                                <a href={`mailto:${rfq.client.email}`} className="text-primary hover:underline">{rfq.client.email}</a>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Phone</span>
                                <span className="text-dark">{rfq.client.phone}</span>
                            </div>
                        </div>
                        <div className="pt-4 text-center">
                            <button className="text-sm font-medium text-gray-500 hover:text-dark">View CRM Profile</button>
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card className="p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Activity Timeline</h3>
                        <div className="relative pl-4 space-y-6 border-l-2 border-gray-100">
                            {rfq.timeline_events.map((event, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white"></div>
                                    <div className="text-sm font-medium text-dark">{event.event}</div>
                                    <div className="text-xs text-gray-400 mt-1">{event.date}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
