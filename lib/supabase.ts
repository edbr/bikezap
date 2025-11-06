import { createClient } from "@supabase/supabase-js";

// Use environment variable *names*, not literal values
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
