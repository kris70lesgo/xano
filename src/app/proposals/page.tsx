'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Search, Filter, FileText, Download, Eye, Check, X } from 'lucide-react';

export default function ProposalsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [proposals, setProposals] = useState([
    {
      id: '1',
      client_name: 'Sarah Johnson',
      project_type: 'Kitchen Renovation',
      total: 29500,
      status: 'sent',
      sent_at: '2024-12-10',
      viewed_at: '2024-12-11',
    },
    {
      id: '2',
      client_name: 'Mike Brown',
      project_type: 'Plumbing Repair',
      total: 3200,
      status: 'draft',
      sent_at: null,
      viewed_at: null,
    },
    {
      id: '3',
      client_name: 'Jane Smith',
      project_type: 'HVAC Installation',
      total: 55000,
      status: 'accepted',
      sent_at: '2024-12-08',
      viewed_at: '2024-12-09',
    },
  ]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this proposal?')) {
      setProposals(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleMarkWon = (id: string) => {
    setProposals(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'accepted' } : p
    ));
    alert('Great job! Proposal marked as won.');
  };

  const handleMarkLost = (id: string) => {
    setProposals(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'rejected' } : p
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default">Draft</Badge>;
      case 'sent':
        return <Badge variant="info">Sent</Badge>;
      case 'viewed':
        return <Badge variant="warning">Viewed</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="error">Rejected</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const filteredProposals = proposals.filter(p => {
    const matchesSearch = p.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.project_type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Proposals</h1>
        <p className="text-gray-600">Track and manage all your sent proposals</p>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary transition-colors"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="viewed">Viewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button variant="outline">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id} className="p-6" hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-dark">{proposal.client_name}</h3>
                  {getStatusBadge(proposal.status)}
                </div>
                <p className="text-gray-600 mb-2">{proposal.project_type}</p>
                <div className="text-2xl font-bold text-primary">
                  ${proposal.total.toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Timeline */}
            {proposal.sent_at && (
              <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Sent: {new Date(proposal.sent_at).toLocaleDateString()}</span>
                </div>
                {proposal.viewed_at && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Viewed: {new Date(proposal.viewed_at).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            {proposal.status === 'draft' && (
              <div className="flex gap-3 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
                >
                  Continue Editing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(proposal.id)}
                >
                  Delete
                </Button>
              </div>
            )}

            {proposal.status === 'sent' && (
              <div className="flex gap-3 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleMarkWon(proposal.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Won
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMarkLost(proposal.id)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Mark as Lost
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProposals.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark mb-2">No proposals found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters</p>
          <Button variant="primary">Clear Filters</Button>
        </Card>
      )}
    </DashboardLayout>
  );
}
