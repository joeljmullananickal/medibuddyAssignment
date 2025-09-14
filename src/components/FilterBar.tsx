import React from 'react';
import { FilterConfig, Coin } from '../types';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filterConfig: FilterConfig;
  onFilterChange: (config: FilterConfig) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterConfig,
  onFilterChange,
  onSearch,
  searchQuery,
}) => {
  const sortOptions: { key: keyof Coin; label: string }[] = [
    { key: 'market_cap_rank', label: 'Market Cap Rank' },
    { key: 'current_price', label: 'Price' },
    { key: 'price_change_percentage_24h', label: '24h Change' },
    { key: 'price_change_percentage_7d_in_currency', label: '7d Change' },
    { key: 'market_cap', label: 'Market Cap' },
    { key: 'total_volume', label: 'Volume' },
  ];

  const handleSortChange = (key: keyof Coin) => {
    if (key === filterConfig.sortBy) {
      onFilterChange({
        ...filterConfig,
        sortDirection: filterConfig.sortDirection === 'asc' ? 'desc' : 'asc',
      });
    } else {
      onFilterChange({
        ...filterConfig,
        sortBy: key,
        sortDirection: 'desc',
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search coins..."
              className="input w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filterConfig.sortBy}
                onChange={(e) => handleSortChange(e.target.value as keyof Coin)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Sort Direction */}
            <button
              onClick={() => handleSortChange(filterConfig.sortBy)}
              className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <span>{filterConfig.sortDirection === 'asc' ? '↑' : '↓'}</span>
              <span className="hidden sm:inline">
                {filterConfig.sortDirection === 'asc' ? 'Ascending' : 'Descending'}
              </span>
            </button>

            {/* Customize Button */}
            <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <span>Customize</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
