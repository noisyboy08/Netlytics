import { NetflixContent } from '../types/netflix';

export function generateExtendedDataset(): NetflixContent[] {
  const baseData: NetflixContent[] = [
    {
      show_id: 's1',
      type: 'Movie',
      title: 'The Irishman',
      director: 'Martin Scorsese',
      cast: 'Robert De Niro, Al Pacino, Joe Pesci',
      country: 'United States',
      date_added: '2019-11-27',
      release_year: 2019,
      rating: 'R',
      duration: '209 min',
      listed_in: 'Crime, Drama',
      description: 'An epic saga of organized crime in post-war America told through the eyes of World War II veteran Frank Sheeran.'
    },
    {
      show_id: 's2',
      type: 'TV Show',
      title: 'Stranger Things',
      director: 'The Duffer Brothers',
      cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder',
      country: 'United States',
      date_added: '2016-07-15',
      release_year: 2016,
      rating: 'TV-14',
      duration: '4 Seasons',
      listed_in: 'Horror, Sci-Fi, Thriller',
      description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces.'
    },
    {
      show_id: 's3',
      type: 'Movie',
      title: 'Roma',
      director: 'Alfonso Cuarón',
      cast: 'Yalitza Aparicio, Marina de Tavira',
      country: 'Mexico',
      date_added: '2018-12-14',
      release_year: 2018,
      rating: 'R',
      duration: '135 min',
      listed_in: 'Drama, International',
      description: 'A story that chronicles a year in the life of a middle-class family in Mexico City in the early 1970s.'
    },
    {
      show_id: 's4',
      type: 'TV Show',
      title: 'The Crown',
      director: 'Peter Morgan',
      cast: 'Claire Foy, Olivia Colman, Imelda Staunton',
      country: 'United Kingdom',
      date_added: '2016-11-04',
      release_year: 2016,
      rating: 'TV-MA',
      duration: '6 Seasons',
      listed_in: 'Drama, Historical',
      description: 'Follows the political rivalries and romance of Queen Elizabeth II and the events that shaped the second half of the 20th century.'
    },
    {
      show_id: 's5',
      type: 'Movie',
      title: 'Okja',
      director: 'Bong Joon-ho',
      cast: 'Tilda Swinton, Jake Gyllenhaal, An Seo Hyun',
      country: 'South Korea',
      date_added: '2017-06-28',
      release_year: 2017,
      rating: 'TV-MA',
      duration: '120 min',
      listed_in: 'Action, Adventure, Drama',
      description: 'A young girl risks everything to prevent a powerful corporation from kidnapping her best friend - a massive animal named Okja.'
    }
  ];

  const countries = ['United States', 'United Kingdom', 'India', 'South Korea', 'Spain', 'France', 'Japan', 'Canada', 'Australia', 'Brazil', 'Mexico', 'Germany', 'Italy', 'Argentina', 'Turkey', 'Netherlands', 'Thailand', 'Egypt', 'Nigeria', 'South Africa'];
  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Documentary', 'Crime', 'Fantasy', 'Animation', 'Adventure', 'Mystery', 'Family', 'Musical'];
  const ratings = ['G', 'PG', 'PG-13', 'R', 'TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'];

  const movieTitles = [
    'The Red Notebook', 'Beyond Tomorrow', 'Silent Echo', 'Desert Storm', 'City Lights', 'The Last Stand',
    'Midnight Run', 'Ocean\'s Secret', 'Mountain Peak', 'Forgotten Dreams', 'Racing Hearts', 'Broken Wings',
    'Steel City', 'Crystal Lake', 'Thunder Road', 'Whispers', 'Shadows Fall', 'Golden Hour', 'Dark Waters',
    'Bright Future', 'Lost Highway', 'The Crossing', 'Wild River', 'Summer Days', 'Winter\'s Tale', 'Paradise Found',
    'Deadly Game', 'Final Hour', 'Hidden Truth', 'Lone Wolf', 'Rising Sun', 'Falling Stars', 'Secret Garden'
  ];

  const tvTitles = [
    'The Detective', 'Family Matters', 'Crime Scene', 'Hospital Life', 'School Days', 'Office Stories',
    'Mystery Files', 'Love & Life', 'Tech Start', 'Law & Order', 'Time Travelers', 'Space Force',
    'The Agency', 'Power Play', 'City Watch', 'The Manor', 'Island Life', 'Road Trip', 'The Firm',
    'Dynasty', 'Empire', 'Kingdoms', 'The Protocol', 'Survival', 'Legends', 'Heroes', 'Warriors'
  ];

  for (let i = 0; i < 155; i++) {
    const type = Math.random() > 0.35 ? 'Movie' : 'TV Show';
    const titles = type === 'Movie' ? movieTitles : tvTitles;
    const year = 2008 + Math.floor(Math.random() * 14);
    const monthAdded = year + Math.floor(Math.random() * 2);
    const country = countries[Math.floor(Math.random() * countries.length)];
    const rating = ratings[Math.floor(Math.random() * ratings.length)];
    const genre1 = genres[Math.floor(Math.random() * genres.length)];
    const genre2 = genres[Math.floor(Math.random() * genres.length)];

    baseData.push({
      show_id: `s${baseData.length + 1}`,
      type,
      title: `${titles[i % titles.length]}${i > titles.length - 1 ? ' ' + Math.floor(i / titles.length) : ''}`.trim(),
      director: `Director ${Math.floor(Math.random() * 100)}`,
      cast: `Actor ${Math.floor(Math.random() * 200)}, Actor ${Math.floor(Math.random() * 200)}, Actor ${Math.floor(Math.random() * 200)}`,
      country,
      date_added: `${monthAdded}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      release_year: year,
      rating,
      duration: type === 'Movie' ? `${80 + Math.floor(Math.random() * 100)} min` : `${1 + Math.floor(Math.random() * 6)} Seasons`,
      listed_in: `${genre1}, ${genre2}`,
      description: `An engaging ${type.toLowerCase()} that explores themes of ${genre1.toLowerCase()} and ${genre2.toLowerCase()}.`
    });
  }

  return baseData;
}
