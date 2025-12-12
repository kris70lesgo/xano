'use client';

import { useState, useEffect } from 'react';
import { Proposal } from '@/types';
import { xanoClient } from '@/lib/xano';

export function useProposals(page = 1, perPage = 20) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProposals();
  }, [page, perPage]);

  const fetchProposals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await xanoClient.getProposals(page, perPage);
      
      if (response.success && response.data) {
        setProposals(response.data.data);
        setTotalPages(response.data.total_pages);
      } else {
        setError(response.error || 'Failed to fetch proposals');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchProposals();
  };

  const sendProposal = async (id: string) => {
    try {
      const response = await xanoClient.sendProposal(id);
      if (response.success) {
        refresh();
      }
      return response;
    } catch (err) {
      console.error('Failed to send proposal:', err);
      return { success: false, error: 'Failed to send proposal' };
    }
  };

  const markWon = async (id: string, revenue?: number) => {
    try {
      const response = await xanoClient.markProposalWon(id, revenue);
      if (response.success) {
        refresh();
      }
      return response;
    } catch (err) {
      console.error('Failed to mark proposal as won:', err);
      return { success: false, error: 'Failed to update proposal' };
    }
  };

  const markLost = async (id: string) => {
    try {
      const response = await xanoClient.markProposalLost(id);
      if (response.success) {
        refresh();
      }
      return response;
    } catch (err) {
      console.error('Failed to mark proposal as lost:', err);
      return { success: false, error: 'Failed to update proposal' };
    }
  };

  return {
    proposals,
    loading,
    error,
    totalPages,
    refresh,
    sendProposal,
    markWon,
    markLost,
  };
}

export function useProposal(id: string) {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProposal();
    }
  }, [id]);

  const fetchProposal = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await xanoClient.getProposalById(id);
      
      if (response.success && response.data) {
        setProposal(response.data);
      } else {
        setError(response.error || 'Failed to fetch proposal');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchProposal();
  };

  return {
    proposal,
    loading,
    error,
    refresh,
  };
}
