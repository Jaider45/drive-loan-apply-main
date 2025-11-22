import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error('SUPABASE_URL is not defined in environment variables');
  }

  return createClient(supabaseUrl, supabaseKey);
};