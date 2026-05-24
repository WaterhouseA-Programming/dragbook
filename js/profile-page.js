// dragbook-profile.html page logic — reads ?id= and populates the static template
// with a live dragbook_performers row. Without an id we leave the static demo
// content alone so existing links keep working.

(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // Wire the Send Enquiry button regardless of whether we have an id —
  // without an id the button has nothing to enquire about.
  const enquireBtn = document.getElementById('send-enquiry-btn');
  if (enquireBtn) {
    enquireBtn.addEventListener('click', () => {
      if (!id) {
        if (window.dragbook && window.dragbook.toast) window.dragbook.toast('Open a real performer listing to send an enquiry.');
        return;
      }
      window.location.href = `dragbook-enquire.html?performer=${encodeURIComponent(id)}`;
    });
  }

  if (!id) return;

  const $ = (sel) => document.querySelector(sel);

  function setText(sel, text) {
    const el = typeof sel === 'string' ? $(sel) : sel;
    if (el && text != null && text !== '') el.textContent = text;
  }

  async function load() {
    if (!window.sb) return;
    const { data, error } = await window.sb
      .from('dragbook_performers')
      .select('id, stage_name, tagline, bio, city, base_price_pennies, styles, hero_image_url, published')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('[dragbook] load profile', error);
      return;
    }
    if (!data) {
      document.title = 'Not found · DragBook';
      const name = $('#profile-name');
      if (name) name.innerHTML = 'Performer not found';
      const tag = $('#profile-tagline');
      if (tag) tag.textContent = 'This listing may have been removed or unpublished.';
      const bio = $('#profile-bio');
      if (bio) bio.innerHTML = '<a href="dragbook-browse.html" style="color:var(--cyan);">Back to browse</a>';
      return;
    }

    document.title = `${data.stage_name} · DragBook`;

    setText('#profile-name', data.stage_name);
    setText('#profile-breadcrumb-name', data.stage_name);
    setText('#profile-about-heading', `About ${data.stage_name.split(' ')[0]}`);

    if (data.tagline) setText('#profile-tagline', `"${data.tagline}"`);
    else setText('#profile-tagline', '');

    if (data.city) {
      setText('#profile-breadcrumb-city', data.city);
      setText('#profile-location-badge', `📍 ${data.city}`);
    }

    if (data.bio) {
      const bioEl = $('#profile-bio');
      if (bioEl) bioEl.textContent = data.bio;
    }

    if (data.hero_image_url) {
      const visual = document.querySelector('.hero-visual');
      if (visual) {
        visual.style.backgroundImage = `url('${data.hero_image_url.replace(/'/g, "\\'")}')`;
        visual.style.backgroundSize = 'cover';
        visual.style.backgroundPosition = 'center';
        const main = visual.querySelector('span:not(.sparkle)');
        if (main) main.style.display = 'none';
      }
    }
  }

  if (window.sb) load();
  else document.addEventListener('DOMContentLoaded', load);
})();
