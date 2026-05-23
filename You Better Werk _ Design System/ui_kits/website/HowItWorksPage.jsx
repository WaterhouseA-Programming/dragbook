// HowItWorksPage.jsx — For performers, cheeky copy, bold animation
const { useState } = React;

function HowItWorksPage({ setPage }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* HERO — same bold blob treatment as homepage */}
      <section style={{minHeight:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'130px 40px 80px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
          <div style={{position:'absolute',width:'70vw',height:'70vw',borderRadius:'50%',background:'#9B00FF',filter:'blur(100px)',opacity:.3,top:'-25%',right:'-20%',willChange:'transform',animation:'blobA 7s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'60vw',height:'60vw',borderRadius:'50%',background:'#FF2D78',filter:'blur(90px)',opacity:.28,bottom:'-15%',left:'-15%',willChange:'transform',animation:'blobB 6s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'40vw',height:'40vw',borderRadius:'50%',background:'#FFE600',filter:'blur(80px)',opacity:.12,top:'40%',left:'40%',willChange:'transform',animation:'blobC 8s ease-in-out infinite'}}/>
        </div>
        <style>{`
          @keyframes blobA{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-5%,6%,0) scale(1.18)}}
          @keyframes blobB{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(5%,-5%,0) scale(1.2)}}
          @keyframes blobC{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-3%,4%,0) scale(1.15)}}
        `}</style>

        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(155,0,255,0.12)',border:'1px solid rgba(155,0,255,0.4)',color:'#C084FF',padding:'8px 20px',borderRadius:100,fontSize:'0.78rem',fontWeight:500,marginBottom:28,position:'relative',zIndex:2}}>
          <span style={{width:7,height:7,background:'#C084FF',borderRadius:'50%',display:'inline-block'}}/>
          For performers
        </div>

        <h1 style={{lineHeight:.94,letterSpacing:'0.04em',marginBottom:16,position:'relative',zIndex:2}}>
          <span style={{display:'block',fontFamily:"'Staatliches',cursive",fontSize:'clamp(3.5rem,8vw,7rem)',color:'white',textShadow:'0 0 60px rgba(155,0,255,0.4)'}}>YOUR TALENT.</span>
          <span style={{display:'block',fontFamily:"'Staatliches',cursive",fontSize:'clamp(2.5rem,6vw,5.5rem)',lineHeight:1}}>
            <span style={{color:'rgba(255,232,255,0.7)'}}>YOUR PLATFORM...</span>
          </span>
          <span style={{display:'block',fontFamily:"'Abril Fatface',cursive",fontSize:'clamp(3rem,7vw,6rem)',lineHeight:1,background:'linear-gradient(135deg,#FF2D78,#FFE600,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',filter:'drop-shadow(0 0 20px rgba(255,45,120,0.9)) drop-shadow(0 0 50px rgba(155,0,255,0.6))'}}>Shoes.</span>
        </h1>
        <p style={{fontSize:'1.05rem',color:'var(--text-muted)',fontWeight:300,maxWidth:560,lineHeight:1.7,marginBottom:44,position:'relative',zIndex:2}}>
          Traditional drag agencies take a <strong style={{color:'var(--text-light)',fontWeight:500}}>30% cut</strong> just for answering the phone. We charge <strong style={{color:'#FF2D78',fontWeight:500}}>3%</strong>. You do the maths. We'll wait. <span style={{color:'rgba(255,232,255,0.4)'}}>(We know you're good at counting after drag bingo.)</span>
        </p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',position:'relative',zIndex:2}}>
          <button onClick={()=>setPage('pricing')} className="btn-primary" style={{fontSize:'1rem',padding:'16px 40px'}}>List Your Act Free 💄</button>
          <button className="btn-secondary" style={{fontSize:'1rem',padding:'16px 32px'}}>See the numbers →</button>
        </div>
      </section>

      {/* STATS — why YBW */}
      <div style={{display:'flex',justifyContent:'center',gap:60,padding:'52px 40px',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(255,255,255,0.02)',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 100% at 20% 50%,rgba(155,0,255,0.08),transparent 60%),radial-gradient(ellipse 60% 100% at 80% 50%,rgba(255,45,120,0.08),transparent 60%)',pointerEvents:'none'}}/>
        {[['3%','Platform fee (not 30%)'],['0','Exclusivity clauses'],['£135+','More per booking vs agencies'],['48hr','Verification turnaround']].map(([n,l])=>(
          <div key={l} style={{textAlign:'center',position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'2.4rem',background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:6,filter:'drop-shadow(0 0 16px rgba(255,45,120,0.8))'}}>{n}</div>
            <div style={{fontSize:'0.72rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:500}}>{l}</div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS FOR PERFORMERS */}
      <section style={{padding:'80px 60px'}}>
        <div className="eyebrow">Getting started</div>
        <h2 style={{fontFamily:"'Staatliches',cursive",fontSize:'clamp(2rem,4vw,3rem)',letterSpacing:'0.04em',marginBottom:12,lineHeight:1.05}}>
          From invisible to <span style={{background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>fully booked</span>
        </h2>
        <p style={{color:'var(--text-muted)',fontWeight:300,maxWidth:520,lineHeight:1.7,marginBottom:52,fontSize:'0.92rem'}}>No more hoping someone finds your Instagram between cat videos and protein powder ads. Here's how it works.</p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:28}}>
          {[
            ['01','💄','Create your profile','Tell us who you are, what you do, and how much you cost. Upload photos, a showreel, and your campest bio. It takes 20 minutes and it\'s free. Yes, actually free.'],
            ['02','✓','Get verified','Submit a clip of your act and confirm you\'re insured. We check you\'re real — not a catfish in a wig. Verified badge unlocks within 48 hours.'],
            ['03','💌','Start getting booked','Event organisers search, find you, and send enquiries directly. No agency in the middle. No mystery mark-up. Just you, them, and a very excited bride-to-be.'],
          ].map(([num,icon,title,desc])=>(
            <div key={num} style={{padding:'36px 28px',background:'rgba(255,255,255,0.03)',borderRadius:24,border:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'3.5rem',background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:8,filter:'drop-shadow(0 0 16px rgba(255,45,120,0.7))'}}>{num}</div>
              <div style={{fontSize:'2rem',marginBottom:16}}>{icon}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontWeight:700,fontSize:'1.3rem',marginBottom:10,color:'white'}}>{title}</div>
              <p style={{fontSize:'0.88rem',color:'var(--text-muted)',lineHeight:1.7,fontWeight:300}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE AGENCY COMPARISON */}
      <section style={{padding:'60px 60px',background:'linear-gradient(135deg,rgba(155,0,255,0.07),rgba(255,45,120,0.07))',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="eyebrow">The maths</div>
        <h2 style={{fontFamily:"'Staatliches',cursive",fontSize:'clamp(2rem,4vw,2.8rem)',letterSpacing:'0.04em',marginBottom:48,lineHeight:1.05}}>
          What agencies don't want <span style={{background:'linear-gradient(135deg,#FFE600,#FF2D78)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>you to know</span>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,maxWidth:860,margin:'0 auto',alignItems:'center'}}>
          <div>
            <p style={{fontSize:'0.92rem',color:'var(--text-muted)',lineHeight:1.8,fontWeight:300,marginBottom:20}}>Drag agencies typically take <strong style={{color:'var(--text-light)'}}>20–35%</strong> of every booking. They also decide who gets listed, who gets promoted, and who gets ghosted. Their roster, their rules, their cut.</p>
            <p style={{fontSize:'0.92rem',color:'var(--text-muted)',lineHeight:1.8,fontWeight:300,marginBottom:28}}>You Better Werk charges a flat <strong style={{color:'#FF2D78'}}>3% booking fee</strong> — that's it. You set your prices. You talk to clients. You keep your money. We're the platform, not your agent.</p>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {['Set your own rates — no approval needed','Talk directly to every client','No exclusivity — work wherever you want','Deposit protection built in','Cancel anytime, no contracts'].map(item=>(
                <div key={item} style={{display:'flex',alignItems:'center',gap:10,fontSize:'0.88rem',color:'var(--text-muted)'}}>
                  <span style={{color:'#FF2D78',fontWeight:700}}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div style={{background:'var(--card-bg)',border:'1px solid var(--border)',borderRadius:24,padding:32,textAlign:'center'}}>
            <div style={{fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:20}}>On a £500 booking…</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:14,alignItems:'center',marginBottom:20}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:8}}>Agency model</div>
                <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'2rem',color:'rgba(255,255,255,0.25)',textDecoration:'line-through',lineHeight:1}}>£350</div>
                <div style={{fontSize:'0.65rem',color:'var(--text-muted)',marginTop:4}}>you receive</div>
              </div>
              <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'1.2rem',color:'rgba(255,255,255,0.12)'}}>vs</div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:'0.62rem',letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:8}}>You Better Werk</div>
                <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'2rem',background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,filter:'drop-shadow(0 0 12px rgba(255,45,120,0.6))'}}>£485</div>
                <div style={{fontSize:'0.65rem',color:'var(--text-muted)',marginTop:4}}>you receive</div>
              </div>
            </div>
            <div style={{fontSize:'0.78rem',color:'var(--text-muted)',lineHeight:1.6,padding:'14px 0',borderTop:'1px solid var(--border)'}}>That's <strong style={{color:'#FF2D78'}}>£135 more per booking</strong> staying where it belongs. In your rhinestone-encrusted hands.</div>
          </div>
        </div>
      </section>

      {/* PERFORMER TIERS OVERVIEW */}
      <section style={{padding:'80px 60px'}}>
        <div className="eyebrow">Plans</div>
        <h2 style={{fontFamily:"'Staatliches',cursive",fontSize:'clamp(2rem,4vw,2.8rem)',letterSpacing:'0.04em',marginBottom:12,lineHeight:1.05}}>
          Start free. <span style={{background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Scale when you slay.</span>
        </h2>
        <p style={{color:'var(--text-muted)',fontWeight:300,maxWidth:480,lineHeight:1.7,marginBottom:40,fontSize:'0.92rem'}}>Free listing forever, or go Pro/Elite when you're ready for the spotlight.</p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
          <button onClick={()=>setPage('pricing')} className="btn-primary">See all plans & pricing 💎</button>
          <button onClick={()=>setPage('browse')} className="btn-secondary">See the marketplace first →</button>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'0 60px 100px',maxWidth:760,margin:'0 auto'}}>
        <div className="eyebrow" style={{marginBottom:32}}>Quick questions</div>
        {[
          ['Is it really free to list?','Yes, genuinely. No credit card, no trial period that auto-charges you. Free means free. We\'re not monsters.'],
          ['Do I have to be verified to get bookings?','No — you can receive enquiries on the Free plan without verification. But the Verified badge increases booking rates significantly. Turns out event organisers like knowing you\'re real.'],
          ['What if I already have an agency?','Great — keep them. We have zero exclusivity clauses. YBW is another channel, not a contract.'],
          ['Can kings and non-binary performers list?','Absolutely. Drag kings, bio queens, non-binary drag, burlesque, cabaret — if you perform, you belong here.'],
          ['What does the 3% fee actually cover?','Secure deposit holding, payment protection for both parties, and the infrastructure that makes safe bookings possible. On a £400 booking that\'s £12. Twelve pounds. Less than a round of drinks.'],
        ].map(([q,a],i)=>(
          <div key={i} style={{borderBottom:'1px solid var(--border)'}}>
            <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{width:'100%',textAlign:'left',background:'none',border:'none',padding:'20px 0',display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'var(--font-body)',fontSize:'0.92rem',fontWeight:500,color:'var(--text-light)',cursor:'none',transition:'color .2s'}}>
              {q}
              <span style={{fontSize:'1.1rem',color:'var(--hot-pink)',transform:openFaq===i?'rotate(45deg)':'rotate(0)',transition:'transform .3s',flexShrink:0,marginLeft:16}}>+</span>
            </button>
            <div style={{maxHeight:openFaq===i?200:0,overflow:'hidden',transition:'max-height .4s ease'}}>
              <p style={{fontSize:'0.86rem',color:'var(--text-muted)',lineHeight:1.7,fontWeight:300,paddingBottom:18}}>{a}</p>
            </div>
          </div>
        ))}
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

Object.assign(window, { HowItWorksPage });
