// Tiny Supabase REST helpers for Cloudflare Pages Functions (no SDK).
// Service-role calls bypass RLS for trusted server-side actions; the anon-key
// helper enforces the caller's auth token so RLS still applies.

export function publicEnv(env) {
  return {
    url: env.SUPABASE_URL || 'https://lwhrnakucahaeieeeako.supabase.co',
    anon: env.SUPABASE_ANON_KEY || env.SUPABASE_PUBLISHABLE_KEY,
    service: env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

async function rest({ url, key, jwt, method = 'GET', path, query, body, prefer }) {
  const headers = {
    apikey: key,
    Authorization: `Bearer ${jwt || key}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers.Prefer = prefer;
  const q = query ? '?' + new URLSearchParams(query).toString() : '';
  const res = await fetch(`${url}/rest/v1${path}${q}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok) {
    const err = new Error(`Supabase ${method} ${path} ${res.status}: ${text}`);
    err.status = res.status; err.body = data;
    throw err;
  }
  return data;
}

export function asService(env) {
  const { url, service } = publicEnv(env);
  if (!service) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
  return {
    select: (path, query) => rest({ url, key: service, path, query }),
    insert: (path, body) => rest({ url, key: service, path, method: 'POST', body, prefer: 'return=representation' }),
    update: (path, query, body) => rest({ url, key: service, path, query, method: 'PATCH', body, prefer: 'return=representation' }),
  };
}

export function asUser(env, jwt) {
  const { url, anon } = publicEnv(env);
  return {
    select: (path, query) => rest({ url, key: anon, jwt, path, query }),
    insert: (path, body) => rest({ url, key: anon, jwt, path, method: 'POST', body, prefer: 'return=representation' }),
    update: (path, query, body) => rest({ url, key: anon, jwt, path, query, method: 'PATCH', body, prefer: 'return=representation' }),
  };
}

export function bearerFromRequest(request) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.toLowerCase().startsWith('bearer ')) return null;
  return auth.slice(7).trim();
}
