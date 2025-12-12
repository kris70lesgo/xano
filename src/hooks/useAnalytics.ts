'use client';

import { useState, useEffect } from 'react';
import { Analytics } from '@/types';
import { xanoClient } from '@/lib/xano';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await xanoClient.getAnalytics();
      
      if (response.success && response.data) {
        setAnalytics(response.data);
      } else {
        setError(response.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchAnalytics();
  };

  return {
    analytics,
    loading,
    error,
    refresh,
  };
}

export function useWinRate() {
  const { analytics, loading, error, refresh } = useAnalytics();
  
  return {
    winRate: analytics?.win_rate || null,
    loading,
    error,
    refresh,
  };
}
