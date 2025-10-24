import { useMemo } from 'react';

interface CountryData {
  country: string;
  count: number;
  topGenre: string;
  movies: number;
  tvShows: number;
}

interface WorldMapProps {
  data: CountryData[];
}

export default function WorldMap({ data }: WorldMapProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  const getColor = (count: number) => {
    const intensity = (count / maxCount) * 100;
    if (intensity > 75) return '#b91c1c';
    if (intensity > 50) return '#dc2626';
    if (intensity > 25) return '#ef4444';
    return '#fca5a5';
  };

  const topCountries = useMemo(() => {
    return [...data].sort((a, b) => b.count - a.count).slice(0, 10);
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Global Content Distribution
      </h3>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block bg-white rounded-lg shadow-lg p-6 mb-4">
                <svg className="w-24 h-24 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {data.length} Countries
              </h4>
              <p className="text-gray-600">
                Netflix content spans across the globe
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#b91c1c' }}></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fca5a5' }}></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 mb-3">Top 10 Countries</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {topCountries.map((country, index) => (
              <div
                key={country.country}
                className="p-3 rounded-lg border hover:border-red-500 transition-colors cursor-pointer"
                style={{ backgroundColor: `${getColor(country.count)}15` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                    <span className="font-semibold text-gray-900">{country.country}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{country.count}</span>
                </div>
                <div className="text-xs text-gray-600 space-y-0.5">
                  <div>Top Genre: <span className="font-medium">{country.topGenre}</span></div>
                  <div className="flex gap-3">
                    <span>Movies: {country.movies}</span>
                    <span>TV: {country.tvShows}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
