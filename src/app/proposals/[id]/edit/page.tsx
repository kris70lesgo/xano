'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import DashboardLayout from '../../../../components/layout/DashboardLayout';
import Card from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input'; // Assuming you have an input component
import { Save, ArrowLeft, Plus, Trash, FileText, DollarSign, Eye, Send } from 'lucide-react';

export default function ProposalEditorPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [activeTab, setActiveTab] = useState('scope');

    // Mock initial data - in real app, fetch by id
    const [proposal, setProposal] = useState({
        id: id,
        client: 'Sarah Johnson',
        title: 'Kitchen Renovation',
        cover_letter: `Dear Sarah,\n\nThank you for the opportunity to submit this proposal for your kitchen renovation project. Based on our site visit and your requirements, we have outlined a comprehensive plan to transform your space.\n\nWe look forward to working with you.`,
        line_items: [
            { id: 1, description: 'Demolition and Removal', quantity: 1, unit_price: 1200 },
            { id: 2, description: 'Cabinetry Installation', quantity: 1, unit_price: 4500 },
            { id: 3, description: 'Countertop Fabrication', quantity: 1, unit_price: 3200 },
        ]
    });

    const handleLineItemChange = (id: number, field: string, value: any) => {
        setProposal(prev => ({
            ...prev,
            line_items: prev.line_items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addLineItem = () => {
        const newItem = {
            id: Date.now(),
            description: 'New Item',
            quantity: 1,
            unit_price: 0
        };
        setProposal(prev => ({
            ...prev,
            line_items: [...prev.line_items, newItem]
        }));
    };

    const removeLineItem = (id: number) => {
        setProposal(prev => ({
            ...prev,
            line_items: prev.line_items.filter(item => item.id !== id)
        }));
    };

    const calculateTotal = () => {
        return proposal.line_items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    };

    return (
        <DashboardLayout>
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-dark">Edit Proposal</h1>
                        <p className="text-gray-500">{proposal.client} - {proposal.title}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => window.open(`/proposals/${proposal.id}/view`, '_blank')}
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        View as Client
                    </Button>
                    <Button variant="primary">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar / Navigation */}
                <div className="lg:col-span-1">
                    <Card className="p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('scope')}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${activeTab === 'scope' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            <FileText className="w-5 h-5" />
                            Scope & Cover Letter
                        </button>
                        <button
                            onClick={() => setActiveTab('estimate')}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${activeTab === 'estimate' ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}
                        >
                            <DollarSign className="w-5 h-5" />
                            Estimate & Pricing
                        </button>
                    </Card>

                    <Card className="p-6 mt-6 bg-dark text-white">
                        <h3 className="text-lg font-bold mb-2">Total Estimate</h3>
                        <div className="text-3xl font-bold text-primary mb-1">
                            ${calculateTotal().toLocaleString()}
                        </div>
                        <p className="text-gray-400 text-sm">Includes all line items</p>

                        <Button className="w-full mt-6 bg-primary hover:bg-red-600 text-white border-none">
                            <Send className="w-4 h-4 mr-2" />
                            Send to Client
                        </Button>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2">
                    {activeTab === 'scope' && (
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-dark mb-4">Cover Letter</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Personalize the proposal introduction. Our AI has already drafted a version based on the RFQ.
                            </p>
                            <textarea
                                className="w-full h-96 p-4 border-2 border-gray-100 rounded-xl focus:border-primary focus:outline-none resize-none font-serif text-lg leading-relaxed text-gray-700"
                                value={proposal.cover_letter}
                                onChange={(e) => setProposal({ ...proposal, cover_letter: e.target.value })}
                            />
                        </Card>
                    )}

                    {activeTab === 'estimate' && (
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-dark">Line Items</h3>
                                <Button variant="outline" size="sm" onClick={addLineItem}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {proposal.line_items.map((item) => (
                                    <div key={item.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 bg-gray-50 rounded-lg group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                        <div className="flex-1 w-full">
                                            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Description</label>
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 p-0 font-medium text-dark placeholder-gray-400"
                                                placeholder="Item description"
                                            />
                                        </div>

                                        <div className="w-24">
                                            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Qty</label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleLineItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                                                className="w-full bg-transparent border-none focus:ring-0 p-0 font-medium text-dark"
                                            />
                                        </div>

                                        <div className="w-32">
                                            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Unit Price</label>
                                            <div className="relative">
                                                <span className="absolute left-0 top-0 text-gray-500">$</span>
                                                <input
                                                    type="number"
                                                    value={item.unit_price}
                                                    onChange={(e) => handleLineItemChange(item.id, 'unit_price', parseFloat(e.target.value))}
                                                    className="w-full bg-transparent border-none focus:ring-0 p-0 pl-3 font-medium text-dark"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-32 text-right">
                                            <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Total</label>
                                            <span className="font-bold text-dark">
                                                ${(item.quantity * item.unit_price).toLocaleString()}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => removeLineItem(item.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors self-end md:self-center"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <div className="text-right">
                                    <div className="text-gray-500 mb-1">Subtotal</div>
                                    <div className="text-2xl font-bold text-dark">${calculateTotal().toLocaleString()}</div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
