import React from 'react';
import { Coin } from '../types';
import { formatCurrency, formatNumber, formatPercentage, getChangeColor } from '../utils';
import { X, TrendingUp, TrendingDown, BarChart3, DollarSign, Globe } from 'lucide-react';

interface CoinModalProps {
  coin: Coin | null;
  isOpen: boolean;
  onClose: () => void;
}

const CoinModal: React.FC<CoinModalProps> = ({ coin, isOpen, onClose }) => {
  if (!isOpen || !coin) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                className="w-12 h-12 rounded-full"
                src={coin.image}
                alt={coin.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIgMkwxOCA2TDEyIDEwTDYgNkwxMiAyWiIgZmlsbD0iIzlCOUJBNSIvPgo8L3N2Zz4KPC9zdmc+Cg==';
                }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{coin.name}</h2>
                <p className="text-lg text-gray-500 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Price and Change */}
          <div className="mb-6">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(coin.current_price)}
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-1 ${getChangeColor(coin.price_change_percentage_24h)}`}>
                {coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : coin.price_change_percentage_24h !== null ? (
                  <TrendingDown className="w-4 h-4" />
                ) : null}
                <span className="font-medium">
                  {formatPercentage(coin.price_change_percentage_24h)} (24h)
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {formatCurrency(coin.price_change_24h)} change
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-900">Market Data</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap</span>
                  <span className="font-medium">{formatNumber(coin.market_cap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Volume</span>
                  <span className="font-medium">{formatNumber(coin.total_volume)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Circulating Supply</span>
                  <span className="font-medium">{formatNumber(coin.circulating_supply)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Supply</span>
                  <span className="font-medium">
                    {coin.total_supply ? formatNumber(coin.total_supply) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Supply</span>
                  <span className="font-medium">
                    {coin.max_supply ? formatNumber(coin.max_supply) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <DollarSign className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Price Data</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">24h High</span>
                  <span className="font-medium">{formatCurrency(coin.high_24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">24h Low</span>
                  <span className="font-medium">{formatCurrency(coin.low_24h)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">All Time High</span>
                  <span className="font-medium">{formatCurrency(coin.ath)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ATH Change</span>
                  <span className={`font-medium ${getChangeColor(coin.ath_change_percentage)}`}>
                    {formatPercentage(coin.ath_change_percentage)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">All Time Low</span>
                  <span className="font-medium">{formatCurrency(coin.atl)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Globe className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">1h</div>
                <div className={`font-medium ${getChangeColor(coin.price_change_percentage_1h_in_currency || 0)}`}>
                  {coin.price_change_percentage_1h_in_currency ? 
                    formatPercentage(coin.price_change_percentage_1h_in_currency) : 
                    '-'
                  }
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">24h</div>
                <div className={`font-medium ${getChangeColor(coin.price_change_percentage_24h)}`}>
                  {formatPercentage(coin.price_change_percentage_24h)}
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">7d</div>
                <div className={`font-medium ${getChangeColor(coin.price_change_percentage_7d_in_currency || 0)}`}>
                  {coin.price_change_percentage_7d_in_currency ? 
                    formatPercentage(coin.price_change_percentage_7d_in_currency) : 
                    '-'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Sparkline Chart */}
          {coin.sparkline_in_7d?.price && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7-Day Price Chart</h3>
              <div className="h-32 bg-gray-50 rounded-lg p-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
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
                        const y = 100 - ((price - min) / (max - min)) * 100;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="btn btn-secondary px-4 py-2"
            >
              Close
            </button>
            <button
              onClick={() => window.open(`https://www.coingecko.com/en/coins/${coin.id}`, '_blank')}
              className="btn btn-primary px-4 py-2"
            >
              View on CoinGecko
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinModal;