export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface TrendingCoin {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
}

export interface TrendingItem {
  item: TrendingCoin;
}

export interface TrendingResponse {
  coins: TrendingItem[];
  exchanges: any[];
}

export interface GlobalMarketData {
  data: {
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    market_cap_percentage: { [key: string]: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface SortConfig {
  key: keyof Coin;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  search: string;
  sortBy: keyof Coin;
  sortDirection: 'asc' | 'desc';
}

export interface PaginationConfig {
  page: number;
  perPage: number;
  total: number;
}
