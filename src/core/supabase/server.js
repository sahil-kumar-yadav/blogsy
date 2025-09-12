// src/core/supabase/server.js
import { createClient } from "@supabase/supabase-js"

const createServerClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
)

export default createServerClient
