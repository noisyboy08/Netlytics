export interface NetflixContent {
  show_id: string;
  type: 'Movie' | 'TV Show';
  title: string;
  director: string;
  cast: string;
  country: string;
  date_added: string;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
  description: string;
}

export interface ContentStats {
  totalMovies: number;
  totalTVShows: number;
  totalContent: number;
  yearRange: { start: number; end: number };
  topCountries: Array<{ country: string; count: number }>;
  topGenres: Array<{ genre: string; count: number }>;
  contentByYear: Array<{ year: number; movies: number; tvShows: number }>;
  ratingDistribution: Array<{ rating: string; count: number }>;
}
