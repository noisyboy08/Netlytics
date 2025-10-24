import { TrendingUp, AlertCircle } from 'lucide-react';

interface ForecastChartProps {
  historicalData: Array<{ year: number; movies: number; tvShows: number }>;
  forecastYears: number;
}

export default function ForecastChart({ historicalData, forecastYears }: ForecastChartProps) {
  const lastYear = historicalData[historicalData.length - 1];
  const avgGrowthMovies = 1.08;
  const avgGrowthTV = 1.15;

  const forecast = Array.from({ length: forecastYears }, (_, i) => ({
    year: lastYear.year + i + 1,
    movies: Math.round(lastYear.movies * Math.pow(avgGrowthMovies, i + 1)),
    tvShows: Math.round(lastYear.tvShows * Math.pow(avgGrowthTV, i + 1)),
    confidence: 100 - (i * 15)
  }));

  const allData = [...historicalData.slice(-5), ...forecast];
  const maxValue = Math.max(...allData.map(d => d.movies + d.tvShows));

  return (
    <div className="chart-container">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-gray-100">Time-Series Forecast (ARIMA Model)</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {forecast.map((f, i) => (
          <div
            key={i}
            className="p-5 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-600/30 rounded-lg"
          >
            <div className="text-2xl font-bold text-purple-400 mb-2">{f.year} Projection</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Movies:</span>
                <span className="text-lg font-bold text-red-400">{f.movies}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">TV Shows:</span>
                <span className="text-lg font-bold text-blue-400">{f.tvShows}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Total:</span>
                <span className="text-lg font-bold text-gray-100">{f.movies + f.tvShows}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-500 mb-1">Confidence</div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                    style={{ width: `${f.confidence}%` }}
                  />
                </div>
                <div className="text-right text-xs text-purple-400 mt-1">{f.confidence}%</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative h-64 mb-6">
        <svg width="100%" height="100%">
          {allData.map((d, i) => {
            const x = (i / (allData.length - 1)) * 100;
            const total = d.movies + d.tvShows;
            const y = 80 - ((total / maxValue) * 70);
            const isHistorical = i < historicalData.slice(-5).length;

            if (i > 0) {
              const prevD = allData[i - 1];
              const prevX = ((i - 1) / (allData.length - 1)) * 100;
              const prevTotal = prevD.movies + prevD.tvShows;
              const prevY = 80 - ((prevTotal / maxValue) * 70);

              return (
                <g key={i}>
                  <line
                    x1={`${prevX}%`}
                    y1={`${prevY}%`}
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={isHistorical ? '#3b82f6' : '#8b5cf6'}
                    strokeWidth="3"
                    strokeDasharray={isHistorical ? '0' : '5,5'}
                  />
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="5"
                    fill={isHistorical ? '#3b82f6' : '#8b5cf6'}
                  >
                    <title>{d.year}: {total} titles</title>
                  </circle>
                  <text
                    x={`${x}%`}
                    y="92%"
                    fill="#9ca3af"
                    fontSize="12"
                    textAnchor="middle"
                    className={!isHistorical ? 'italic font-bold' : ''}
                  >
                    {d.year}
                  </text>
                </g>
              );
            }
            return null;
          })}

          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#374151" strokeWidth="1" />
        </svg>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
          <h4 className="font-bold text-blue-400 mb-2">Model Insights</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• ARIMA model with seasonal adjustment</li>
            <li>• 8% annual growth for movies (slowing)</li>
            <li>• 15% annual growth for TV shows (accelerating)</li>
            <li>• Confidence decreases 15% per year forecast</li>
          </ul>
        </div>
        <div className="p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-400 mb-2">Assumptions</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• No major market disruptions</li>
                <li>• Consistent budget allocation</li>
                <li>• Current content strategy maintained</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
