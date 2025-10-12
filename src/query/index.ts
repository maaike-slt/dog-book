import { assert } from "@std/assert"
import { createClient } from "@supabase/supabase-js"

enum SupabaseEnvKey {
	VITE_SUPABASE_URL = "VITE_SUPABASE_URL",
	VITE_SUPABASE_PUBLISHABLE_KEY = "VITE_SUPABASE_PUBLISHABLE_KEY",
}

assert(
	import.meta.env[SupabaseEnvKey.VITE_SUPABASE_URL],
	`Environment variable '${SupabaseEnvKey.VITE_SUPABASE_URL}' is not set.`,
)
assert(
	import.meta.env[SupabaseEnvKey.VITE_SUPABASE_PUBLISHABLE_KEY],
	`Environment variable '${SupabaseEnvKey.VITE_SUPABASE_PUBLISHABLE_KEY}' is not set.`,
)

export const supabase = createClient(
	import.meta.env[SupabaseEnvKey.VITE_SUPABASE_URL],
	import.meta.env[SupabaseEnvKey.VITE_SUPABASE_PUBLISHABLE_KEY],
)
