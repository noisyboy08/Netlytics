interface LineChartProps {
  data: Array<{ year: number; movies: number; tvShows: number }>;
  title: string;
}

export default function LineChart({ data, title }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => Math.max(d.movies, d.tvShows)));
  const chartHeight = 250;
  const chartWidth = 100;

  const moviePoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (d.movies / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  const tvPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * chartWidth;
    const y = chartHeight - (d.tvShows / maxValue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-64">
          <polyline
            points={moviePoints}
            fill="none"
            stroke="#e50914"
            strokeWidth="2"
            className="transition-all duration-500"
          />
          <polyline
            points={tvPoints}
            fill="none"
            stroke="#0080ff"
            strokeWidth="2"
            className="transition-all duration-500"
          />

          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * chartWidth;
            const yMovie = chartHeight - (d.movies / maxValue) * chartHeight;
            const yTV = chartHeight - (d.tvShows / maxValue) * chartHeight;

            return (
              <g key={i}>
                <circle cx={x} cy={yMovie} r="3" fill="#e50914" />
                <circle cx={x} cy={yTV} r="3" fill="#0080ff" />
              </g>
            );
          })}
        </svg>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#e50914] rounded"></div>
            <span className="text-sm text-gray-600">Movies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#0080ff] rounded"></div>
            <span className="text-sm text-gray-600">TV Shows</span>
          </div>
        </div>

        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.filter((_, i) => i % Math.ceil(data.length / 6) === 0).map((d, i) => (
            <span key={i}>{d.year}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
