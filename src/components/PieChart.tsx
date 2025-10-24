interface PieChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  title: string;
}

export default function PieChart({ data, title }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['#e50914', '#0080ff', '#00c853', '#ff9800', '#9c27b0', '#607d8b'];

  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (currentAngle - 90) * (Math.PI / 180);

    const x1 = 50 + 45 * Math.cos(startRad);
    const y1 = 50 + 45 * Math.sin(startRad);
    const x2 = 50 + 45 * Math.cos(endRad);
    const y2 = 50 + 45 * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return {
      path: `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color || colors[index % colors.length],
      label: item.label,
      value: item.value,
      percentage: percentage.toFixed(1)
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            />
          ))}
        </svg>

        <div className="flex-1 space-y-2">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: segment.color }}
                ></div>
                <span className="text-sm text-gray-700">{segment.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {segment.value}
                </span>
                <span className="text-xs text-gray-500">
                  ({segment.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
