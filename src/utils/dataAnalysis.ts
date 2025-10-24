import { NetflixContent, ContentStats } from '../types/netflix';

export function analyzeNetflixData(data: NetflixContent[]): ContentStats {
  const totalMovies = data.filter(item => item.type === 'Movie').length;
  const totalTVShows = data.filter(item => item.type === 'TV Show').length;

  const years = data.map(item => item.release_year).filter(year => year);
  const yearRange = {
    start: Math.min(...years),
    end: Math.max(...years)
  };

  const countryCount: Record<string, number> = {};
  data.forEach(item => {
    if (item.country) {
      const countries = item.country.split(',').map(c => c.trim());
      countries.forEach(country => {
        countryCount[country] = (countryCount[country] || 0) + 1;
      });
    }
  });

  const topCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }));

  const genreCount: Record<string, number> = {};
  data.forEach(item => {
    if (item.listed_in) {
      const genres = item.listed_in.split(',').map(g => g.trim());
      genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });

  const topGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([genre, count]) => ({ genre, count }));

  const yearData: Record<number, { movies: number; tvShows: number }> = {};
  data.forEach(item => {
    const year = item.release_year;
    if (!yearData[year]) {
      yearData[year] = { movies: 0, tvShows: 0 };
    }
    if (item.type === 'Movie') {
      yearData[year].movies++;
    } else {
      yearData[year].tvShows++;
    }
  });

  const contentByYear = Object.entries(yearData)
    .map(([year, counts]) => ({
      year: parseInt(year),
      movies: counts.movies,
      tvShows: counts.tvShows
    }))
    .sort((a, b) => a.year - b.year);

  const ratingCount: Record<string, number> = {};
  data.forEach(item => {
    if (item.rating) {
      ratingCount[item.rating] = (ratingCount[item.rating] || 0) + 1;
    }
  });

  const ratingDistribution = Object.entries(ratingCount)
    .sort((a, b) => b[1] - a[1])
    .map(([rating, count]) => ({ rating, count }));

  return {
    totalMovies,
    totalTVShows,
    totalContent: data.length,
    yearRange,
    topCountries,
    topGenres,
    contentByYear,
    ratingDistribution
  };
}
