'use client';

import { useState, useEffect } from 'react';
import { RFQ, ApiResponse, PaginatedResponse } from '@/types';
import { xanoClient } from '@/lib/xano';

export function useRFQs(page = 1, perPage = 20) {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRFQs();
  }, [page, perPage]);

  const fetchRFQs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await xanoClient.getRFQs(page, perPage);
      
      if (response.success && response.data) {
        setRfqs(response.data.data);
        setTotalPages(response.data.total_pages);
      } else {
        setError(response.error || 'Failed to fetch RFQs');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchRFQs();
  };

  const updateStatus = async (id: string, status: RFQ['status']) => {
    try {
      const response = await xanoClient.updateRFQStatus(id, status);
      if (response.success) {
        setRfqs(rfqs.map(rfq => rfq.id === id ? { ...rfq, status } : rfq));
      }
      return response;
    } catch (err) {
      console.error('Failed to update RFQ status:', err);
      return { success: false, error: 'Failed to update status' };
    }
  };

  const decline = async (id: string, reason?: string) => {
    try {
      const response = await xanoClient.declineRFQ(id, reason);
      if (response.success) {
        setRfqs(rfqs.map(rfq => rfq.id === id ? { ...rfq, status: 'declined' } : rfq));
      }
      return response;
    } catch (err) {
      console.error('Failed to decline RFQ:', err);
      return { success: false, error: 'Failed to decline RFQ' };
    }
  };

  return {
    rfqs,
    loading,
    error,
    totalPages,
    refresh,
    updateStatus,
    decline,
  };
}

export function useRFQ(id: string) {
  const [rfq, setRfq] = useState<RFQ | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchRFQ();
    }
  }, [id]);

  const fetchRFQ = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await xanoClient.getRFQById(id);
      
      if (response.success && response.data) {
        setRfq(response.data);
      } else {
        setError(response.error || 'Failed to fetch RFQ');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchRFQ();
  };

  return {
    rfq,
    loading,
    error,
    refresh,
  };
}
