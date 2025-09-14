import axios, { AxiosResponse } from 'axios';
import { Coin, TrendingResponse, GlobalMarketData, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-cg-demo-api-key': API_KEY }),
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Cache for API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export class CoinGeckoService {
  /**
   * Fetch coins with market data
   */
  static async getCoins(params: {
    vs_currency?: string;
    order?: string;
    per_page?: number;
    page?: number;
    price_change_percentage?: string;
    sparkline?: boolean;
  } = {}): Promise<ApiResponse<Coin[]>> {
    try {
      const cacheKey = `coins_${JSON.stringify(params)}`;
      const cached = getCachedData<Coin[]>(cacheKey);
      
      if (cached) {
        return { data: cached };
      }

      const response: AxiosResponse<Coin[]> = await apiClient.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          price_change_percentage: '1h,24h,7d',
          sparkline: true,
          ...params,
        },
      });

      setCachedData(cacheKey, response.data);
      return { data: response.data };
    } catch (error: any) {
      console.error('Error fetching coins:', error);
      return {
        data: [],
        error: error.response?.data?.error || 'Failed to fetch coins data',
      };
    }
  }

  /**
   * Fetch trending coins
   */
  static async getTrendingCoins(): Promise<ApiResponse<TrendingResponse>> {
    try {
      const cacheKey = 'trending_coins';
      const cached = getCachedData<TrendingResponse>(cacheKey);
      
      if (cached) {
        return { data: cached };
      }

      const response: AxiosResponse<TrendingResponse> = await apiClient.get('/search/trending');
      
      setCachedData(cacheKey, response.data);
      return { data: response.data };
    } catch (error: any) {
      console.error('Error fetching trending coins:', error);
      return {
        data: { coins: [], exchanges: [] },
        error: error.response?.data?.error || 'Failed to fetch trending coins',
      };
    }
  }

  /**
   * Fetch global market data
   */
  static async getGlobalMarketData(): Promise<ApiResponse<GlobalMarketData>> {
    try {
      const cacheKey = 'global_market_data';
      const cached = getCachedData<GlobalMarketData>(cacheKey);
      
      if (cached) {
        return { data: cached };
      }

      const response: AxiosResponse<GlobalMarketData> = await apiClient.get('/global');
      
      setCachedData(cacheKey, response.data);
      return { data: response.data };
    } catch (error: any) {
      console.error('Error fetching global market data:', error);
      return {
        data: {
          data: {
            total_market_cap: { usd: 0 },
            total_volume: { usd: 0 },
            market_cap_percentage: {},
            market_cap_change_percentage_24h_usd: 0,
          },
        },
        error: error.response?.data?.error || 'Failed to fetch global market data',
      };
    }
  }

  /**
   * Search coins by query
   */
  static async searchCoins(query: string): Promise<ApiResponse<any[]>> {
    try {
      if (!query.trim()) {
        return { data: [] };
      }

      const response: AxiosResponse<any> = await apiClient.get('/search', {
        params: { query },
      });

      return { data: response.data.coins || [] };
    } catch (error: any) {
      console.error('Error searching coins:', error);
      return {
        data: [],
        error: error.response?.data?.error || 'Failed to search coins',
      };
    }
  }

  /**
   * Get coin details by ID
   */
  static async getCoinDetails(coinId: string): Promise<ApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await apiClient.get(`/coins/${coinId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      });

      return { data: response.data };
    } catch (error: any) {
      console.error('Error fetching coin details:', error);
      return {
        data: null,
        error: error.response?.data?.error || 'Failed to fetch coin details',
      };
    }
  }
}

export default CoinGeckoService;
