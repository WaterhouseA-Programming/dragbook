// ProfilePage.jsx
const { useState } = React;

function ProfilePage({ setPage }) {
  const [activeTab, setActiveTab] = useState('about');

  const Tab = ({ id, label }) => (
    <button onClick={() => setActiveTab(id)} style={{ padding: '13px 22px', fontSize: '0.83rem', fontWeight: 500, color: activeTab === id ? 'white' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--font-body)', letterSpacing: '0.04em', position: 'relative', transition: 'color .2s', borderBottom: activeTab === id ? '2px solid #FF2D78' : '2px solid transparent' }}>{label}</button>
  );

  return (
    <div>
      {/* HERO */}
      <div style={{ paddingTop: 80, background: 'linear-gradient(to bottom,rgba(155,0,255,0.1),rgba(255,45,120,0.07),transparent)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', minHeight: 440 }}>
          <div style={{ background: 'linear-gradient(135deg,#FF2D78,#9B00FF,#00F5FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7rem', position: 'relative', overflow: 'hidden' }}>
            👑
            {['✨', '💫', '⭐', '🌟'].map((s, i) => (
              <span key={i} style={{ position: 'absolute', fontSize: i % 2 === 0 ? '1.5rem' : '1rem', opacity: .5, top: `${20 + i * 15}%`, left: `${10 + i * 10}%`, animation: `sparkle${i} 4s infinite ease-in-out` }}>{s}</span>
            ))}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 60%,#0A0008)' }} />
          </div>
          <div style={{ padding: '56px 56px 56px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.73rem', color: 'var(--text-muted)', marginBottom: 18 }}>
              <a href="#" onClick={e => { e.preventDefault(); setPage('browse'); }} style={{ color: 'var(--hot-pink)', textDecoration: 'none' }}>Browse</a>
              <span style={{ opacity: .4 }}>/</span>
              <span>London</span>
              <span style={{ opacity: .4 }}>/</span>
              <span style={{ color: 'var(--text-light)' }}>Scarlett Voltage</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem,5vw,3.8rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 10, color: 'white' }}>Scarlett<br />Voltage</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 300, fontStyle: 'italic', marginBottom: 18, lineHeight: 1.5 }}>"London's most electrifying drag host — where comedy meets chaos"</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 22 }}>
              {[['✓ Verified Performer', 'rgba(0,245,255,0.12)', 'rgba(0,245,255,0.35)', '#00F5FF'],
                ['🏆 Top Rated 2025', 'rgba(255,230,0,0.12)', 'rgba(255,230,0,0.35)', '#FFE600'],
                ['📍 London', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.1)', 'var(--text-muted)'],
                ['✈️ Travels UK-wide', 'rgba(155,0,255,0.1)', 'rgba(155,0,255,0.25)', '#C084FF']
              ].map(([label, bg, border, color]) => (
                <span key={label} style={{ background: bg, border: `1px solid ${border}`, color, padding: '6px 14px', borderRadius: 100, fontSize: '0.73rem', fontWeight: 500 }}>{label}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 32, marginBottom: 28 }}>
              {[['5.0', 'Rating'], ['47', 'Reviews'], ['120+', 'Events'], ['8yr', 'Experience']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ padding: '13px 30px' }}>💌 Send Enquiry</button>
              <button className="btn-secondary" style={{ padding: '13px 22px' }}>❤️ Save</button>
              <button className="btn-secondary" style={{ padding: '13px 18px' }}>↗️ Share</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes sparkle0{0%,100%{transform:translateY(0) rotate(0deg);opacity:.5}50%{transform:translateY(-10px) rotate(15deg);opacity:.9}} @keyframes sparkle1{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-8px);opacity:.8}} @keyframes sparkle2{0%,100%{transform:translateY(0) rotate(0);opacity:.4}50%{transform:translateY(-12px) rotate(20deg);opacity:.85}} @keyframes sparkle3{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(-9px);opacity:.9}}`}</style>

      {/* BODY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 36, padding: '52px 60px 100px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
        <main>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 36 }}>
            <Tab id="about" label="About" />
            <Tab id="services" label="Services & Pricing" />
            <Tab id="media" label="Photos & Video" />
            <Tab id="reviews" label="Reviews (47)" />
          </div>

          {activeTab === 'about' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 14 }}>About Scarlett</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: 32 }}>
                Scarlett Voltage has been lighting up stages across London and beyond for <strong style={{ color: 'var(--text-light)', fontWeight: 500 }}>8 years</strong>. Trained in musical theatre, comedy, and the fine art of dramatic lip sync, Scarlett brings a unique blend of <strong style={{ color: 'var(--text-light)', fontWeight: 500 }}>jaw-dropping performance, sharp wit, and audience chaos</strong> to every event she graces.<br /><br />
                Whether she's hosting a hen party bingo that descends beautifully into carnage, crashing a wedding as a surprise guest (the bride always cries, in a good way), or running a corporate team-building drag workshop that HR will be talking about for years — Scarlett arrives in full costume, full personality, and absolutely zero chill.
              </p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 14 }}>Event Types</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {['🥂 Hen Parties', '🎯 Drag Bingo', '💼 Corporate Events', '💍 Weddings', '🎂 Birthdays', '🌈 Pride Events', '🥂 Bottomless Brunch', '🎪 Festivals', '🎭 Cabaret Nights'].map(t => (
                  <span key={t} style={{ background: 'rgba(155,0,255,0.1)', border: '1px solid rgba(155,0,255,0.2)', color: '#C084FF', padding: '7px 16px', borderRadius: 100, fontSize: '0.8rem' }}>{t}</span>
                ))}
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 14 }}>What to Expect</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['🎤', 'Live Performance', 'Full 45–90 min show with costume changes, live vocals and comedy. Tailored to your group and event.'],
                  ['🎭', 'Custom Show', 'Pre-event consultation to build bespoke setlists, jokes and crowd-work specific to your guests.'],
                  ['📋', 'Rider Requirements', 'Private dressing room with mirror and lighting, PA system, 30 mins setup time.'],
                  ['✅', 'Fully Insured', 'Public liability insurance held. DBS checked. Safe to work with 18+ groups. Inclusive and professional.']
                ].map(([ic, title, desc]) => (
                  <div key={title} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 18 }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: 7 }}>{ic}</div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 500, color: 'white', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 300 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 14 }}>Services & Pricing</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.6, marginBottom: 24, fontWeight: 300 }}>All prices are starting from rates. Final quote depends on travel, event duration, and any custom requirements.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[['🎤', 'Cabaret Show', 'Full 60–90 min drag show. Multiple costume changes, live singing, lip sync, comedy, audience interaction and a grand finale.', '£480'],
                  ['🎯', 'Drag Bingo Host', '2 hours of drag-hosted bingo chaos. Includes prize coordination, cheeky commentary, and audience games.', '£380'],
                  ['💍', 'Wedding Crasher', 'The legendary "It Should Have Been Me" surprise entrance during speeches. Kept secret from guests.', '£420'],
                  ['💼', 'Corporate Host', 'Professional drag MC for awards, team events, or product launches. Inclusive and adaptable.', '£550'],
                  ['🌈', 'Pop-Up Appearances', 'Walkabout drag entertainment for festivals, parties, or brand activations. 90 mins of roaming interaction.', '£300'],
                  ['🎓', 'Drag Workshop', 'Interactive 2-hour drag makeup and performance workshop for groups of 6–20.', '£600'],
                ].map(([ic, name, desc, price]) => (
                  <div key={name} data-hover style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, cursor: 'none', transition: 'border-color .2s,transform .2s' }}>
                    <div style={{ fontSize: '1.6rem', marginBottom: 9 }}>{ic}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5, marginBottom: 10 }}>{desc}</div>
                    <div style={{ fontSize: '0.86rem', color: 'var(--hot-pink)', fontWeight: 500 }}>from {price} / event</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 14 }}>Photos & Video</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                {[['👑', '#FF2D78,#9B00FF'], ['💃', '#9B00FF,#00F5FF'], ['🎤', '#FFE600,#FF2D78'], ['✨', '#00F5FF,#FF2D78'], ['🌈', '#FF2D78,#FFE600'], ['🎭', '#9B00FF,#FF2D78']].map(([ic, g], i) => (
                  <div key={i} style={{ borderRadius: 14, aspectRatio: '1', background: `linear-gradient(135deg,${g})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', cursor: 'none', transition: 'transform .2s' }}>{ic}</div>
                ))}
              </div>
              <div style={{ marginTop: 18, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, background: 'var(--grad-primary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>▶️</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.86rem', fontWeight: 500, color: 'white', marginBottom: 3 }}>Scarlett Voltage — Live Hen Party Showreel 2025</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>16 minutes · 4,200 views</div>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.76rem' }}>Watch ▶</button>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 18 }}>Reviews</h2>
              <div style={{ display: 'flex', gap: 28, alignItems: 'center', padding: 26, background: 'var(--card-bg)', borderRadius: 20, border: '1px solid var(--border)', marginBottom: 20 }}>
                <div style={{ textAlign: 'center', minWidth: 90 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>5.0</div>
                  <div style={{ color: 'var(--acid-yellow)', fontSize: '0.95rem', letterSpacing: 3, margin: '5px 0' }}>★★★★★</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>47 reviews</div>
                </div>
                <div style={{ flex: 1 }}>
                  {[[5, '91%'], [4, '7%'], [3, '2%'], [2, '0%'], [1, '0%']].map(([star, pct]) => (
                    <div key={star} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 7 }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', minWidth: 30 }}>{star} ★</span>
                      <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 100, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: pct, background: 'var(--grad-primary)', borderRadius: 100 }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', minWidth: 30, textAlign: 'right' }}>{pct}</span>
                    </div>
                  ))}
                </div>
              </div>
              {[
                { av: 'linear-gradient(135deg,#FF2D78,#9B00FF)', ic: '👰', name: 'Sophie T.', role: 'Hen party · London · Feb 2026', text: "Absolutely mind-blowing. Scarlett had the whole group in tears of laughter within five minutes. She remembered everyone's names, worked them into the bingo, and the final act was genuinely showstopping." },
                { av: 'linear-gradient(135deg,#FFE600,#FF2D78)', ic: '💼', name: 'Marcus P.', role: 'Corporate team event · Manchester · Jan 2026', text: "We were nervous about booking drag entertainment for a mixed corporate group but Scarlett was a total professional. She read the room perfectly — funny and cheeky without crossing any lines." },
                { av: 'linear-gradient(135deg,#00F5FF,#9B00FF)', ic: '💍', name: 'James & Olly', role: 'Wedding · Brighton · Oct 2025', text: "The wedding crasher moment was the highlight of our entire wedding. Everyone screamed. Our gran loved her. She stayed for an extra hour just chatting to guests." },
              ].map(r => (
                <div key={r.name} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.av, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{r.ic}</div>
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500, color: 'white' }}>{r.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 1 }}>{r.role}</div>
                      </div>
                    </div>
                    <span style={{ color: 'var(--acid-yellow)', fontSize: '0.78rem' }}>★★★★★</span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 300 }}>{r.text}</p>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,232,255,0.22)', marginTop: 9 }}>Verified booking via DragBook</div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* BOOKING WIDGET */}
        <aside>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-pink)', borderRadius: 24, padding: 26, position: 'sticky', top: 100, boxShadow: '0 20px 60px rgba(255,45,120,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 4 }}>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>from</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', fontWeight: 900, color: 'white' }}>£380</span>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>/ event</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 22, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--acid-yellow)', fontSize: '0.7rem' }}>★★★★★</span> 5.0 · 47 reviews
            </div>
            {[['Event Type', 'select', ['Hen Party', 'Corporate Event', 'Wedding', 'Drag Bingo', 'Birthday', 'Festival']],
              ['Event Date', 'date', []],
              ['Location / Venue', 'text', []],
            ].map(([label, type, opts]) => (
              <div key={label} style={{ marginBottom: 13 }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7, display: 'block' }}>{label}</label>
                {type === 'select' ? (
                  <select style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 12, padding: '11px 14px', color: 'var(--text-light)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', outline: 'none' }}>
                    <option style={{ background: '#1A0020' }}>Select {label.toLowerCase()}…</option>
                    {opts.map(o => <option key={o} style={{ background: '#1A0020' }}>{o}</option>)}
                  </select>
                ) : (
                  <input type={type} placeholder={type === 'text' ? 'City or venue name…' : undefined} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 12, padding: '11px 14px', color: 'var(--text-light)', fontFamily: 'var(--font-body)', fontSize: '0.86rem', outline: 'none', colorScheme: 'dark' }} />
                )}
              </div>
            ))}
            <button className="btn-primary" style={{ width: '100%', padding: 15, marginTop: 6, textAlign: 'center' }}>Send Enquiry 💌</button>
            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 10, lineHeight: 1.5 }}>Scarlett typically responds within 2 hours · No payment until confirmed</p>
            <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['🔒', 'Secure booking via DragBook'], ['💰', 'Deposit held safely until event'], ['✓', 'Verified performer · DBS checked'], ['🛡️', 'Publicly insured']].map(([ic, t]) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.78rem', color: 'var(--text-muted)' }}><span style={{ width: 22, textAlign: 'center' }}>{ic}</span>{t}</div>
              ))}
            </div>
          </div>

          {/* Similar */}
          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 13 }}>Similar Performers</div>
            {[['💜', 'linear-gradient(135deg,#9B00FF,#00F5FF)', 'Madam Glitterbomb', 'Manchester', 450],
              ['⚡', 'linear-gradient(135deg,#FFE600,#FF2D78)', 'Rex Havoc', 'Brighton', 320],
              ['🌈', 'linear-gradient(135deg,#FF2D78,#FFE600)', 'Nova Nightshade', 'Leeds', 295],
            ].map(([ic, g, name, loc, price]) => (
              <div key={name} data-hover onClick={() => { }} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 13, display: 'flex', gap: 12, marginBottom: 9, cursor: 'none', transition: 'border-color .2s,transform .2s' }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: g, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{ic}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, color: 'white' }}>{name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 3 }}>📍 {loc}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--hot-pink)', fontWeight: 500 }}>from £{price} / event</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
}

Object.assign(window, { ProfilePage });
