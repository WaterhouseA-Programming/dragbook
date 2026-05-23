// PricingPage.jsx
const { useState } = React;

function PricingPage({ setPage }) {
  const [billing, setBilling] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);

  const proPrice = billing === 'annual' ? 15 : 19;
  const elitePrice = billing === 'annual' ? 31 : 39;

  const plans = [
    {
      icon: '🎭', name: 'Free', desc: 'Get listed, get discovered. Perfect for performers just starting out or testing the platform.',
      price: 0, period: 'Forever free', featured: false,
      features: [
        [true, 'Basic profile listing'], [true, 'Appear in search results'], [true, 'Up to 3 photos'],
        [true, 'Receive enquiries via DragBook'], [true, 'Basic analytics (views)'],
        [false, 'Featured placement'], [false, 'Verified badge'], [false, 'Booking calendar'], [false, 'Priority support'],
      ],
      cta: 'Get Started Free', ctaStyle: 'outline'
    },
    {
      icon: '👑', name: 'Pro', desc: 'The full DragBook experience. Everything you need to fill your calendar and build your reputation.',
      price: proPrice, period: billing === 'annual' ? `Billed £${proPrice * 12}/year · Save £${(19 - proPrice) * 12}` : 'Billed monthly · Cancel anytime',
      featured: true,
      features: [
        [true, <>Featured placement in search results</>], [true, <>Verified badge on your profile</>],
        [true, <>Unlimited photos & 1 video</>], [true, <>Full booking calendar</>],
        [true, 'Advanced analytics dashboard'], [true, 'Priority in search for your region'],
        [true, 'Multiple service listings with pricing'], [true, 'Review request tools'],
        [false, 'Homepage featured slot'],
      ],
      cta: 'Start Pro Free — 30 Days ✨', ctaStyle: 'primary'
    },
    {
      icon: '💎', name: 'Elite', desc: 'For established performers who want maximum visibility and a premium presence on the platform.',
      price: elitePrice, period: billing === 'annual' ? `Billed £${elitePrice * 12}/year · Save £${(39 - elitePrice) * 12}` : 'Billed monthly · Cancel anytime',
      featured: false,
      features: [
        [true, <>Everything in Pro</>], [true, <>Homepage featured slot (rotational)</>],
        [true, 'Unlimited videos & gallery'], [true, <>Top of search results — UK-wide</>],
        [true, 'Dedicated account support'], [true, 'Social media promotion by DragBook'],
        [true, 'Early access to new features'], [true, 'Custom profile URL'], [true, 'Priority in category pages'],
      ],
      cta: 'Go Elite', ctaStyle: 'outline'
    }
  ];

  const faqs = [
    ['Is it really free to list my act?', "Yes, genuinely. You can create a full profile, appear in search results, and receive enquiries from bookers at absolutely no cost. The Free tier isn't a bait-and-switch — it's a real, usable plan."],
    ['What is the 3% booking fee and who pays it?', "When a booking is confirmed through DragBook, a 3% platform fee is applied. On a £400 booking, that's £12. It is deducted from the deposit before it's released to you after the event."],
    ['Can I still use other booking platforms or agencies?', "Absolutely. DragBook has no exclusivity clause. You can continue working with agencies, other platforms, or through your own contacts."],
    ['How does the verification process work?', "Submit a short video clip of a live performance, confirm your identity, and confirm that you hold public liability insurance. Verification typically takes 48 hours."],
    ['What happens if a booker cancels?', "DragBook's protected booking system holds a deposit at confirmation. If the booker cancels within your stated cancellation window, you keep the deposit."],
    ['Can I upgrade or downgrade at any time?', "Yes. No lock-in contracts, no cancellation fees. If you downgrade, you retain features until the end of your current billing period."],
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ padding: '140px 60px 60px', textAlign: 'center', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%,rgba(155,0,255,0.15) 0%,transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--hot-pink)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 2, background: 'var(--hot-pink)', display: 'inline-block' }} />
          For Performers
          <span style={{ width: 24, height: 2, background: 'var(--hot-pink)', display: 'inline-block' }} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem,5vw,3.8rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 18 }}>
          Your Talent.<br />
          <em style={{ fontStyle: 'italic', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your Platform.</em>
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 300, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Start free and scale when you're ready. Every performer on DragBook keeps more of what they earn — because this platform is built for you, not the agencies.
        </p>
        {/* Toggle */}
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 100, padding: 4, gap: 4 }}>
          {['monthly', 'annual'].map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{ padding: '10px 26px', borderRadius: 100, border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.86rem', fontWeight: 500, cursor: 'none', transition: 'all .3s', background: billing === b ? 'linear-gradient(135deg,#FF2D78,#9B00FF)' : 'none', color: billing === b ? 'white' : 'var(--text-muted)', boxShadow: billing === b ? '0 4px 20px rgba(255,45,120,0.35)' : 'none' }}>
              {b === 'monthly' ? 'Monthly' : <>Annual <span style={{ background: 'rgba(255,230,0,0.15)', border: '1px solid rgba(255,230,0,0.3)', color: '#FFE600', padding: '2px 8px', borderRadius: 100, fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginLeft: 6 }}>Save 20%</span></>}
            </button>
          ))}
        </div>
      </div>

      {/* PRICING CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, padding: '0 60px 80px', maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{
            background: plan.featured ? 'linear-gradient(145deg,rgba(155,0,255,0.2),rgba(255,45,120,0.2))' : 'var(--card-bg)',
            border: plan.featured ? '1px solid rgba(255,45,120,0.4)' : '1px solid var(--border)',
            borderRadius: 28, padding: '34px 30px', position: 'relative',
            transform: plan.featured ? 'scale(1.03)' : 'scale(1)',
            boxShadow: plan.featured ? '0 20px 60px rgba(255,45,120,0.2)' : 'none',
            transition: 'transform .3s'
          }}>
            {plan.featured && <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'var(--grad-primary)', color: 'white', padding: '5px 18px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>✨ Most Popular</div>}
            <div style={{ fontSize: '1.9rem', marginBottom: 14 }}>{plan.icon}</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>{plan.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.5, marginBottom: 22 }}>{plan.desc}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 5 }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 300 }}>£</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', color: 'white', lineHeight: 1 }}>{plan.price}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ month</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 26 }}>{plan.period}</div>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 22 }} />
            <ul style={{ listStyle: 'none', marginBottom: 28 }}>
              {plan.features.map(([on, label], i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 11, fontSize: '0.84rem', color: on ? 'var(--text-muted)' : 'rgba(255,255,255,0.18)', fontWeight: 300 }}>
                  <span style={{ color: on ? 'var(--hot-pink)' : 'rgba(255,255,255,0.18)', fontSize: '0.78rem', marginTop: 2, flexShrink: 0 }}>{on ? '✓' : '—'}</span>
                  {label}
                </li>
              ))}
            </ul>
            <button className={plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', padding: 13, textAlign: 'center', fontSize: '0.9rem' }}>{plan.cta}</button>
          </div>
        ))}
      </div>

      {/* COMMISSION EXPLAINER */}
      <div style={{ padding: '72px 60px', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow">The DragBook Difference</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem,3vw,2.3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16, color: 'white' }}>
              No agency cuts.<br />
              <em style={{ fontStyle: 'italic', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ever.</em>
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 18 }}>Traditional drag agencies take 20–35% of every booking. On a £400 gig, that's up to <strong style={{ color: 'var(--text-light)', fontWeight: 500 }}>£140 straight into their pocket</strong>. DragBook charges a flat 3% protected booking fee — covering deposit holding, payment protection, and platform security.</p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {['You set your rates', 'Direct client contact', 'Protected deposits', 'No exclusivity clause'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.8rem', color: 'var(--text-muted)' }}><span style={{ color: 'var(--hot-pink)' }}>✓</span>{item}</div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 24, padding: 34, textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>On a £500 booking…</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'center', marginBottom: 22 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>Agency Model</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', lineHeight: 1 }}>£350</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>you receive (30% cut)</div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'rgba(255,255,255,0.12)' }}>vs</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 7 }}>DragBook</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>£485</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: 4 }}>you receive (3% fee)</div>
              </div>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>That's <strong style={{ color: 'var(--hot-pink)' }}>£135 more per booking</strong> staying in your pocket.</div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '60px 60px 100px', maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Frequently Asked <em style={{ fontStyle: 'italic', background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Questions</em>
          </h2>
        </div>
        {faqs.map(([q, a], i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: '0.93rem', fontWeight: 500, color: 'var(--text-light)', cursor: 'none', transition: 'color .2s' }}>
              {q}
              <span style={{ fontSize: '1.2rem', color: 'var(--hot-pink)', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .3s', flexShrink: 0, marginLeft: 16 }}>+</span>
            </button>
            <div style={{ maxHeight: openFaq === i ? 200 : 0, overflow: 'hidden', transition: 'max-height .4s ease' }}>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, paddingBottom: 20 }}>{a}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

Object.assign(window, { PricingPage });
