import { X, Film, Tv, Calendar, MapPin, Star, Sparkles } from 'lucide-react';
import { NetflixContent } from '../types/netflix';

interface RecommendationModalProps {
  selectedContent: NetflixContent;
  recommendations: NetflixContent[];
  onClose: () => void;
  onSelectContent: (content: NetflixContent) => void;
}

export default function RecommendationModal({
  selectedContent,
  recommendations,
  onClose,
  onSelectContent
}: RecommendationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Recommendations</h2>
            </div>
            <p className="text-gray-600">Based on your selection</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
            <h3 className="font-semibold text-gray-900 mb-2">You selected:</h3>
            <div className="flex items-start gap-3">
              {selectedContent.type === 'Movie' ? (
                <Film className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              ) : (
                <Tv className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              )}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg">{selectedContent.title}</h4>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedContent.release_year}
                  </span>
                  {selectedContent.rating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {selectedContent.rating}
                    </span>
                  )}
                  {selectedContent.country && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedContent.country.split(',')[0]}
                    </span>
                  )}
                </div>
                {selectedContent.listed_in && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContent.listed_in.split(',').map((genre, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white text-gray-700 text-xs rounded border"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-red-600" />
              You might also like:
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((item) => (
                <div
                  key={item.show_id}
                  onClick={() => {
                    onSelectContent(item);
                    onClose();
                  }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-red-500 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {item.title}
                    </h4>
                    {item.type === 'Movie' ? (
                      <Film className="w-5 h-5 text-red-600 ml-2 flex-shrink-0" />
                    ) : (
                      <Tv className="w-5 h-5 text-blue-600 ml-2 flex-shrink-0" />
                    )}
                  </div>

                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.release_year}</span>
                      {item.rating && (
                        <>
                          <span>•</span>
                          <Star className="w-4 h-4" />
                          <span>{item.rating}</span>
                        </>
                      )}
                    </div>

                    {item.country && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{item.country}</span>
                      </div>
                    )}

                    {item.listed_in && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.listed_in.split(',').slice(0, 3).map((genre, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {genre.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
