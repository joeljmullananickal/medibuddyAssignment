import { useState, useEffect, useCallback } from 'react';
import { Coin, TrendingResponse, GlobalMarketData } from '../types';
import { CoinGeckoService } from '../services/api';
import { getTopGainers, getTopLosers, getHighestVolume } from '../utils';

interface UseHighlightsReturn {
  trendingCoins: TrendingResponse['coins'];
  topGainers: Coin[];
  topLosers: Coin[];
  highestVolume: Coin[];
  globalData: GlobalMarketData['data'] | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useHighlights = (allCoins: Coin[] = []): UseHighlightsReturn => {
  const [trendingCoins, setTrendingCoins] = useState<TrendingResponse['coins']>([]);
  const [globalData, setGlobalData] = useState<GlobalMarketData['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [trendingResponse, globalResponse] = await Promise.all([
        CoinGeckoService.getTrendingCoins(),
        CoinGeckoService.getGlobalMarketData(),
      ]);

      if (trendingResponse.error) {
        console.error('Error fetching trending coins:', trendingResponse.error);
      } else {
        setTrendingCoins(trendingResponse.data.coins);
      }

      if (globalResponse.error) {
        console.error('Error fetching global data:', globalResponse.error);
      } else {
        setGlobalData(globalResponse.data.data);
      }

    } catch (err: any) {
      setError(err.message || 'Failed to fetch highlights data');
      console.error('Error fetching highlights:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  // Initial load
  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  // Calculate highlights from all coins data
  const topGainers = getTopGainers(allCoins, 10);
  const topLosers = getTopLosers(allCoins, 10);
  const highestVolume = getHighestVolume(allCoins, 10);

  return {
    trendingCoins,
    topGainers,
    topLosers,
    highestVolume,
    globalData,
    loading,
    error,
    refreshData,
  };
};
