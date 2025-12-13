'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'sonner';
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
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [stats, setStats] = useState({
    rfqs_received: 128,
    ai_parsed: 104,
    proposals_sent: 76,
    win_rate: 32,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const result = await getDashboardData();
      if (result.success && result.data) {
        setRfqs(result.data.recentRfqs);
        // In a real app, I'd map the real API stats here. 
        // For now, I'll keep the mocked stats that match the User's request to ensure the design matches the prompt.
        // But if the user wanted real data, I'd uncomment the mapping logic.
        /* 
        setStats(prev => ({
            ...prev,
            // map real data
        }));
        */
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const router = useRouter();

  const handleOpen = (id: string) => {
    // Navigate to RFQ details (mock)
    console.log('Open RFQ:', id);
    router.push(`/rfqs/${id}`);
  };

  const handleGenerate = (id: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Generating proposal for RFQ #${id}...`,
        success: () => {
          router.push(`/proposals/new?rfq=${id}`);
          return 'Proposal draft created!';
        },
        error: 'Failed to generate proposal'
      }
    );
  };

  const handleDownload = (id: string) => {
    toast.success(`Downloading files for RFQ #${id}`);
  };

  const handleNewRFQ = () => {
    // Navigate to a new RFQ creation page or open a modal
    // For now, let's assume we have a create page
    router.push('/rfqs/new');
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
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome back, John. Here's what's happening today.</p>
        </div>
        <Button
          variant="primary"
          className="hidden md:inline-flex shadow-lg shadow-primary/30"
          onClick={handleNewRFQ}
        >
          <Plus className="w-5 h-5 mr-2" />
          New RFQ
        </Button>
      </div>

      {/* Metrics */}
      <DashboardMetrics stats={stats} />

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 h-[400px]">
        <div className="lg:col-span-1 h-full">
          <PipelineBreakdown />
        </div>
        <div className="lg:col-span-2 h-full">
          <MonthlyPerformance />
        </div>
      </div>

      {/* Bottom Section: Active RFQs Table */}
      <div className="mb-8">
        <ActiveRFQsTable
          rfqs={rfqs}
          onOpen={handleOpen}
          onGenerate={handleGenerate}
          onDownload={handleDownload}
        />
      </div>

      {/* Mobile FAB */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50">
        <Plus className="w-6 h-6" />
      </button>
    </DashboardLayout>
  );
}
