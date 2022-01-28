import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(process.env.SUPABASE_URL || SUPABASE_URL, process.env.SUPABASE_KEY || SUPABASE_KEY, {
    fetch: fetch.bind(globalThis),
});
