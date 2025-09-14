import { useState, useEffect, useCallback, useMemo } from 'react';
import { Coin, FilterConfig, PaginationConfig } from '../types';
import { CoinGeckoService } from '../services/api';
import { sortCoins, filterCoins } from '../utils';

interface UseCoinsReturn {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  pagination: PaginationConfig;
  filterConfig: FilterConfig;
  setFilterConfig: React.Dispatch<React.SetStateAction<FilterConfig>>;
  refreshData: () => void;
  loadMore: () => void;
}

export const useCoins = (): UseCoinsReturn => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    perPage: 50,
    total: 0,
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    search: '',
    sortBy: 'market_cap_rank',
    sortDirection: 'asc',
  });

  const fetchCoins = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await CoinGeckoService.getCoins({
        page,
        per_page: pagination.perPage,
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      const newCoins = response.data;
      
      if (append) {
        setCoins(prev => [...prev, ...newCoins]);
      } else {
        setCoins(newCoins);
      }

      setPagination(prev => ({
        ...prev,
        page,
        total: newCoins.length < pagination.perPage ? 
          (page - 1) * pagination.perPage + newCoins.length : 
          page * pagination.perPage + 1, // Assume more data available
      }));

    } catch (err: any) {
      setError(err.message || 'Failed to fetch coins');
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  }, [pagination.perPage]);

  const refreshData = useCallback(() => {
    fetchCoins(1, false);
  }, [fetchCoins]);

  const loadMore = useCallback(() => {
    if (!loading && pagination.page * pagination.perPage < pagination.total) {
      fetchCoins(pagination.page + 1, true);
    }
  }, [loading, pagination, fetchCoins]);

  // Initial load
  useEffect(() => {
    fetchCoins(1, false);
  }, [fetchCoins]);

  // Apply filters and sorting
  const filteredAndSortedCoins = useMemo(() => {
    let filtered = filterCoins(coins, filterConfig.search);
    return sortCoins(filtered, {
      key: filterConfig.sortBy,
      direction: filterConfig.sortDirection,
    });
  }, [coins, filterConfig]);

  return {
    coins: filteredAndSortedCoins,
    loading,
    error,
    pagination,
    filterConfig,
    setFilterConfig,
    refreshData,
    loadMore,
  };
};
