import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cncousntppzksodyxjqo.supabase.co';
const supabaseAnonKey = 'sb_publishable_FS-w9UFwVFHaT631Q_ARGw_gCTPkL7p';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
