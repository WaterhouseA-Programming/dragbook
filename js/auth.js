// DragBook auth helpers + nav state
// Requires window.sb (from supabase-client.js)

window.dragbook = window.dragbook || {};

window.dragbook.signUp = async function ({ email, password, accountType, displayName }) {
  const { data, error } = await window.sb.auth.signUp({
    email,
    password,
    options: { data: { account_type: accountType, display_name: displayName } }
  });
  if (error) throw error;

  // Create the dragbook_profiles row. If email confirmation is on, there is no
  // session yet and this insert will be blocked by RLS — we retry on first login.
  if (data.session && data.user) {
    const { error: pErr } = await window.sb.from('dragbook_profiles').insert({
      id: data.user.id,
      account_type: accountType,
      display_name: displayName || null
    });
    if (pErr && pErr.code !== '23505') throw pErr;
  }
  return data;
};

window.dragbook.signIn = async function ({ email, password }) {
  const { data, error } = await window.sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  await window.dragbook.ensureProfile();
  return data;
};

window.dragbook.signOut = async function () {
  await window.sb.auth.signOut();
  window.location.href = 'dragbook.html';
};

// Make sure a dragbook_profiles row exists for the current user.
// Called after sign-in in case sign-up happened before email confirmation.
window.dragbook.ensureProfile = async function () {
  const { data: { user } } = await window.sb.auth.getUser();
  if (!user) return null;

  const { data: existing } = await window.sb
    .from('dragbook_profiles')
    .select('id, account_type, display_name')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) return existing;

  const meta = user.user_metadata || {};
  const accountType = meta.account_type === 'performer' ? 'performer' : 'booker';

  const { data: created, error } = await window.sb
    .from('dragbook_profiles')
    .insert({
      id: user.id,
      account_type: accountType,
      display_name: meta.display_name || null
    })
    .select()
    .single();
  if (error) throw error;
  return created;
};

window.dragbook.getProfile = async function () {
  const { data: { user } } = await window.sb.auth.getUser();
  if (!user) return null;
  const { data } = await window.sb
    .from('dragbook_profiles')
    .select('id, account_type, display_name, is_admin')
    .eq('id', user.id)
    .maybeSingle();
  return data ? { ...data, email: user.email } : null;
};

// Replace the contents of <ul class="nav-links"> based on auth state.
// The nav HTML on each page is the source of the logged-out version; this
// function rewrites it after the SDK reports a session.
window.dragbook.renderNav = async function () {
  const nav = document.querySelector('nav .nav-links');
  if (!nav) return;

  const profile = await window.dragbook.getProfile();
  if (!profile) return; // keep the logged-out nav as authored

  const isPerformer = profile.account_type === 'performer';
  const initial = (profile.display_name || profile.email || '?').trim().charAt(0).toUpperCase();
  const dashHref = isPerformer ? 'dragbook-profile-edit.html' : 'dragbook-browse.html';
  const dashLabel = isPerformer ? 'My Listing' : 'Find Performers';

  const adminLink = profile.is_admin ? '<li><a href="dragbook-admin.html">Admin</a></li>' : '';
  nav.innerHTML = `
    <li><a href="dragbook-browse.html">Find Performers</a></li>
    <li><a href="dragbook-inbox.html">Inbox</a></li>
    <li><a href="${dashHref}">${dashLabel}</a></li>
    ${adminLink}
    <li><a href="#" id="dragbook-signout" class="btn-nav">${initial} · Sign out</a></li>
  `;

  const out = document.getElementById('dragbook-signout');
  if (out) out.addEventListener('click', (e) => { e.preventDefault(); window.dragbook.signOut(); });
};

// Tiny toast shown for any [data-coming-soon] anchor click.
window.dragbook.toast = function (text) {
  let host = document.getElementById('dragbook-toast');
  if (!host) {
    host = document.createElement('div');
    host.id = 'dragbook-toast';
    host.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1A0020;border:1px solid rgba(255,45,120,0.4);color:#FFE8FF;padding:12px 22px;border-radius:100px;font-family:"DM Sans",sans-serif;font-size:0.9rem;z-index:10000;box-shadow:0 10px 40px rgba(0,0,0,0.5);opacity:0;transition:opacity 0.25s;pointer-events:none;';
    document.body.appendChild(host);
  }
  host.textContent = text;
  host.style.opacity = '1';
  clearTimeout(window.dragbook._toastT);
  window.dragbook._toastT = setTimeout(() => { host.style.opacity = '0'; }, 2400);
};

function wireComingSoon() {
  document.querySelectorAll('[data-coming-soon]').forEach((el) => {
    if (el.dataset.csWired) return;
    el.dataset.csWired = '1';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const label = el.getAttribute('data-coming-soon') || 'This';
      window.dragbook.toast(`${label} is coming soon ✨`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.sb) window.dragbook.renderNav();
  wireComingSoon();
});
