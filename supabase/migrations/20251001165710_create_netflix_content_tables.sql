/*
  # Netflix Content Analysis Database Schema

  1. New Tables
    - `netflix_content`
      - `id` (uuid, primary key) - Unique identifier for each record
      - `show_id` (text, unique) - Netflix's unique show identifier
      - `type` (text) - Content type: 'Movie' or 'TV Show'
      - `title` (text) - Title of the content
      - `director` (text) - Director name(s)
      - `cast_members` (text) - Cast members (comma-separated)
      - `country` (text) - Production country/countries (comma-separated)
      - `date_added` (date) - Date when content was added to Netflix
      - `release_year` (integer) - Year of original release
      - `rating` (text) - Content rating (G, PG, PG-13, R, TV-MA, etc.)
      - `duration` (text) - Duration (minutes for movies, seasons for TV shows)
      - `listed_in` (text) - Genres/categories (comma-separated)
      - `description` (text) - Content description/synopsis
      - `created_at` (timestamptz) - Record creation timestamp

  2. Indexes
    - Index on `type` for filtering by content type
    - Index on `release_year` for temporal analysis
    - Index on `date_added` for acquisition tracking
    - Index on `country` for geographic analysis

  3. Security
    - Enable RLS on `netflix_content` table
    - Add policy for public read access (analytics dashboard is public)
    - This allows anyone to view and analyze the data

  4. Notes
    - Table stores comprehensive Netflix content data for analysis
    - Public read access enables dashboard to function without authentication
    - Data is intended for analytical purposes only
    - Future updates can be managed via backend processes
*/

CREATE TABLE IF NOT EXISTS netflix_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id text UNIQUE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  director text DEFAULT '',
  cast_members text DEFAULT '',
  country text DEFAULT '',
  date_added date,
  release_year integer NOT NULL,
  rating text DEFAULT '',
  duration text DEFAULT '',
  listed_in text DEFAULT '',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE netflix_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read netflix content"
  ON netflix_content
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_netflix_content_type ON netflix_content(type);
CREATE INDEX IF NOT EXISTS idx_netflix_content_release_year ON netflix_content(release_year);
CREATE INDEX IF NOT EXISTS idx_netflix_content_date_added ON netflix_content(date_added);
CREATE INDEX IF NOT EXISTS idx_netflix_content_country ON netflix_content USING gin(to_tsvector('english', country));