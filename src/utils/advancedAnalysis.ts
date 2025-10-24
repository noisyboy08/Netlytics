import { NetflixContent } from '../types/netflix';

export function calculateDiversityMetrics(data: NetflixContent[]) {
  const yearlyData: Record<number, {
    genres: Set<string>;
    countries: Set<string>;
    movies: number;
    tvShows: number;
  }> = {};

  data.forEach(item => {
    const year = item.release_year;
    if (!yearlyData[year]) {
      yearlyData[year] = {
        genres: new Set(),
        countries: new Set(),
        movies: 0,
        tvShows: 0
      };
    }

    item.listed_in.split(',').forEach(genre => {
      yearlyData[year].genres.add(genre.trim());
    });

    item.country.split(',').forEach(country => {
      yearlyData[year].countries.add(country.trim());
    });

    if (item.type === 'Movie') {
      yearlyData[year].movies++;
    } else {
      yearlyData[year].tvShows++;
    }
  });

  const diversityByYear = Object.entries(yearlyData).map(([year, data]) => {
    const genreCount = data.genres.size;
    const countryCount = data.countries.size;
    const total = data.movies + data.tvShows;
    const typeBalance = Math.min(data.movies, data.tvShows) / total;

    const diversityScore = Math.round(
      (genreCount / 15) * 40 +
      (countryCount / 20) * 40 +
      typeBalance * 20
    );

    return {
      year: parseInt(year),
      genreCount,
      countryCount,
      diversityScore: Math.min(100, diversityScore),
      trend: 'stable' as 'up' | 'down' | 'stable'
    };
  }).sort((a, b) => a.year - b.year);

  for (let i = 1; i < diversityByYear.length; i++) {
    const current = diversityByYear[i];
    const previous = diversityByYear[i - 1];
    if (current.diversityScore > previous.diversityScore + 2) {
      current.trend = 'up';
    } else if (current.diversityScore < previous.diversityScore - 2) {
      current.trend = 'down';
    }
  }

  return diversityByYear;
}

export function analyzeGenreConnections(data: NetflixContent[]) {
  const connections: Record<string, number> = {};

  data.forEach(item => {
    const genres = item.listed_in.split(',').map(g => g.trim());

    for (let i = 0; i < genres.length; i++) {
      for (let j = i + 1; j < genres.length; j++) {
        const key = [genres[i], genres[j]].sort().join('|');
        connections[key] = (connections[key] || 0) + 1;
      }
    }
  });

  return Object.entries(connections).map(([key, count]) => {
    const [genre1, genre2] = key.split('|');
    return { genre1, genre2, count };
  });
}

export function analyzeRegionalRepresentation(data: NetflixContent[]) {
  const regionMapping: Record<string, string> = {
    'United States': 'North America',
    'Canada': 'North America',
    'Mexico': 'Latin America',
    'Brazil': 'Latin America',
    'Argentina': 'Latin America',
    'United Kingdom': 'Europe',
    'France': 'Europe',
    'Germany': 'Europe',
    'Spain': 'Europe',
    'Italy': 'Europe',
    'Netherlands': 'Europe',
    'India': 'South Asia',
    'Japan': 'East Asia',
    'South Korea': 'East Asia',
    'China': 'East Asia',
    'Thailand': 'Southeast Asia',
    'Australia': 'Oceania',
    'Turkey': 'Middle East',
    'Egypt': 'Africa',
    'Nigeria': 'Africa',
    'South Africa': 'Africa'
  };

  const regionCounts: Record<string, number> = {};
  const totalContent = data.length;

  data.forEach(item => {
    const countries = item.country.split(',').map(c => c.trim());
    countries.forEach(country => {
      const region = regionMapping[country] || 'Other';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    });
  });

  return Object.entries(regionCounts).map(([region, count]) => {
    const percentage = (count / totalContent) * 100;
    let status: 'overrepresented' | 'balanced' | 'underrepresented';

    if (percentage > 30) status = 'overrepresented';
    else if (percentage > 10) status = 'balanced';
    else status = 'underrepresented';

    return { region, count, percentage: parseFloat(percentage.toFixed(2)), status };
  }).sort((a, b) => b.count - a.count);
}

export function identifyGenreGaps(data: NetflixContent[]) {
  const genreCounts: Record<string, number> = {};

  data.forEach(item => {
    item.listed_in.split(',').forEach(genre => {
      const g = genre.trim();
      genreCounts[g] = (genreCounts[g] || 0) + 1;
    });
  });

  const avgCount = Object.values(genreCounts).reduce((a, b) => a + b, 0) / Object.keys(genreCounts).length;

  return Object.entries(genreCounts)
    .filter(([_, count]) => count < avgCount)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 6)
    .map(([genre, count]) => ({
      genre,
      count,
      potentialGrowth: count < avgCount * 0.5 ? 'High potential' : 'Medium potential'
    }));
}

export function analyzeCountryDetails(data: NetflixContent[]) {
  const countryData: Record<string, {
    movies: number;
    tvShows: number;
    genres: Record<string, number>;
  }> = {};

  data.forEach(item => {
    item.country.split(',').forEach(country => {
      const c = country.trim();
      if (!countryData[c]) {
        countryData[c] = { movies: 0, tvShows: 0, genres: {} };
      }

      if (item.type === 'Movie') {
        countryData[c].movies++;
      } else {
        countryData[c].tvShows++;
      }

      item.listed_in.split(',').forEach(genre => {
        const g = genre.trim();
        countryData[c].genres[g] = (countryData[c].genres[g] || 0) + 1;
      });
    });
  });

  return Object.entries(countryData).map(([country, data]) => ({
    country,
    count: data.movies + data.tvShows,
    movies: data.movies,
    tvShows: data.tvShows,
    topGenre: Object.entries(data.genres).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
  })).sort((a, b) => b.count - a.count);
}
