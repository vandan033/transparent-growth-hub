// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lvtjadcpyudynhcaxygl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2dGphZGNweXVkeW5oY2F4eWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MDYwNTUsImV4cCI6MjA1NzM4MjA1NX0.1SaDd8bec1juX8Wr6VDPaItk9boGdhQGsKoDWMEVb9c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);