import React, { useState } from 'react';
import { Coin, SortConfig } from '../types';
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '../utils';
import { ChevronUp, ChevronDown, Star } from 'lucide-react';

interface CoinTableProps {
  coins: Coin[];
  loading: boolean;
  onSort: (key: keyof Coin) => void;
  sortConfig: SortConfig;
  onCoinClick: (coin: Coin) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({
  coins,
  loading,
  onSort,
  sortConfig,
  onCoinClick,
}) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (coinId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(coinId)) {
        newSet.delete(coinId);
      } else {
        newSet.add(coinId);
      }
      return newSet;
    });
  };

  const getSortIcon = (key: keyof Coin) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-primary-500" /> : 
      <ChevronDown className="w-4 h-4 text-primary-500" />;
  };

  const SortableHeader: React.FC<{ 
    key: keyof Coin; 
    children: React.ReactNode; 
    className?: string;
  }> = ({ key: sortKey, children, className = '' }) => (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {getSortIcon(sortKey)}
      </div>
    </th>
  );

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coin
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  1h
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  7d
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Volume
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last 7 Days
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-8 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full shimmer"></div>
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                        <div className="h-3 bg-gray-200 rounded w-12 shimmer"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-12 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-12 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-12 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="h-8 bg-gray-200 rounded w-16 shimmer"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <SortableHeader key="name">Coin</SortableHeader>
              <SortableHeader key="current_price">Price</SortableHeader>
              <SortableHeader key="price_change_percentage_1h_in_currency">1h</SortableHeader>
              <SortableHeader key="price_change_percentage_24h">24h</SortableHeader>
              <SortableHeader key="price_change_percentage_7d_in_currency">7d</SortableHeader>
              <SortableHeader key="total_volume">24h Volume</SortableHeader>
              <SortableHeader key="market_cap">Market Cap</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onCoinClick(coin)}
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => toggleFavorite(coin.id, e)}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Star 
                        className={`w-4 h-4 ${
                          favorites.has(coin.id) ? 'fill-yellow-500 text-yellow-500' : ''
                        }`} 
                      />
                    </button>
                    <span className="font-medium">{coin.market_cap_rank}</span>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={coin.image}
                      alt={coin.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTJMMTIgOEw4IDRMMCA4TDggMTJaIiBmaWxsPSIjOUI5QkE1Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                      <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(coin.current_price)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getChangeColor(coin.price_change_percentage_1h_in_currency || 0)}`}>
                    {coin.price_change_percentage_1h_in_currency ? 
                      formatPercentage(coin.price_change_percentage_1h_in_currency) : 
                      '-'
                    }
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getChangeColor(coin.price_change_percentage_24h)}`}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`text-sm ${getChangeColor(coin.price_change_percentage_7d_in_currency || 0)}`}>
                    {coin.price_change_percentage_7d_in_currency ? 
                      formatPercentage(coin.price_change_percentage_7d_in_currency) : 
                      '-'
                    }
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(coin.total_volume)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatNumber(coin.market_cap)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="w-16 h-8 flex items-center">
                    {coin.sparkline_in_7d?.price ? (
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 50"
                        preserveAspectRatio="none"
                      >
                        <polyline
                          fill="none"
                          stroke={coin.price_change_percentage_7d_in_currency && coin.price_change_percentage_7d_in_currency > 0 ? '#22c55e' : '#ef4444'}
                          strokeWidth="2"
                          points={coin.sparkline_in_7d.price
                            .map((price, index) => {
                              const x = (index / (coin.sparkline_in_7d!.price.length - 1)) * 100;
                              const min = Math.min(...coin.sparkline_in_7d!.price);
                              const max = Math.max(...coin.sparkline_in_7d!.price);
                              const y = 50 - ((price - min) / (max - min)) * 50;
                              return `${x},${y}`;
                            })
                            .join(' ')}
                        />
                      </svg>
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded"></div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
