import { createClient } from '@supabase/supabase-js'

// anon public key — навмисно публічний, безпечний для фронтенду
// (RLS дозволяє лише INSERT у newsletter_subscribers, нічого більше)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
