import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://fpjhrxthajcdrqxwteje.supabase.co'

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwamhyeHRoYWpjZHJxeHd0ZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM1NDQ4NTgsImV4cCI6MjEwOTEyMDg1OH0.AoxnSPQXV-xSlN98-rMX4Ur34XnKgO1UwV-7hslVuhM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

