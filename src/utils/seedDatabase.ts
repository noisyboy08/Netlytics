import { supabase } from '../lib/supabase';
import { NetflixContent } from '../types/netflix';

export async function seedDatabase(data: NetflixContent[]): Promise<{ success: boolean; error?: string }> {
  try {
    const transformedData = data.map(item => ({
      show_id: item.show_id,
      type: item.type,
      title: item.title,
      director: item.director || '',
      cast_members: item.cast || '',
      country: item.country || '',
      date_added: item.date_added || null,
      release_year: item.release_year,
      rating: item.rating || '',
      duration: item.duration || '',
      listed_in: item.listed_in || '',
      description: item.description || ''
    }));

    const { error } = await supabase
      .from('netflix_content')
      .upsert(transformedData, { onConflict: 'show_id' });

    if (error) {
      console.error('Error seeding database:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error seeding database:', error);
    return { success: false, error: String(error) };
  }
}

export async function checkDatabasePopulated(): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('netflix_content')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error checking database:', error);
      return false;
    }

    return (count || 0) > 0;
  } catch (error) {
    console.error('Unexpected error checking database:', error);
    return false;
  }
}

export async function fetchNetflixContent(): Promise<NetflixContent[]> {
  try {
    const { data, error } = await supabase
      .from('netflix_content')
      .select('*')
      .order('release_year', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      return [];
    }

    return (data || []).map(item => ({
      show_id: item.show_id,
      type: item.type as 'Movie' | 'TV Show',
      title: item.title,
      director: item.director,
      cast: item.cast_members,
      country: item.country,
      date_added: item.date_added || '',
      release_year: item.release_year,
      rating: item.rating,
      duration: item.duration,
      listed_in: item.listed_in,
      description: item.description
    }));
  } catch (error) {
    console.error('Unexpected error fetching content:', error);
    return [];
  }
}
