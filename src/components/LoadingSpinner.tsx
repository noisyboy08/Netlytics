import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Netflix Analytics</h2>
        <p className="text-gray-600">Preparing your data insights...</p>
      </div>
    </div>
  );
}
