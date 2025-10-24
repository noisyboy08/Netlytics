import { NetflixContent } from '../types/netflix';

export function getRecommendations(
  selectedContent: NetflixContent,
  allContent: NetflixContent[],
  limit: number = 5
): NetflixContent[] {
  const selectedGenres = selectedContent.listed_in.split(',').map(g => g.trim());
  const selectedCountries = selectedContent.country.split(',').map(c => c.trim());

  const scored = allContent
    .filter(item => item.show_id !== selectedContent.show_id)
    .map(item => {
      let score = 0;

      if (item.type === selectedContent.type) {
        score += 3;
      }

      const itemGenres = item.listed_in.split(',').map(g => g.trim());
      const genreOverlap = itemGenres.filter(g => selectedGenres.includes(g)).length;
      score += genreOverlap * 2;

      const itemCountries = item.country.split(',').map(c => c.trim());
      const countryOverlap = itemCountries.filter(c => selectedCountries.includes(c)).length;
      score += countryOverlap * 1.5;

      if (item.rating === selectedContent.rating) {
        score += 1;
      }

      const yearDiff = Math.abs(item.release_year - selectedContent.release_year);
      if (yearDiff <= 2) {
        score += 2;
      } else if (yearDiff <= 5) {
        score += 1;
      }

      if (selectedContent.type === 'Movie' && item.type === 'Movie') {
        const selectedDuration = parseInt(selectedContent.duration);
        const itemDuration = parseInt(item.duration);
        if (!isNaN(selectedDuration) && !isNaN(itemDuration)) {
          const durationDiff = Math.abs(selectedDuration - itemDuration);
          if (durationDiff <= 20) {
            score += 1;
          }
        }
      }

      return { content: item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.content);

  return scored;
}

export function calculateSimilarityScore(content1: NetflixContent, content2: NetflixContent): number {
  let score = 0;

  if (content1.type === content2.type) score += 20;

  const genres1 = content1.listed_in.split(',').map(g => g.trim());
  const genres2 = content2.listed_in.split(',').map(g => g.trim());
  const genreOverlap = genres1.filter(g => genres2.includes(g)).length;
  score += genreOverlap * 15;

  const countries1 = content1.country.split(',').map(c => c.trim());
  const countries2 = content2.country.split(',').map(c => c.trim());
  const countryOverlap = countries1.filter(c => countries2.includes(c)).length;
  score += countryOverlap * 10;

  if (content1.rating === content2.rating) score += 5;

  const yearDiff = Math.abs(content1.release_year - content2.release_year);
  score += Math.max(0, 10 - yearDiff);

  return score;
}
