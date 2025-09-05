import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Database table names
export const TABLES = {
  USERS: 'users',
  RIGHTS_GUIDES: 'rights_guides',
  SESSION_LOGS: 'session_logs',
  SCENARIO_SCRIPTS: 'scenario_scripts',
  SHAREABLE_CARDS: 'shareable_cards',
} as const;
