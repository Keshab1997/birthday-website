const SUPABASE_URL = 'https://pnipelnqlmjkupnwuach.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuaXBlbG5xbG1qa3Vwbnd1YWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMjM3NjEsImV4cCI6MjA4NzY5OTc2MX0.16ZhxvUgjZKQiTJbx_nzTS42w0BjVIv3sPsmHH7puU4';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { _supabase };
