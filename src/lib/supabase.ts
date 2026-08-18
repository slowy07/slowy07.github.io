import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ponytail: lazy init so missing env vars don't crash tests/SSR
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      import.meta.env.VITE_SUPABASE_URL ?? "",
      import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""
    );
  }
  return _client;
}
