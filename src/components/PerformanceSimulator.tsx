import { Calculator, DollarSign, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

export default function PerformanceSimulator() {
  const [budget, setBudget] = useState(50);
  const [contentType, setContentType] = useState<'movie' | 'series'>('series');
  const [genre, setGenre] = useState('Drama');

  const calculateROI = () => {
    const baseROI = contentType === 'series' ? 2.8 : 2.1;
    const genreMultiplier = genre === 'Drama' ? 1.2 : genre === 'Action' ? 1.1 : genre === 'Horror' ? 1.3 : 1.0;
    const budgetFactor = budget < 30 ? 1.3 : budget < 60 ? 1.15 : 1.0;

    return (baseROI * genreMultiplier * budgetFactor).toFixed(2);
  };

  const calculateViewership = () => {
    const baseViews = contentType === 'series' ? 45 : 32;
    const genreBoost = genre === 'Drama' ? 1.15 : genre === 'Action' ? 1.25 : genre === 'Horror' ? 1.1 : 1.0;
    const budgetBoost = 1 + (budget / 200);

    return Math.round(baseViews * genreBoost * budgetBoost);
  };

  const calculateRetention = () => {
    const baseRetention = contentType === 'series' ? 78 : 65;
    const genreImpact = genre === 'Drama' ? 5 : genre === 'Action' ? -2 : genre === 'Horror' ? 0 : 3;

    return Math.min(95, baseRetention + genreImpact + Math.floor(budget / 20));
  };

  const roi = calculateROI();
  const viewership = calculateViewership();
  const retention = calculateRetention();
  const projectedRevenue = (budget * parseFloat(roi)).toFixed(1);

  return (
    <div className="chart-container">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-gray-100">Content Performance & ROI Simulator</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3">
              Production Budget ($ millions)
            </label>
            <input
              type="range"
              min="10"
              max="150"
              step="5"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">$10M</span>
              <span className="text-2xl font-bold text-green-400">${budget}M</span>
              <span className="text-xs text-gray-500">$150M</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3">Content Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setContentType('movie')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  contentType === 'movie'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Movie
              </button>
              <button
                onClick={() => setContentType('series')}
                className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                  contentType === 'series'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                TV Series
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-purple-500"
            >
              <option value="Drama">Drama</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Projected ROI</span>
            </div>
            <div className="text-4xl font-bold text-green-400">{roi}x</div>
            <div className="text-sm text-gray-500 mt-2">
              Revenue: ${projectedRevenue}M
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Est. Viewership</span>
            </div>
            <div className="text-4xl font-bold text-blue-400">{viewership}M</div>
            <div className="text-sm text-gray-500 mt-2">
              First 28 days
            </div>
          </div>

          <div className="p-5 bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Retention Rate</span>
            </div>
            <div className="text-4xl font-bold text-purple-400">{retention}%</div>
            <div className="text-sm text-gray-500 mt-2">
              Subscriber impact
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 border border-yellow-600/20 rounded-lg">
        <h4 className="font-bold text-yellow-400 mb-3">Strategic Analysis</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <div className="font-semibold text-gray-100 mb-1">Budget Efficiency</div>
            <p>
              {budget < 30
                ? 'High ROI potential. Lower budgets often yield better returns in niche genres.'
                : budget < 70
                ? 'Balanced approach. Good for mainstream appeal with solid returns.'
                : 'Premium positioning. Requires strong marketing and star power for ROI.'}
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-100 mb-1">Content Strategy</div>
            <p>
              {contentType === 'series'
                ? 'Series drive higher retention and sustained engagement. Better for building loyal audiences.'
                : 'Movies create immediate buzz and are easier to market. Good for attracting new subscribers.'}
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-100 mb-1">Genre Performance</div>
            <p>
              {genre === 'Horror'
                ? 'Horror has highest ROI. Low budget, high engagement, passionate fanbase.'
                : genre === 'Drama'
                ? 'Drama offers broad appeal and critical acclaim. Moderate risk, stable returns.'
                : 'Strong commercial appeal. Consider A-list talent for maximum impact.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <p className="text-xs text-gray-400">
          <strong>Note:</strong> ROI calculations based on synthetic performance scores using IMDb ratings, viewership data, and subscriber retention metrics. Actual results may vary based on marketing, release timing, and competitive landscape.
        </p>
      </div>
    </div>
  );
}
