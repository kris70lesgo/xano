'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardMetrics from '../../components/dashboard/DashboardMetrics';
import PipelineBreakdown from '../../components/dashboard/PipelineBreakdown';
import MonthlyPerformance from '../../components/dashboard/MonthlyPerformance';
import ActiveRFQsTable from '../../components/dashboard/ActiveRFQsTable';
import Button from '../../components/ui/Button';
import { Plus, RefreshCw } from 'lucide-react';
import { RFQ } from '../../types';
import { getDashboardData, declineRFQAction, sendProposalAction } from '../actions/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [stats, setStats] = useState({
    rfqs_received: 0,
    ai_parsed: 0,
    proposals_sent: 0,
    win_rate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await getDashboardData();
      if (result.success && result.data) {
        setRfqs(result.data.recentRfqs);
        setStats(prev => ({
          ...prev,
          win_rate: result.data.stats.win_rate,
          revenue_this_month: result.data.stats.revenue_this_month,
          proposals_sent: result.data.stats.proposals_sent,
          // Map api stats to UI stats if names differ slightly or calculating derived
        }));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpen = (id: string) => {
    console.log('Open RFQ:', id);
    // Navigate to detail page
  };

  const handleGenerate = (id: string) => {
    console.log('Generate proposal for RFQ:', id);
    // Navigate to generate page
  };

  const handleDownload = (id: string) => {
    console.log('Download RFQ:', id);
    // Trigger download
  };

  const handleDecline = async (id: string) => {
    await declineRFQAction(id);
    // Refresh data
    window.location.reload();
  };

  const handleSend = async (id: string) => {
    await sendProposalAction(id);
    // Refresh data
    window.location.reload();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your RFQs and proposals in one place</p>
        </div>
        <Button 
          variant="primary" 
          className="hidden md:inline-flex"
          onClick={() => router.push('/rfqs/new')}
        >
          <Plus className="w-5 h-5 mr-2" />
          New RFQ
        </Button>
      </div>

      {/* Metrics */}
      <DashboardMetrics stats={stats} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PipelineBreakdown />
        <MonthlyPerformance />
      </div>

      {/* Active RFQs Table */}
      <ActiveRFQsTable
        rfqs={rfqs}
        onOpen={handleOpen}
        onGenerate={handleGenerate}
        onDownload={handleDownload}
      />

      {/* Mobile FAB */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50">
        <Plus className="w-6 h-6" />
      </button>
    </DashboardLayout>
  );
}
