import React from 'react';
import { Coin, TrendingResponse } from '../types';
import { formatCurrency, formatPercentage, getChangeColor } from '../utils';
import { TrendingUp, TrendingDown, Eye, Star, Zap } from 'lucide-react';

interface HighlightsSectionProps {
  trendingCoins: TrendingResponse['coins'];
  topGainers: Coin[];
  topLosers: Coin[];
  highestVolume: Coin[];
  globalData: any;
  loading: boolean;
}

const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  trendingCoins,
  topGainers,
  topLosers,
  highestVolume,
  globalData,
  loading,
}) => {
  const HighlightCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    className?: string;
  }> = ({ title, icon, children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <span className="text-sm text-primary-500 hover:text-primary-600 cursor-pointer">
          View more →
        </span>
      </div>
      {children}
    </div>
  );

  const CoinItem: React.FC<{
    coin: Coin;
    showChange?: boolean;
    showVolume?: boolean;
  }> = ({ coin, showChange = true, showVolume = false }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <img
          className="w-6 h-6 rounded-full"
          src={coin.image}
          alt={coin.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgOUw5IDZMNCA2TDYgOVoiIGZpbGw9IiM5QjlCQTUiLz4KPC9zdmc+Cjwvc3ZnPgo=';
          }}
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{coin.name}</div>
          <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          {formatCurrency(coin.current_price)}
        </div>
        {showChange && (
          <div className={`text-xs ${getChangeColor(coin.price_change_percentage_24h)}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </div>
        )}
        {showVolume && (
          <div className="text-xs text-gray-500">
            Vol: {formatCurrency(coin.total_volume)}
          </div>
        )}
      </div>
    </div>
  );

  const TrendingItem: React.FC<{ item: TrendingResponse['coins'][0] }> = ({ item }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center space-x-3">
        <img
          className="w-6 h-6 rounded-full"
          src={item.item.thumb}
          alt={item.item.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgOUw5IDZMNCA2TDYgOVoiIGZpbGw9IiM5QjlCQTUiLz4KPC9zdmc+Cjwvc3ZnPgo=';
          }}
        />
        <div>
          <div className="text-sm font-medium text-gray-900">{item.item.name}</div>
          <div className="text-xs text-gray-500 uppercase">{item.item.symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-gray-900">
          Rank #{item.item.market_cap_rank}
        </div>
        <div className="text-xs text-gray-500">
          Score: {item.item.score}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-5 h-5 bg-gray-200 rounded shimmer"></div>
              <div className="h-5 bg-gray-200 rounded w-24 shimmer"></div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full shimmer"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
                      <div className="h-3 bg-gray-200 rounded w-12 shimmer"></div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-12 shimmer"></div>
                    <div className="h-3 bg-gray-200 rounded w-8 shimmer"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Global Market Overview */}
      {globalData && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Global Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Total Market Cap</div>
              <div className="text-2xl font-bold">
                {formatCurrency(globalData.total_market_cap.usd)}
              </div>
              <div className={`text-sm ${globalData.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                {formatPercentage(globalData.market_cap_change_percentage_24h_usd)} (24h)
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">24h Trading Volume</div>
              <div className="text-2xl font-bold">
                {formatCurrency(globalData.total_volume.usd)}
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Bitcoin Dominance</div>
              <div className="text-2xl font-bold">
                {globalData.market_cap_percentage.btc?.toFixed(1) || 0}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HighlightCard
          title="Trending"
          icon={<Zap className="w-5 h-5 text-orange-500" />}
        >
          <div className="space-y-1">
            {trendingCoins.slice(0, 8).map((item) => (
              <TrendingItem key={item.item.id} item={item} />
            ))}
          </div>
        </HighlightCard>

        <HighlightCard
          title="Top Gainers"
          icon={<TrendingUp className="w-5 h-5 text-green-500" />}
        >
          <div className="space-y-1">
            {topGainers.slice(0, 8).map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
          </div>
        </HighlightCard>

        <HighlightCard
          title="Top Losers"
          icon={<TrendingDown className="w-5 h-5 text-red-500" />}
        >
          <div className="space-y-1">
            {topLosers.slice(0, 8).map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
          </div>
        </HighlightCard>

        <HighlightCard
          title="Highest Volume"
          icon={<Eye className="w-5 h-5 text-blue-500" />}
        >
          <div className="space-y-1">
            {highestVolume.slice(0, 8).map((coin) => (
              <CoinItem key={coin.id} coin={coin} showVolume={true} />
            ))}
          </div>
        </HighlightCard>

        <HighlightCard
          title="New Coins"
          icon={<Star className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-1">
            {topGainers.slice(0, 8).map((coin) => (
              <CoinItem key={coin.id} coin={coin} />
            ))}
          </div>
        </HighlightCard>

        <HighlightCard
          title="Most Viewed"
          icon={<Eye className="w-5 h-5 text-indigo-500" />}
        >
          <div className="space-y-1">
            {trendingCoins.slice(0, 8).map((item) => (
              <TrendingItem key={item.item.id} item={item} />
            ))}
          </div>
        </HighlightCard>
      </div>
    </div>
  );
};

export default HighlightsSection;
