'use client';

import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

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
    win_rate: number;
    revenue_this_month: number;
    time_saved_hours: number;
    proposals_sent: number;
  };
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Win Rate"
        value={`${stats.win_rate}%`}
        subtitle="Last 30 days"
        icon={<Target className="w-6 h-6" />}
        color="primary"
        trend={{ value: 5.2, isPositive: true }}
      />
      
      <MetricCard
        title="Revenue This Month"
        value={`$${stats.revenue_this_month.toLocaleString()}`}
        subtitle="Proposals won"
        icon={<DollarSign className="w-6 h-6" />}
        color="green"
        trend={{ value: 12.5, isPositive: true }}
      />
      
      <MetricCard
        title="Time Saved"
        value={`${stats.time_saved_hours}h`}
        subtitle="This week"
        icon={<Clock className="w-6 h-6" />}
        color="blue"
      />
      
      <MetricCard
        title="Proposals Sent"
        value={stats.proposals_sent}
        subtitle="This month"
        icon={<TrendingUp className="w-6 h-6" />}
        color="orange"
        trend={{ value: 8.1, isPositive: true }}
      />
    </div>
  );
};

export default DashboardMetrics;
