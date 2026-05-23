// BrowsePage.jsx
const { useState } = React;

function BrowsePage({ setPage }) {
  const [priceMax, setPriceMax] = useState(800);
  const [sort, setSort] = useState('Most Popular');
  const [checked, setChecked] = useState({ 'Hen Party': true, 'Travels UK-wide': true, '5 stars only': true });

  const toggle = key => setChecked(p => ({ ...p, [key]: !p[key] }));

  const FilterBlock = ({ title, children }) => (
    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: 22, marginBottom: 14 }}>
      <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <button style={{ background: 'none', border: 'none', color: 'var(--hot-pink)', fontSize: '0.68rem', cursor: 'none', fontFamily: 'var(--font-body)' }}>Clear</button>
      </div>
      {children}
    </div>
  );

  const Checkbox = ({ label, count }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'none' }}>
      <input type="checkbox" checked={!!checked[label]} onChange={() => toggle(label)} style={{ display: 'none' }} />
      <div style={{ width: 18, height: 18, borderRadius: 6, border: checked[label] ? 'none' : '1.5px solid rgba(255,255,255,0.2)', background: checked[label] ? 'linear-gradient(135deg,#FF2D78,#9B00FF)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
        {checked[label] && <span style={{ color: 'white', fontSize: '0.6rem', fontWeight: 700 }}>✓</span>}
      </div>
      <span style={{ fontSize: '0.86rem', color: 'var(--text-light)', fontWeight: 300, flex: 1 }}>{label}</span>
      {count && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 7px', borderRadius: 100 }}>{count}</span>}
    </label>
  );

  return (
    <div style={{ paddingTop: 80 }}>
      {/* HEADER */}
      <div style={{ padding: '40px 60px 0', position: 'relative', zIndex: 1 }}>
        <div className="eyebrow">Browse Performers</div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,2.6rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }}>
          Find Your Perfect <em style={{ fontStyle: 'italic', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Drag Star</em>
        </h1>
        {/* Search bar */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,45,120,0.25)', borderRadius: 100, padding: '6px 6px 6px 22px', gap: 0, alignItems: 'center', backdropFilter: 'blur(20px)', maxWidth: 860 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ opacity: .45, fontSize: '0.9rem' }}>🔍</span>
            <input placeholder="Search by name, style or act type…" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text-light)', fontFamily: 'var(--font-body)', fontSize: '0.92rem' }} />
          </div>
          <div style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.1)', margin: '0 14px' }} />
          <select style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', minWidth: 150 }}>
            <option>📍 All locations</option>
            {['London', 'Manchester', 'Birmingham', 'Brighton', 'Leeds', 'Glasgow', 'Bristol', 'Edinburgh'].map(c => <option key={c}>{c}</option>)}
          </select>
          <div style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.1)', margin: '0 14px' }} />
          <select style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', minWidth: 160 }}>
            <option>🎭 Any event type</option>
            {['Hen Party', 'Corporate Event', 'Wedding', 'Drag Bingo', 'Pride Event', 'Birthday Party'].map(t => <option key={t}>{t}</option>)}
          </select>
          <button className="btn-primary" style={{ padding: '12px 26px', fontSize: '0.86rem', marginLeft: 6 }}>Search 👑</button>
        </div>
      </div>

      {/* LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '268px 1fr', gap: 36, padding: '32px 60px 100px', alignItems: 'start' }}>
        {/* SIDEBAR */}
        <aside style={{ position: 'sticky', top: 100 }}>
          <FilterBlock title="Speciality Moves">
            {[['Will read your entire family', 0], ['Talks to your nan', 0], ['Unafraid of HR', 0], ['Has a catchphrase', 0], ['Genuinely terrifying', 0], ['Safe for work (allegedly)', 0], ['Cries at weddings (on purpose)', 0]].map(([l]) => <Checkbox key={l} label={l} />)}
          </FilterBlock>
          <FilterBlock title="Event Type">
            {[['Hen Party', 312], ['Corporate', 198], ['Wedding', 247], ['Drag Bingo', 156], ['Pride Events', 203], ['Birthday Party', 289]].map(([l, c]) => <Checkbox key={l} label={l} count={c} />)}
          </FilterBlock>
          <FilterBlock title="Act Style">
            {[['Live Singing', 178], ['Lip Sync', 340], ['Comedy / Hosting', 221], ['Drag King', 87], ['Drag DJ', 112]].map(([l, c]) => <Checkbox key={l} label={l} count={c} />)}
          </FilterBlock>
          <FilterBlock title="Budget (per event)">
            <div style={{ marginTop: 6 }}>
              <input type="range" min={100} max={2000} value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                style={{ width: '100%', appearance: 'none', height: 3, background: `linear-gradient(to right,#FF2D78 0%,#FF2D78 ${(priceMax - 100) / 19}%,rgba(255,255,255,0.1) ${(priceMax - 100) / 19}%)`, borderRadius: 100, outline: 'none', marginBottom: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>£100</span>
                <span style={{ color: 'var(--hot-pink)', fontWeight: 500 }}>Up to £{priceMax}</span>
                <span>£2,000+</span>
              </div>
            </div>
          </FilterBlock>
          <FilterBlock title="Availability">
            {['Available this weekend', 'Available next month', 'Travels UK-wide'].map(l => <Checkbox key={l} label={l} />)}
          </FilterBlock>
          <FilterBlock title="Rating">
            {['5 stars only', '4.5 stars & above', '4 stars & above'].map(l => <Checkbox key={l} label={l} />)}
          </FilterBlock>
          {/* Performer CTA */}
          <div style={{ background: 'linear-gradient(135deg,rgba(155,0,255,0.15),rgba(255,45,120,0.15))', border: '1px solid rgba(255,45,120,0.2)', borderRadius: 20, padding: 22 }}>
            <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>✨</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, marginBottom: 6, color: 'white' }}>Are you a performer?</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 14, fontWeight: 300 }}>List your act for free and start getting booked today.</p>
            <button onClick={() => setPage('pricing')} className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.82rem', textAlign: 'center' }}>List For Free 💄</button>
          </div>
        </aside>

        {/* RESULTS */}
        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Showing <strong style={{ color: 'var(--text-light)', fontWeight: 500 }}>312 performers</strong> near you</div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-light)', padding: '9px 14px', borderRadius: 12, fontFamily: 'var(--font-body)', fontSize: '0.8rem', outline: 'none' }}>
              {['Most Popular', 'Highest Rated', 'Lowest Price', 'Newest', 'Most Reviewed'].map(o => <option key={o} style={{ background: '#1A0020' }}>Sort: {o}</option>)}
            </select>
          </div>
          {/* Active filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20, alignItems: 'center' }}>
            {Object.entries(checked).filter(([, v]) => v).map(([k]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,45,120,0.1)', border: '1px solid rgba(255,45,120,0.3)', color: 'var(--hot-pink)', padding: '5px 12px', borderRadius: 100, fontSize: '0.74rem', fontWeight: 500 }}>
                {k} <button onClick={() => toggle(k)} style={{ background: 'none', border: 'none', color: 'var(--hot-pink)', cursor: 'none', fontSize: '0.8rem' }}>×</button>
              </div>
            ))}
            {Object.values(checked).some(Boolean) && <button onClick={() => setChecked({})} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.76rem', cursor: 'none', fontFamily: 'var(--font-body)', marginLeft: 'auto' }}>Clear all</button>}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 18 }}>
            {PERFORMERS.map(p => <PerformerCard key={p.name} {...p} onClick={() => setPage('profile')} />)}
            {/* Extra placeholders */}
            {[{name:'Priscilla Storm',location:'Bristol · South West',emoji:'🦋',gradient:'linear-gradient(135deg,#00F5FF,#FF2D78)',tags:['Hen Parties','Bottomless Brunch'],rating:4.9,reviews:33,price:340,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}},
              {name:'Midnight Fierce',location:'Edinburgh · Scotland',emoji:'🌙',gradient:'linear-gradient(135deg,#FFE600,#9B00FF)',tags:['Burlesque','Cabaret','Pride'],rating:4.7,reviews:22,price:280,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}}
            ].map(p => <PerformerCard key={p.name} {...p} onClick={() => setPage('profile')} />)}
          </div>
          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 52 }}>
            {['←', '1', '2', '3', '…', '12', '→'].map((p, i) => (
              <button key={i} style={{ width: 40, height: 40, borderRadius: 12, background: p === '1' ? 'linear-gradient(135deg,#FF2D78,#9B00FF)' : 'var(--card-bg)', border: p === '1' ? 'none' : '1px solid var(--border)', color: p === '…' ? 'var(--text-muted)' : p === '1' ? 'white' : 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', cursor: 'none', transition: 'all .2s' }}>{p}</button>
            ))}
          </div>
        </main>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

Object.assign(window, { BrowsePage });
