'use client';

import React from 'react';
import { RFQ } from '../../types';
import { MoreHorizontal, FileText, Download, ExternalLink, Calculator } from 'lucide-react';

interface ActiveRFQsTableProps {
    rfqs: RFQ[];
    onGenerate: (id: string) => void;
    onDownload: (id: string) => void;
    onOpen: (id: string) => void;
}

const ActiveRFQsTable: React.FC<ActiveRFQsTableProps> = ({ rfqs, onGenerate, onDownload, onOpen }) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ready':
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Ready</span>;
            case 'parsing':
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Parsing</span>;
            case 'sent':
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Sent</span>;
            case 'won':
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Won</span>;
            default:
                return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 capitalize">{status}</span>;
        }
    };

    const getConfidenceColor = (score?: number) => {
        if (!score) return 'text-gray-400';
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-dark">Active RFQs</h3>
                <button className="text-sm font-medium text-primary hover:text-red-700 transition-colors">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Title</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Budget Est.</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rfqs.map((rfq) => (
                            <tr key={rfq.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                                            {rfq.parsed_data?.client_name.charAt(0) || '?'}
                                        </div>
                                        <span className="font-semibold text-dark">{rfq.parsed_data?.client_name || rfq.sender_name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {rfq.parsed_data?.project_type || rfq.email_subject}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-dark">
                                    {rfq.parsed_data?.budget_range?.min
                                        ? `$${rfq.parsed_data.budget_range.min.toLocaleString()} - $${rfq.parsed_data.budget_range.max?.toLocaleString()}`
                                        : 'Pending'}
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(rfq.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${rfq.ai_confidence && rfq.ai_confidence >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                        <span className={`text-sm font-bold ${getConfidenceColor(rfq.ai_confidence)}`}>
                                            {rfq.ai_confidence}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {rfq.parsed_data?.timeline || 'ASAP'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onOpen(rfq.id)}
                                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                                            title="Open Details"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        {rfq.status === 'received' || rfq.status === 'parsing' ? null : (
                                            <button
                                                onClick={() => onGenerate(rfq.id)}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Generate Proposal"
                                            >
                                                <Calculator className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onDownload(rfq.id)}
                                            className="p-1.5 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Download PDF"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {rfqs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No active RFQs found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveRFQsTable;
