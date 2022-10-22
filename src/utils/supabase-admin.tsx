import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_SECRET_KEY
const supabaseAdmin   = createClient(supabaseUrl, supabaseAnonKey)

export default supabaseAdmin