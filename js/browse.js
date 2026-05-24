// dragbook-browse.html page logic — fetches dragbook_performers from Supabase
// and renders cards. RLS limits anon clients to rows where published = true.

(function () {
  const gradients = ['g1','g2','g3','g4','g5','g6','g7','g8'];
  const emojis = ['👑','💜','⚡','💎','🌟','💋','🎀','🌙'];

  const grid = document.getElementById('performers-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('results-count');
  const searchInput = document.getElementById('search-input');
  const locationSelect = document.getElementById('location-select');
  const searchGo = document.getElementById('search-go');

  if (!grid) return;

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function priceLabel(pennies) {
    if (pennies == null) return 'POA';
    const pounds = Math.round(pennies / 100);
    return `from £${pounds.toLocaleString()}`;
  }

  function cardHTML(row, i) {
    const g = gradients[i % gradients.length];
    const emoji = emojis[i % emojis.length];
    const tags = (row.styles || []).slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('');
    const heroBg = row.hero_image_url
      ? `style="background-image:url('${escapeHtml(row.hero_image_url)}');background-size:cover;background-position:center;"`
      : '';
    const heroInner = row.hero_image_url ? '' : emoji;
    const location = row.city ? `📍 ${escapeHtml(row.city)}` : '📍 UK';
    const tagline = row.tagline ? `<div class="card-location" style="margin-top:4px;font-style:italic;opacity:0.85;">${escapeHtml(row.tagline)}</div>` : '';

    return `
      <div class="performer-card" data-id="${escapeHtml(row.id)}" style="cursor:pointer;">
        <div class="card-image" ${heroBg}>
          <div class="card-image-inner ${g}">${heroInner}</div>
          <div class="card-fav">🤍</div>
        </div>
        <div class="card-body">
          <div class="card-name">${escapeHtml(row.stage_name || 'Unnamed performer')}</div>
          <div class="card-location">${location}</div>
          ${tagline}
          <div class="card-tags">${tags}</div>
          <div class="card-footer">
            <div class="card-rating"><span class="stars">★★★★★</span> New</div>
            <div class="card-price">${priceLabel(row.base_price_pennies)} <span>/ event</span></div>
          </div>
          <button class="btn-book">View Profile →</button>
        </div>
      </div>
    `;
  }

  function pluralise(n, word) { return `${n} ${word}${n === 1 ? '' : 's'}`; }

  async function load() {
    if (!window.sb) {
      count.textContent = 'Could not connect.';
      return;
    }
    count.textContent = 'Loading performers…';
    grid.innerHTML = '';
    empty.style.display = 'none';

    let q = window.sb
      .from('dragbook_performers')
      .select('id, stage_name, tagline, city, base_price_pennies, styles, hero_image_url')
      .eq('published', true)
      .order('updated_at', { ascending: false })
      .limit(60);

    const term = (searchInput?.value || '').trim();
    const city = locationSelect?.value || '';

    if (city) q = q.ilike('city', city);
    if (term) {
      const safe = term.replace(/[%,()]/g, ' ');
      q = q.or(`stage_name.ilike.%${safe}%,tagline.ilike.%${safe}%,bio.ilike.%${safe}%`);
    }

    const { data, error } = await q;
    if (error) {
      console.error('[dragbook] load performers', error);
      count.textContent = 'Could not load performers.';
      return;
    }

    if (!data || data.length === 0) {
      count.innerHTML = 'Showing <strong>0 performers</strong>';
      empty.style.display = 'block';
      return;
    }

    count.innerHTML = `Showing <strong>${pluralise(data.length, 'performer')}</strong>`;
    grid.innerHTML = data.map(cardHTML).join('');

    grid.querySelectorAll('.performer-card').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        window.location.href = `dragbook-profile.html?id=${encodeURIComponent(id)}`;
      });
    });
  }

  let debounce;
  function reload() {
    clearTimeout(debounce);
    debounce = setTimeout(load, 250);
  }

  searchInput?.addEventListener('input', reload);
  locationSelect?.addEventListener('change', load);
  searchGo?.addEventListener('click', (e) => { e.preventDefault(); load(); });

  if (window.sb) {
    load();
  } else {
    document.addEventListener('DOMContentLoaded', load);
  }
})();
