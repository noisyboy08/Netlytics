import { useEffect, useState, useMemo } from 'react';
import { Film, Tv, Globe, TrendingUp, BarChart3, Database, Download, Search as SearchIcon } from 'lucide-react';
import { NetflixContent } from './types/netflix';
import { generateExtendedDataset } from './data/netflixData';
import { analyzeNetflixData } from './utils/dataAnalysis';
import { fetchNetflixContent, checkDatabasePopulated, seedDatabase } from './utils/seedDatabase';
import { getRecommendations } from './utils/recommendations';
import { downloadReport } from './utils/exportUtils';
import { calculateDiversityMetrics, analyzeGenreConnections, analyzeRegionalRepresentation, identifyGenreGaps, analyzeCountryDetails } from './utils/advancedAnalysis';
import StatCard from './components/StatCard';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import StrategicInsights from './components/StrategicInsights';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorState from './components/ErrorState';
import SearchFilters from './components/SearchFilters';
import ContentList from './components/ContentList';
import RecommendationModal from './components/RecommendationModal';
import WorldMap from './components/WorldMap';
import DiversityIndex from './components/DiversityIndex';
import GenreNetwork from './components/GenreNetwork';
import InclusionTracker from './components/InclusionTracker';

type TabType = 'overview' | 'insights' | 'explore' | 'advanced';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [dataset, setDataset] = useState<NetflixContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingDatabase, setUsingDatabase] = useState(false);
  const [selectedContent, setSelectedContent] = useState<NetflixContent | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    types: [] as string[],
    years: [] as number[],
    ratings: [] as string[],
    genres: [] as string[],
    countries: [] as string[]
  });

  useEffect(() => {
    initializeData();
  }, []);

  async function initializeData() {
    try {
      setLoading(true);
      setError(null);

      const isPopulated = await checkDatabasePopulated();

      if (isPopulated) {
        const dbData = await fetchNetflixContent();
        if (dbData.length > 0) {
          setDataset(dbData);
          setUsingDatabase(true);
          setLoading(false);
          return;
        }
      }

      const localData = generateExtendedDataset();
      setDataset(localData);

      const seedResult = await seedDatabase(localData);
      if (seedResult.success) {
        setUsingDatabase(true);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error initializing data:', err);
      const localData = generateExtendedDataset();
      setDataset(localData);
      setUsingDatabase(false);
      setLoading(false);
    }
  }

  const filteredDataset = useMemo(() => {
    return dataset.filter(item => {
      if (filters.search && !item.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.director.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.cast.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.country.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.types.length > 0 && !filters.types.includes(item.type)) return false;
      if (filters.years.length > 0 && !filters.years.includes(item.release_year)) return false;
      if (filters.ratings.length > 0 && !filters.ratings.includes(item.rating)) return false;
      if (filters.genres.length > 0) {
        const itemGenres = item.listed_in.split(',').map(g => g.trim());
        if (!filters.genres.some(g => itemGenres.includes(g))) return false;
      }
      if (filters.countries.length > 0) {
        const itemCountries = item.country.split(',').map(c => c.trim());
        if (!filters.countries.some(c => itemCountries.includes(c))) return false;
      }
      return true;
    });
  }, [dataset, filters]);

  const stats = useMemo(() => {
    if (filteredDataset.length === 0) return null;
    return analyzeNetflixData(filteredDataset);
  }, [filteredDataset]);

  const filterOptions = useMemo(() => {
    const types = Array.from(new Set(dataset.map(d => d.type)));
    const years = Array.from(new Set(dataset.map(d => d.release_year))).sort((a, b) => b - a);
    const ratings = Array.from(new Set(dataset.map(d => d.rating))).filter(r => r);
    const genres = Array.from(new Set(dataset.flatMap(d => d.listed_in.split(',').map(g => g.trim())))).sort();
    const countries = Array.from(new Set(dataset.flatMap(d => d.country.split(',').map(c => c.trim())))).sort();
    return { types, years, ratings, genres, countries };
  }, [dataset]);

  const recommendations = useMemo(() => {
    if (!selectedContent) return [];
    return getRecommendations(selectedContent, dataset);
  }, [selectedContent, dataset]);

  const diversityData = useMemo(() => calculateDiversityMetrics(dataset), [dataset]);
  const genreConnections = useMemo(() => analyzeGenreConnections(dataset), [dataset]);
  const regionData = useMemo(() => analyzeRegionalRepresentation(dataset), [dataset]);
  const genreGaps = useMemo(() => identifyGenreGaps(dataset), [dataset]);
  const countryDetails = useMemo(() => analyzeCountryDetails(dataset), [dataset]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={initializeData} />;
  }

  if (!stats) {
    return <ErrorState message="No data available" onRetry={initializeData} />;
  }

  const typeDistribution = [
    { label: 'Movies', value: stats.totalMovies, color: '#e50914' },
    { label: 'TV Shows', value: stats.totalTVShows, color: '#0080ff' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Film className="w-10 h-10 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white">Netflix Content Analytics</h1>
              <p className="text-red-100 mt-1">Strategic Insights & Content Trends Analysis (2008-2021)</p>
            </div>
          </div>

          {usingDatabase && (
            <div className="flex items-center gap-2 text-sm text-red-100 mb-4">
              <Database className="w-4 h-4" />
              <span>Data stored in Supabase</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <nav className="flex gap-2 mt-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  activeTab === 'overview'
                    ? 'bg-white text-red-600'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('explore')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm flex items-center gap-2 ${
                  activeTab === 'explore'
                    ? 'bg-white text-red-600'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                <SearchIcon className="w-4 h-4" />
                Explore
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  activeTab === 'advanced'
                    ? 'bg-white text-red-600'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                Advanced Analytics
              </button>
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                  activeTab === 'insights'
                    ? 'bg-white text-red-600'
                    : 'bg-red-700 text-white hover:bg-red-800'
                }`}
              >
                Strategic Insights
              </button>
            </nav>

            <button
              onClick={() => {
                downloadReport(stats);
              }}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold text-sm"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <SearchFilters
              options={filterOptions}
              filters={filters}
              onFilterChange={setFilters}
              resultCount={filteredDataset.length}
            />
            <ContentList
              content={filteredDataset}
              onSelectContent={setSelectedContent}
            />
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <DiversityIndex data={diversityData} />
              <WorldMap data={countryDetails} />
            </div>

            <GenreNetwork data={genreConnections} />

            <InclusionTracker
              regions={regionData}
              genreGaps={genreGaps}
            />
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Content"
                value={stats.totalContent.toLocaleString()}
                icon={BarChart3}
                trend={`${stats.yearRange.start} - ${stats.yearRange.end}`}
                color="#e50914"
              />
              <StatCard
                title="Movies"
                value={stats.totalMovies.toLocaleString()}
                icon={Film}
                trend={`${((stats.totalMovies / stats.totalContent) * 100).toFixed(1)}% of catalog`}
                color="#0080ff"
              />
              <StatCard
                title="TV Shows"
                value={stats.totalTVShows.toLocaleString()}
                icon={Tv}
                trend={`${((stats.totalTVShows / stats.totalContent) * 100).toFixed(1)}% of catalog`}
                color="#00c853"
              />
              <StatCard
                title="Countries"
                value={stats.topCountries.length}
                icon={Globe}
                trend="Global content reach"
                color="#ff9800"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-600">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Executive Summary</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Analysis of <strong>{stats.totalContent.toLocaleString()} content items</strong> reveals Netflix's strategic positioning
                    in the competitive streaming market. With a <strong>{((stats.totalMovies / stats.totalContent) * 100).toFixed(1)}% movies</strong> to{' '}
                    <strong>{((stats.totalTVShows / stats.totalContent) * 100).toFixed(1)}% TV shows</strong> split, the platform maintains
                    a balanced portfolio. Content spans <strong>{stats.yearRange.start} to {stats.yearRange.end}</strong>, with strong
                    representation from <strong>{stats.topCountries[0]?.country}</strong> leading global contributions. This diversity
                    positions Netflix to compete effectively against Amazon Prime, Disney+, and regional OTT platforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <PieChart
                data={typeDistribution}
                title="Content Type Distribution"
              />
              <BarChart
                data={stats.ratingDistribution.slice(0, 8).map(item => ({
                  label: item.rating,
                  value: item.count,
                  color: '#e50914'
                }))}
                title="Content Rating Distribution"
              />
            </div>

            <LineChart
              data={stats.contentByYear.filter(d => d.year >= 2008)}
              title="Content Growth Trend (Movies vs TV Shows)"
            />

            <div className="grid lg:grid-cols-2 gap-6">
              <BarChart
                data={stats.topCountries.slice(0, 10).map(item => ({
                  label: item.country,
                  value: item.count,
                  color: '#0080ff'
                }))}
                title="Top 10 Content-Producing Countries"
              />
              <BarChart
                data={stats.topGenres.slice(0, 10).map(item => ({
                  label: item.genre,
                  value: item.count,
                  color: '#00c853'
                }))}
                title="Top 10 Genres"
              />
            </div>

            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Key Findings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Content Evolution</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Steady growth in both movies and TV shows from 2008-2021</li>
                    <li>• Significant acceleration in content acquisition post-2015</li>
                    <li>• TV Show investment increased to compete with traditional networks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Global Strategy</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Strong US content foundation with expanding international library</li>
                    <li>• Successful original content from India, South Korea, and UK</li>
                    <li>• Growing investment in regional content for local markets</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Genre Diversity</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Drama and Comedy dominate but niche genres growing</li>
                    <li>• Documentary content surge indicates educational content demand</li>
                    <li>• International genres bringing new audience segments</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Competitive Position</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Diverse catalog differentiates from Disney+ family focus</li>
                    <li>• Original content strategy counters Amazon Prime's library</li>
                    <li>• Regional content addresses OTT platform competition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && <StrategicInsights />}
      </main>

      {selectedContent && (
        <RecommendationModal
          selectedContent={selectedContent}
          recommendations={recommendations}
          onClose={() => setSelectedContent(null)}
          onSelectContent={setSelectedContent}
        />
      )}

      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm">
              Netflix Content Analytics Dashboard • Data Analysis Period: 2008-2021 •
              Dataset: {stats.totalContent.toLocaleString()} Records
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Strategic insights for content acquisition and production decision-making
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
