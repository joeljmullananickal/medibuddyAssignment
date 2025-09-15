import { Coin, SortConfig } from '../types';

/**
 * Format currency values
 */
export const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format large numbers with abbreviations
 */
export const formatNumber = (value: number): string => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  }
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  }
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  }
  if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  return value.toFixed(2);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return '-';
  }
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

/**
 * Get color class based on percentage change
 */
export const getChangeColor = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return 'text-gray-600';
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};

/**
 * Get background color class based on percentage change
 */
export const getChangeBgColor = (value: number): string => {
  if (value > 0) return 'bg-green-50';
  if (value < 0) return 'bg-red-50';
  return 'bg-gray-50';
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Sort array of coins based on configuration
 */
export const sortCoins = (coins: Coin[], config: SortConfig): Coin[] => {
  return [...coins].sort((a, b) => {
    const aValue = a[config.key];
    const bValue = b[config.key];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return config.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return config.direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });
};

/**
 * Filter coins based on search query
 */
export const filterCoins = (coins: Coin[], searchQuery: string): Coin[] => {
  if (!searchQuery.trim()) return coins;

  const query = searchQuery.toLowerCase();
  return coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query) ||
      coin.id.toLowerCase().includes(query)
  );
};

/**
 * Get top gainers from coins array
 */
export const getTopGainers = (coins: Coin[], limit: number = 10): Coin[] => {
  return [...coins]
    .filter(coin => coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h > 0)
    .sort((a, b) => {
      const aValue = a.price_change_percentage_24h || 0;
      const bValue = b.price_change_percentage_24h || 0;
      return bValue - aValue;
    })
    .slice(0, limit);
};

/**
 * Get top losers from coins array
 */
export const getTopLosers = (coins: Coin[], limit: number = 10): Coin[] => {
  return [...coins]
    .filter(coin => coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h < 0)
    .sort((a, b) => {
      const aValue = a.price_change_percentage_24h || 0;
      const bValue = b.price_change_percentage_24h || 0;
      return aValue - bValue;
    })
    .slice(0, limit);
};

/**
 * Get highest volume coins
 */
export const getHighestVolume = (coins: Coin[], limit: number = 10): Coin[] => {
  return [...coins]
    .sort((a, b) => b.total_volume - a.total_volume)
    .slice(0, limit);
};

/**
 * Generate sparkline data for charts
 */
export const generateSparklineData = (prices: number[]): string => {
  if (!prices || prices.length === 0) return '';
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min;
  
  if (range === 0) return '0,50 100,50';
  
  return prices
    .map((price, index) => {
      const x = (index / (prices.length - 1)) * 100;
      const y = 100 - ((price - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');
};

/**
 * Check if value is positive, negative, or zero
 */
export const getChangeType = (value: number): 'positive' | 'negative' | 'neutral' => {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
