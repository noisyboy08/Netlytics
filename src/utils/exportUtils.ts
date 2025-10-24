import { NetflixContent, ContentStats } from '../types/netflix';

export function exportToCSV(data: NetflixContent[], filename: string = 'netflix-data.csv') {
  const headers = [
    'Show ID',
    'Type',
    'Title',
    'Director',
    'Cast',
    'Country',
    'Date Added',
    'Release Year',
    'Rating',
    'Duration',
    'Genres',
    'Description'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      item.show_id,
      item.type,
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.director.replace(/"/g, '""')}"`,
      `"${item.cast.replace(/"/g, '""')}"`,
      `"${item.country.replace(/"/g, '""')}"`,
      item.date_added,
      item.release_year,
      item.rating,
      item.duration,
      `"${item.listed_in.replace(/"/g, '""')}"`,
      `"${item.description.replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  downloadFile(csvContent, filename, 'text/csv');
}

export function generateReport(stats: ContentStats): string {
  const report = `
NETFLIX CONTENT ANALYTICS REPORT
Generated: ${new Date().toLocaleDateString()}
═══════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
─────────────────────────────────────────────────────────────
Total Content Items: ${stats.totalContent}
Movies: ${stats.totalMovies} (${((stats.totalMovies / stats.totalContent) * 100).toFixed(1)}%)
TV Shows: ${stats.totalTVShows} (${((stats.totalTVShows / stats.totalContent) * 100).toFixed(1)}%)
Content Period: ${stats.yearRange.start} - ${stats.yearRange.end}

TOP CONTENT PRODUCERS
─────────────────────────────────────────────────────────────
${stats.topCountries.map((c, i) => `${i + 1}. ${c.country.padEnd(20)} ${c.count} titles`).join('\n')}

TOP GENRES
─────────────────────────────────────────────────────────────
${stats.topGenres.map((g, i) => `${i + 1}. ${g.genre.padEnd(20)} ${g.count} titles`).join('\n')}

CONTENT RATINGS
─────────────────────────────────────────────────────────────
${stats.ratingDistribution.slice(0, 10).map((r, i) => `${i + 1}. ${r.rating.padEnd(10)} ${r.count} titles`).join('\n')}

STRATEGIC INSIGHTS
─────────────────────────────────────────────────────────────
1. STRENGTHS
   • Diverse global content portfolio
   • Balanced mix of movies and TV shows
   • Strong representation from top markets

2. OPPORTUNITIES
   • Expand in underrepresented regions
   • Invest in emerging genres
   • Strengthen regional partnerships

3. RECOMMENDATIONS
   • Increase content from Africa, Middle East, and Southeast Asia
   • Diversify genre portfolio to reduce market saturation
   • Focus on data-driven content acquisition
   • Build strategic partnerships with local creators

═══════════════════════════════════════════════════════════════
Report End
  `.trim();

  return report;
}

export function downloadReport(stats: ContentStats) {
  const report = generateReport(stats);
  downloadFile(report, 'netflix-analytics-report.txt', 'text/plain');
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
