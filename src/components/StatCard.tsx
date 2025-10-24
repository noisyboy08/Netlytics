import { Video as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, color = '#e50914' }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-gray-500 mt-2">{trend}</p>
          )}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: color }}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
