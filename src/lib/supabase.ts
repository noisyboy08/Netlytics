import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface NetflixContentDB {
  id: string;
  show_id: string;
  type: string;
  title: string;
  director: string;
  cast_members: string;
  country: string;
  date_added: string | null;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
  description: string;
  created_at: string;
}
