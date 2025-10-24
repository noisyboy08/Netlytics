import { AlertTriangle, TrendingUp, Globe } from 'lucide-react';

interface RegionData {
  region: string;
  count: number;
  percentage: number;
  status: 'overrepresented' | 'balanced' | 'underrepresented';
}

interface GenreGap {
  genre: string;
  count: number;
  potentialGrowth: string;
}

interface InclusionTrackerProps {
  regions: RegionData[];
  genreGaps: GenreGap[];
}

export default function InclusionTracker({ regions, genreGaps }: InclusionTrackerProps) {
  const underrepresented = regions.filter(r => r.status === 'underrepresented');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Accessibility & Inclusion Tracker
        </h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Underrepresented Regions
          </h4>
          <div className="space-y-3">
            {underrepresented.map((region, index) => (
              <div
                key={index}
                className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{region.region}</span>
                  <span className="text-sm font-bold text-orange-600">
                    {region.percentage}%
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {region.count} titles in catalog
                </div>
                <div className="bg-orange-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${region.percentage * 5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h5 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Strategic Recommendation
            </h5>
            <ul className="text-sm text-blue-800 space-y-1">
              {underrepresented.slice(0, 3).map((region, i) => (
                <li key={i}>
                  • Increase {region.region} content by at least {Math.ceil((5 - region.percentage) * 10)}% to improve global representation
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Genre Growth Opportunities</h4>
          <div className="space-y-3">
            {genreGaps.map((gap, index) => (
              <div
                key={index}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{gap.genre}</span>
                  <span className="text-sm font-bold text-green-600">{gap.count}</span>
                </div>
                <p className="text-sm text-gray-700">
                  Current titles: {gap.count}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-green-700 font-medium">
                    {gap.potentialGrowth}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Key Insight</h5>
            <p className="text-sm text-gray-700">
              Focusing on underrepresented regions and emerging genres can help Netflix
              differentiate from competitors and capture new audience segments before
              Amazon Prime and Disney+ expand into these markets.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-white">
        <h4 className="font-bold text-lg mb-3">Action Items for 2024-2025</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold mb-2">Regional Expansion</h5>
            <ul className="space-y-1 text-red-100">
              <li>• Partner with African studios for original content</li>
              <li>• Increase Middle Eastern content by 200%</li>
              <li>• Launch Southeast Asia acquisition team</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-2">Genre Development</h5>
            <ul className="space-y-1 text-red-100">
              <li>• Invest in Documentary series (high demand, low supply)</li>
              <li>• Expand Musical and Family genres</li>
              <li>• Create hybrid genre content (e.g., Sci-Fi + Drama)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
