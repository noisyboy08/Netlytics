import { Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function CompetitiveIntelligence() {
  const competitors = [
    {
      name: 'Amazon Prime Video',
      totalContent: 8200,
      recentAdds: 45,
      overlap: 23,
      focus: 'Sports & Live Events',
      threat: 'High',
      color: '#00A8E1'
    },
    {
      name: 'Disney+',
      totalContent: 1200,
      recentAdds: 18,
      overlap: 8,
      focus: 'Family & Franchises',
      threat: 'Medium',
      color: '#113CCF'
    },
    {
      name: 'HBO Max',
      totalContent: 2900,
      recentAdds: 32,
      overlap: 15,
      focus: 'Prestige Drama',
      threat: 'High',
      color: '#9B26B6'
    },
    {
      name: 'Apple TV+',
      totalContent: 280,
      recentAdds: 12,
      overlap: 3,
      focus: 'Quality over Quantity',
      threat: 'Medium',
      color: '#555555'
    }
  ];

  const competitiveGaps = [
    { genre: 'Sports Content', leader: 'Amazon Prime', gap: 'Critical', priority: 'High' },
    { genre: 'Prestige Drama', leader: 'HBO Max', gap: 'Moderate', priority: 'High' },
    { genre: 'Family Animation', leader: 'Disney+', gap: 'Moderate', priority: 'Medium' },
    { genre: 'Documentaries', leader: 'Netflix', gap: 'Leading', priority: 'Maintain' }
  ];

  return (
    <div className="space-y-6">
      <div className="chart-container">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-gray-100">Competitive Intelligence Dashboard</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {competitors.map((comp, i) => (
            <div
              key={i}
              className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: comp.color }}
                />
                <span
                  className={`px-2 py-0.5 text-xs font-bold rounded ${
                    comp.threat === 'High'
                      ? 'bg-red-600/20 text-red-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}
                >
                  {comp.threat} Threat
                </span>
              </div>
              <h4 className="font-bold text-gray-100 mb-3">{comp.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Content:</span>
                  <span className="font-bold text-gray-200">{comp.totalContent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Added (30d):</span>
                  <span className="font-bold text-green-400">+{comp.recentAdds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Overlap:</span>
                  <span className="font-bold text-orange-400">{comp.overlap}%</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-500 mb-1">Strategic Focus</div>
                  <div className="font-semibold text-purple-400">{comp.focus}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-400 mb-2">Market Dynamics Alert</h4>
              <p className="text-sm text-gray-300 mb-3">
                Amazon Prime Video is aggressively expanding sports and live content. HBO Max continues to dominate prestige drama. Disney+ maintains family content monopoly.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold rounded">High Competition</span>
                <span className="px-3 py-1 bg-orange-600/20 text-orange-400 text-xs font-bold rounded">Market Saturation</span>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded">Differentiation Needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold text-gray-100">Competitive Gap Analysis</h3>
        </div>

        <div className="space-y-3">
          {competitiveGaps.map((gap, i) => {
            const isLeading = gap.gap === 'Leading';
            const isCritical = gap.gap === 'Critical';

            return (
              <div
                key={i}
                className={`p-5 rounded-lg border transition-all ${
                  isLeading
                    ? 'bg-green-600/10 border-green-600/30'
                    : isCritical
                    ? 'bg-red-600/10 border-red-600/30'
                    : 'bg-yellow-600/10 border-yellow-600/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {isLeading ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-orange-400" />
                    )}
                    <div>
                      <h4 className="font-bold text-gray-100 mb-1">{gap.genre}</h4>
                      <div className="text-sm text-gray-400">Market Leader: <span className="font-semibold text-gray-300">{gap.leader}</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xl font-bold mb-1 ${
                        isLeading ? 'text-green-400' : isCritical ? 'text-red-400' : 'text-yellow-400'
                      }`}
                    >
                      {gap.gap}
                    </div>
                    <div className="text-xs text-gray-500">Gap Status</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Priority:</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      gap.priority === 'High'
                        ? 'bg-red-600/20 text-red-400'
                        : gap.priority === 'Medium'
                        ? 'bg-yellow-600/20 text-yellow-400'
                        : 'bg-blue-600/20 text-blue-400'
                    }`}
                  >
                    {gap.priority}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-5 bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-600/20 rounded-lg">
          <h4 className="font-bold text-purple-400 mb-3">Strategic Recommendations</h4>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span><strong>Expand International Content:</strong> Differentiate from US-focused competitors by doubling down on global originals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span><strong>Niche Genre Dominance:</strong> Own underserved categories like Horror, Thriller, and International Drama</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-0.5">•</span>
              <span><strong>Leverage Scale:</strong> Use data advantage to create hyper-targeted content for specific audience segments</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
