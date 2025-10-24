import { Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface AISearchBarProps {
  onQuery: (query: string) => void;
}

export default function AISearchBar({ onQuery }: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onQuery(query);
    }
  };

  const suggestions = [
    'Show top dramas from USA',
    'Which genres are underrepresented?',
    'Compare movies vs TV shows',
    'Predict 2024 trends',
    'What was added in 2020?'
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-lg rounded-xl border-2 transition-all ${
          isActive ? 'border-purple-400 shadow-lg shadow-purple-500/20' : 'border-white/20'
        }`}>
          <Sparkles className="w-6 h-6 text-purple-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setTimeout(() => setIsActive(false), 200)}
            placeholder="Ask anything... 'Show top dramas from USA' or 'Predict 2024 trends'"
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all font-semibold flex items-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </form>

      {isActive && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl z-50">
          <div className="text-xs font-semibold text-gray-400 mb-2">SUGGESTIONS</div>
          <div className="space-y-1">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(suggestion);
                  onQuery(suggestion);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-purple-400 rounded-lg transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
