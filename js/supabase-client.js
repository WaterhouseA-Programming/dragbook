// DragBook Supabase client
// Loaded as a regular script after the Supabase UMD CDN bundle.
// Exposes window.sb for use by auth.js and page scripts.

(function () {
  const SUPABASE_URL = 'https://lwhrnakucahaeieeeako.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_utFmwsLHcKequR2iTo7hSw_SryEiMFO';

  if (!window.supabase || !window.supabase.createClient) {
    console.error('[dragbook] supabase-js not loaded');
    return;
  }

  window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
})();
