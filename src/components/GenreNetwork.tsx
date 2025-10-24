import { useMemo } from 'react';

interface GenreConnection {
  genre1: string;
  genre2: string;
  count: number;
}

interface GenreNetworkProps {
  data: GenreConnection[];
}

export default function GenreNetwork({ data }: GenreNetworkProps) {
  const topConnections = useMemo(() => {
    return [...data].sort((a, b) => b.count - a.count).slice(0, 15);
  }, [data]);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    topConnections.forEach(conn => {
      genres.add(conn.genre1);
      genres.add(conn.genre2);
    });
    return Array.from(genres);
  }, [topConnections]);

  const maxCount = Math.max(...topConnections.map(c => c.count));

  const getLineWidth = (count: number) => {
    return Math.max(2, (count / maxCount) * 8);
  };

  const getOpacity = (count: number) => {
    return 0.3 + (count / maxCount) * 0.7;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Genre Co-occurrence Network
      </h3>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-8 min-h-[400px]">
            <svg viewBox="0 0 600 400" className="w-full h-full">
              {allGenres.map((genre, i) => {
                const angle = (i / allGenres.length) * 2 * Math.PI;
                const x = 300 + Math.cos(angle) * 200;
                const y = 200 + Math.sin(angle) * 150;

                return (
                  <g key={genre}>
                    <circle cx={x} cy={y} r="25" fill="#e50914" opacity="0.9" />
                    <text
                      x={x}
                      y={y + 35}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="600"
                      fill="#374151"
                    >
                      {genre}
                    </text>
                  </g>
                );
              })}

              {topConnections.map((conn, i) => {
                const idx1 = allGenres.indexOf(conn.genre1);
                const idx2 = allGenres.indexOf(conn.genre2);

                if (idx1 === -1 || idx2 === -1) return null;

                const angle1 = (idx1 / allGenres.length) * 2 * Math.PI;
                const x1 = 300 + Math.cos(angle1) * 200;
                const y1 = 200 + Math.sin(angle1) * 150;

                const angle2 = (idx2 / allGenres.length) * 2 * Math.PI;
                const x2 = 300 + Math.cos(angle2) * 200;
                const y2 = 200 + Math.sin(angle2) * 150;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#e50914"
                    strokeWidth={getLineWidth(conn.count)}
                    opacity={getOpacity(conn.count)}
                  />
                );
              })}
            </svg>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Thicker lines indicate stronger genre combinations
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900 mb-3">Top Combinations</h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {topConnections.map((conn, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-900">
                    #{index + 1}
                  </span>
                  <span className="text-sm font-bold text-red-600">{conn.count}</span>
                </div>
                <div className="text-sm text-gray-700">
                  {conn.genre1} <span className="text-gray-400">+</span> {conn.genre2}
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-red-600 h-1.5 rounded-full"
                    style={{ width: `${(conn.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
