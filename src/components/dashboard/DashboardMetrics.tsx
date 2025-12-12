'use client';

import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, DollarSign, Clock, Target, Sparkles, Send } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'green' | 'blue' | 'orange';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color,
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <Card variant="metric" className="p-6" hover={false}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-4 h-4 ${!trend.isPositive && 'rotate-180'}`} />
            <span>{trend.value}%</span>
          </div>
        )}
      </div>

      <div>
        <div className="text-3xl font-bold text-dark mb-1">{value}</div>
        <div className="text-sm font-semibold text-gray-500 mb-1">{title}</div>
        {subtitle && (
          <div className="text-xs text-gray-400">{subtitle}</div>
        )}
      </div>
    </Card>
  );
};

interface DashboardMetricsProps {
  stats: {
    rfqs_received: number;
    ai_parsed: number;
    proposals_sent: number;
    win_rate: number;
  };
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="RFQs Received"
        value={stats.rfqs_received}
        icon={<Clock className="w-5 h-5" />}
        color="blue"
        trend={{ value: 12, isPositive: true }}
      />

      <MetricCard
        title="AI-Parsed Successfully"
        value={stats.ai_parsed}
        icon={<Sparkles className="w-5 h-5" />}
        color="green"
        trend={{ value: 15, isPositive: true }}
      />

      <MetricCard
        title="Proposals Sent"
        value={stats.proposals_sent}
        icon={<Send className="w-5 h-5" />}
        color="orange"
        trend={{ value: 5, isPositive: false }}
      />

      <MetricCard
        title="Win Rate"
        value={`${stats.win_rate}%`}
        icon={<Target className="w-5 h-5" />}
        color="primary"
        trend={{ value: 2.1, isPositive: true }}
      />
    </div>
  );
};

export default DashboardMetrics;
