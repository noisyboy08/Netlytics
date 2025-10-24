import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface FilterOptions {
  types: string[];
  years: number[];
  ratings: string[];
  genres: string[];
  countries: string[];
}

interface Filters {
  search: string;
  types: string[];
  years: number[];
  ratings: string[];
  genres: string[];
  countries: string[];
}

interface SearchFiltersProps {
  options: FilterOptions;
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  resultCount: number;
}

export default function SearchFilters({ options, filters, onFilterChange, resultCount }: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleMultiSelect = (category: keyof Omit<Filters, 'search'>, value: string | number) => {
    const current = filters[category] as any[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: updated });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      types: [],
      years: [],
      ratings: [],
      genres: [],
      countries: []
    });
  };

  const activeFilterCount =
    filters.types.length +
    filters.years.length +
    filters.ratings.length +
    filters.genres.length +
    filters.countries.length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Search & Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by title, director, cast, or country..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          Showing <strong>{resultCount}</strong> results
          {activeFilterCount > 0 && ` with ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied`}
        </span>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>
      </div>

      {showAdvanced && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="space-y-2">
              {options.types.map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={() => handleMultiSelect('types', type)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year ({filters.years.length > 0 ? filters.years.length : 'All'})
            </label>
            <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2">
              {options.years.slice(0, 20).map(year => (
                <label key={year} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.years.includes(year)}
                    onChange={() => handleMultiSelect('years', year)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{year}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating ({filters.ratings.length > 0 ? filters.ratings.length : 'All'})
            </label>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {options.ratings.map(rating => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.ratings.includes(rating)}
                    onChange={() => handleMultiSelect('ratings', rating)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre ({filters.genres.length > 0 ? filters.genres.length : 'All'})
            </label>
            <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2">
              {options.genres.slice(0, 15).map(genre => (
                <label key={genre} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.genres.includes(genre)}
                    onChange={() => handleMultiSelect('genres', genre)}
                    className="rounded text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country ({filters.countries.length > 0 ? filters.countries.length : 'All'})
            </label>
            <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-2">
              <div className="grid grid-cols-2 gap-2">
                {options.countries.slice(0, 20).map(country => (
                  <label key={country} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.countries.includes(country)}
                      onChange={() => handleMultiSelect('countries', country)}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
