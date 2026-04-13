import { createClient } from '@supabase/supabase-js';

// 这里需要替换为实际的Supabase项目信息
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);