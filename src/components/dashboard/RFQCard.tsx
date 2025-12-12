'use client';

import React from 'react';
import { RFQ, Proposal } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Clock, Mail, MapPin, DollarSign, Calendar, ChevronRight } from 'lucide-react';

interface RFQCardProps {
  rfq: RFQ;
  proposal?: Proposal;
  onReview: (id: string) => void;
  onDecline: (id: string) => void;
  onSend?: (id: string) => void;
}

const RFQCard: React.FC<RFQCardProps> = ({
  rfq,
  proposal,
  onReview,
  onDecline,
  onSend,
}) => {
  const getStatusConfig = () => {
    switch (rfq.status) {
      case 'received':
        return { color: 'blue' as const, label: 'New', bgColor: 'bg-blue-50' };
      case 'parsing':
      case 'generating':
        return { color: 'orange' as const, label: 'AI Processing', bgColor: 'bg-orange-50' };
      case 'ready':
        return { color: 'green' as const, label: 'Ready to Send', bgColor: 'bg-green-50' };
      case 'sent':
        return { color: 'gray' as const, label: 'Sent', bgColor: 'bg-gray-50' };
      case 'won':
        return { color: 'green' as const, label: 'Won', bgColor: 'bg-green-100' };
      case 'lost':
        return { color: 'gray' as const, label: 'Lost', bgColor: 'bg-gray-100' };
      case 'declined':
        return { color: 'red' as const, label: 'Declined', bgColor: 'bg-red-50' };
      default:
        return { color: 'gray' as const, label: 'Unknown', bgColor: 'bg-gray-50' };
    }
  };

  const status = getStatusConfig();
  const parsedData = rfq.parsed_data;
  const confidence = rfq.ai_confidence || 0;

  const getConfidenceBadge = () => {
    if (confidence >= 80) return { variant: 'success' as const, label: 'High' };
    if (confidence >= 60) return { variant: 'warning' as const, label: 'Medium' };
    return { variant: 'error' as const, label: 'Low' };
  };

  const confidenceBadge = getConfidenceBadge();

  return (
    <Card statusColor={status.color} className="p-6 cursor-pointer group" hover>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
              {parsedData?.client_name || rfq.sender_name || 'Unknown Client'}
            </h3>
            <Badge variant={status.color === 'green' ? 'success' : status.color === 'orange' ? 'warning' : 'default'}>
              {status.label}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{rfq.sender_email}</span>
          </div>
        </div>
        
        {rfq.ai_confidence && (
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">AI Confidence</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{confidence}%</span>
              <Badge variant={confidenceBadge.variant} size="sm">
                {confidenceBadge.label}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Project Info */}
      {parsedData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-cream rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Project Type</div>
              <div className="font-semibold text-dark">{parsedData.project_type}</div>
            </div>
          </div>

          {parsedData.location && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Location</div>
                <div className="font-semibold text-dark">{parsedData.location}</div>
              </div>
            </div>
          )}

          {parsedData.timeline && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Timeline</div>
                <div className="font-semibold text-dark">{parsedData.timeline}</div>
              </div>
            </div>
          )}

          {parsedData.budget_range && (
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Budget Range</div>
                <div className="font-semibold text-dark">
                  {parsedData.budget_range.currency} {parsedData.budget_range.min?.toLocaleString()} - {parsedData.budget_range.max?.toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scope Preview */}
      {parsedData?.scope_of_work && (
        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Scope of Work</div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {parsedData.scope_of_work}
          </p>
        </div>
      )}

      {/* Timestamp */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Clock className="w-4 h-4" />
        <span>Received {new Date(rfq.created_at).toLocaleString()}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {rfq.status === 'ready' && onSend && (
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSend(rfq.id);
            }}
            className="flex-1"
          >
            Send Proposal
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        
        {(rfq.status === 'received' || rfq.status === 'ready' || rfq.status === 'parsed') && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onReview(rfq.id);
              }}
              className="flex-1"
            >
              Review Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDecline(rfq.id);
              }}
            >
              Decline
            </Button>
          </>
        )}

        {rfq.status === 'sent' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onReview(rfq.id);
            }}
            className="flex-1"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default RFQCard;
