interface BarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  title: string;
  maxValue?: number;
}

export default function BarChart({ data, title, maxValue }: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-32 text-sm font-medium text-gray-700 truncate">
              {item.label}
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{
                    width: `${(item.value / max) * 100}%`,
                    backgroundColor: item.color || '#e50914'
                  }}
                >
                  {(item.value / max) * 100 > 15 && (
                    <span className="text-xs font-semibold text-white">
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
              {(item.value / max) * 100 <= 15 && (
                <span className="text-xs font-semibold text-gray-600 w-8">
                  {item.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
