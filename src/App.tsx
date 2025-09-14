import React, { useState, useCallback } from 'react';
import { Coin, SortConfig, FilterConfig } from './types';
import { useCoins } from './hooks/useCoins';
import { useHighlights } from './hooks/useHighlights';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import HighlightsSection from './components/HighlightsSection';
import CoinTable from './components/CoinTable';
import CoinModal from './components/CoinModal';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    coins,
    loading: coinsLoading,
    error: coinsError,
    filterConfig,
    setFilterConfig,
    refreshData: refreshCoins,
  } = useCoins();

  const {
    trendingCoins,
    topGainers,
    topLosers,
    highestVolume,
    globalData,
    loading: highlightsLoading,
    error: highlightsError,
    refreshData: refreshHighlights,
  } = useHighlights(coins);

  const handleCoinClick = useCallback((coin: Coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setFilterConfig(prev => ({
      ...prev,
      search: query,
    }));
  }, [setFilterConfig]);

  const handleSort = useCallback((key: keyof Coin) => {
    setFilterConfig(prev => ({
      ...prev,
      sortBy: key,
      sortDirection: prev.sortBy === key && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }));
  }, [setFilterConfig]);

  const handleRefresh = useCallback(() => {
    refreshCoins();
    refreshHighlights();
  }, [refreshCoins, refreshHighlights]);

  const sortConfig: SortConfig = {
    key: filterConfig.sortBy,
    direction: filterConfig.sortDirection,
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header onRefresh={handleRefresh} loading={coinsLoading || highlightsLoading} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Highlights Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Crypto Highlights</h2>
            {highlightsError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">Error loading highlights: {highlightsError}</p>
                <button
                  onClick={refreshHighlights}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <HighlightsSection
                trendingCoins={trendingCoins}
                topGainers={topGainers}
                topLosers={topLosers}
                highestVolume={highestVolume}
                globalData={globalData}
                loading={highlightsLoading}
              />
            )}
          </section>

          {/* All Coins Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Cryptocurrencies
              </h2>
              <div className="text-sm text-gray-500">
                {coins.length} coins
              </div>
            </div>

            <FilterBar
              filterConfig={filterConfig}
              onFilterChange={setFilterConfig}
              onSearch={handleSearch}
              searchQuery={searchQuery}
            />

            {coinsError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <div className="text-red-600 text-lg font-medium mb-2">
                  Failed to load cryptocurrency data
                </div>
                <p className="text-red-500 mb-4">{coinsError}</p>
                <button
                  onClick={refreshCoins}
                  className="btn btn-primary px-4 py-2"
                >
                  Try Again
                </button>
              </div>
            ) : coins.length === 0 && !coinsLoading ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No coins found
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery ? 
                    `No coins match "${searchQuery}". Try a different search term.` :
                    'No cryptocurrency data available at the moment.'
                  }
                </p>
                {searchQuery && (
                  <button
                    onClick={() => handleSearch('')}
                    className="btn btn-secondary px-4 py-2"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <CoinTable
                coins={coins}
                loading={coinsLoading}
                onSort={handleSort}
                sortConfig={sortConfig}
                onCoinClick={handleCoinClick}
              />
            )}

            {/* Load More Button */}
            {coins.length > 0 && !coinsLoading && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    // This would trigger loadMore in a real implementation
                    console.log('Load more clicked');
                  }}
                  className="btn btn-secondary px-6 py-2"
                >
                  Load More Coins
                </button>
              </div>
            )}
          </section>
        </main>

        {/* Coin Detail Modal */}
        <CoinModal
          coin={selectedCoin}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
