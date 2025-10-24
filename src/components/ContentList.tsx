import { NetflixContent } from '../types/netflix';
import { Film, Tv, Calendar, MapPin, Star } from 'lucide-react';

interface ContentListProps {
  content: NetflixContent[];
  onSelectContent: (content: NetflixContent) => void;
}

export default function ContentList({ content, onSelectContent }: ContentListProps) {
  if (content.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-500">No content found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Content Library ({content.length} items)
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
        {content.map((item) => (
          <div
            key={item.show_id}
            onClick={() => onSelectContent(item)}
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
                  {item.listed_in.split(',').slice(0, 2).map((genre, i) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
