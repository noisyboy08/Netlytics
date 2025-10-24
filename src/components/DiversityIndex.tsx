import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface YearlyDiversity {
  year: number;
  genreCount: number;
  countryCount: number;
  diversityScore: number;
  trend: 'up' | 'down' | 'stable';
}

interface DiversityIndexProps {
  data: YearlyDiversity[];
}

export default function DiversityIndex({ data }: DiversityIndexProps) {
  const latestYear = data[data.length - 1];
  const previousYear = data[data.length - 2];

  const getDiversityLabel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Needs Improvement', color: 'text-orange-600', bg: 'bg-orange-100' };
  };

  const currentDiversity = getDiversityLabel(latestYear.diversityScore);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Content Diversity Index
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
          <div className="text-4xl font-bold text-red-600 mb-1">
            {latestYear.diversityScore}
          </div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${currentDiversity.bg} ${currentDiversity.color}`}>
            {currentDiversity.label}
          </div>
          <p className="text-xs text-gray-600 mt-2">Current Diversity Score</p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-4xl font-bold text-blue-600 mb-1">
            {latestYear.genreCount}
          </div>
          <p className="text-sm text-gray-700 font-medium">Active Genres</p>
          <p className="text-xs text-gray-600 mt-1">
            {latestYear.genreCount > previousYear.genreCount ? '+' : ''}
            {latestYear.genreCount - previousYear.genreCount} from last year
          </p>
        </div>

        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
          <div className="text-4xl font-bold text-green-600 mb-1">
            {latestYear.countryCount}
          </div>
          <p className="text-sm text-gray-700 font-medium">Countries</p>
          <p className="text-xs text-gray-600 mt-1">
            {latestYear.countryCount > previousYear.countryCount ? '+' : ''}
            {latestYear.countryCount - previousYear.countryCount} from last year
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 text-sm">Yearly Trend</h4>
        <div className="space-y-2">
          {data.slice(-5).reverse().map((year) => {
            return (
              <div key={year.year} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700 w-16">{year.year}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all"
                        style={{ width: `${year.diversityScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-900 w-12 text-right">
                      {year.diversityScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{year.genreCount} genres</span>
                    <span>•</span>
                    <span>{year.countryCount} countries</span>
                  </div>
                </div>
                {year.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {year.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                {year.trend === 'stable' && <Minus className="w-5 h-5 text-gray-400" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-semibold text-blue-900 mb-2">How is this calculated?</h5>
        <p className="text-sm text-blue-800">
          The Diversity Index combines genre variety (40%), country representation (40%),
          and content type balance (20%) to measure Netflix's catalog diversity.
          Higher scores indicate more diverse and globally inclusive content.
        </p>
      </div>
    </div>
  );
}
