'use client';

import React from 'react';
import { RFQ } from '../../types';
import { Calendar, DollarSign, Clock, TrendingUp, Eye, X, Send } from 'lucide-react';
import Button from '../ui/Button';

interface RFQCardProps {
  rfq: RFQ;
  onReview: (id: string) => void;
  onDecline: (id: string) => void;
  onSend?: (id: string) => void;
}

const RFQCard: React.FC<RFQCardProps> = ({ rfq, onReview, onDecline, onSend }) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      received: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Received' },
      parsing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Parsing' },
      parsed: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Parsed' },
      generating: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Generating' },
      ready: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ready' },
      sent: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sent' },
      won: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Won' },
      lost: { bg: 'bg-red-100', text: 'text-red-700', label: 'Lost' },
      declined: { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Declined' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.received;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getConfidenceColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatBudget = (budgetRange?: { min?: number; max?: number; currency: string }) => {
    if (!budgetRange) return 'Budget not specified';
    const { min, max, currency } = budgetRange;
    
    if (min && max) {
      return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
    } else if (min) {
      return `From ${currency}${min.toLocaleString()}`;
    } else if (max) {
      return `Up to ${currency}${max.toLocaleString()}`;
    }
    return 'Budget not specified';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-dark mb-1">
            {rfq.parsed_data?.client_name || rfq.sender_name || 'Unknown Client'}
          </h3>
          <p className="text-sm text-gray-500">
            {rfq.parsed_data?.project_type || 'Project type not specified'}
          </p>
        </div>
        {getStatusBadge(rfq.status)}
      </div>

      {/* Details Grid */}
      <div className="space-y-3 mb-4">
        {/* Budget */}
        <div className="flex items-center text-sm">
          <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-600">
            {formatBudget(rfq.parsed_data?.budget_range)}
          </span>
        </div>

        {/* Timeline */}
        {rfq.parsed_data?.timeline && (
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-600">{rfq.parsed_data.timeline}</span>
          </div>
        )}

        {/* Deadline */}
        {rfq.parsed_data?.deadline && (
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-gray-600">
              Deadline: {new Date(rfq.parsed_data.deadline).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* AI Confidence */}
        {rfq.ai_confidence && (
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
            <span className={`font-medium ${getConfidenceColor(rfq.ai_confidence)}`}>
              {rfq.ai_confidence}% Confidence
            </span>
          </div>
        )}
      </div>

      {/* Scope Preview */}
      {rfq.parsed_data?.scope_of_work && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {rfq.parsed_data.scope_of_work}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onReview(rfq.id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Review
        </Button>

        {onSend && rfq.status === 'ready' && (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onSend(rfq.id)}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDecline(rfq.id)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default RFQCard;
