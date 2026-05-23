// HomePage.jsx
const { useState, useEffect, useRef } = React;

function HomePage({ setPage }) {
  const [activeTag, setActiveTag] = useState('All Events');
  const tags = ['All Events','Hen Party','Corporate','Wedding','Drag Bingo','Pride','Birthday'];

  return (
    <div>
      {/* HERO */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'120px 40px 80px',position:'relative',overflow:'hidden'}}>
        {/* Hero background — GPU-accelerated blobs, no flicker */}
        <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',willChange:'transform'}}>
          <div style={{position:'absolute',width:'80vw',height:'80vw',borderRadius:'50%',background:'#FF2D78',filter:'blur(100px)',opacity:.28,top:'-30%',left:'-20%',willChange:'transform',animation:'blobA 6s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'65vw',height:'65vw',borderRadius:'50%',background:'#9B00FF',filter:'blur(90px)',opacity:.32,top:'-5%',right:'-25%',willChange:'transform',animation:'blobB 7s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'55vw',height:'55vw',borderRadius:'50%',background:'#00F5FF',filter:'blur(100px)',opacity:.16,bottom:'-15%',left:'20%',willChange:'transform',animation:'blobC 8s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'40vw',height:'30vw',borderRadius:'50%',background:'#FFE600',filter:'blur(80px)',opacity:.14,top:'45%',left:'10%',willChange:'transform',animation:'blobD 5s ease-in-out infinite'}}/>
          <div style={{position:'absolute',width:'45vw',height:'45vw',borderRadius:'50%',background:'#FF2D78',filter:'blur(80px)',opacity:.2,bottom:'5%',right:'5%',willChange:'transform',animation:'blobA 9s ease-in-out infinite reverse'}}/>
        </div>
        <style>{`
          @keyframes blobA{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(5%,6%,0) scale(1.15)}}
          @keyframes blobB{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-6%,4%,0) scale(1.2)}}
          @keyframes blobC{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(4%,-6%,0) scale(1.1)}}
          @keyframes blobD{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-4%,5%,0) scale(1.25)}}
        `}</style>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(255,45,120,0.12)',border:'1px solid rgba(255,45,120,0.4)',color:'#FF2D78',padding:'8px 20px',borderRadius:100,fontSize:'0.78rem',fontWeight:500,marginBottom:32,position:'relative',zIndex:2}}>
          <span style={{width:7,height:7,background:'#FF2D78',borderRadius:'50%',display:'inline-block',flexShrink:0}}/>
          UK's first dedicated drag marketplace
        </div>
        <h1 style={{fontFamily:"'Staatliches',cursive",lineHeight:.92,letterSpacing:'0.04em',marginBottom:16,position:'relative',zIndex:2,textAlign:'center'}}>
          <span style={{display:'block',fontSize:'clamp(2.5rem,6vw,5rem)',color:'white',textShadow:'0 0 60px rgba(255,45,120,0.3)'}}>BOOK</span>
          <span style={{display:'block',fontSize:'clamp(2rem,5vw,4rem)',color:'white',textShadow:'0 0 60px rgba(255,45,120,0.3)'}}>EXTRAORDINARY</span>
          <span style={{display:'block',fontSize:'clamp(3rem,8vw,7rem)',background:'linear-gradient(135deg,#FF2D78,#9B00FF,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',filter:'drop-shadow(0 0 30px rgba(255,45,120,0.9)) drop-shadow(0 0 60px rgba(155,0,255,0.6))'}}>DRAG TALENT</span>
        </h1>
        <p style={{fontSize:'clamp(1rem,2vw,1.15rem)',color:'var(--text-muted)',fontWeight:300,maxWidth:520,lineHeight:1.6,marginBottom:48}}>
          From <strong style={{color:'var(--text-light)',fontWeight:500}}>hen parties</strong> to <strong style={{color:'var(--text-light)',fontWeight:500}}>corporate events</strong>, find and book verified drag performers across the UK. Direct booking, no agency fees, <strong style={{color:'var(--text-light)',fontWeight:500}}>pure fabulousness.</strong>
        </p>
        {/* SEARCH */}
        <div style={{width:'100%',maxWidth:680,zIndex:2,position:'relative'}}>
          <div style={{display:'flex',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,45,120,0.3)',borderRadius:100,padding:'8px 8px 8px 24px',gap:10,alignItems:'center',backdropFilter:'blur(20px)'}}>
            <span style={{opacity:.5}}>🔍</span>
            <input placeholder="Drag bingo, hen do host, wedding crasher…" style={{flex:1,background:'none',border:'none',outline:'none',color:'var(--text-light)',fontFamily:'var(--font-body)',fontSize:'0.95rem',fontWeight:300}} />
            <div style={{width:1,height:24,background:'rgba(255,255,255,0.15)'}}/>
            <select style={{background:'none',border:'none',outline:'none',color:'var(--text-muted)',fontFamily:'var(--font-body)',fontSize:'0.88rem',padding:'0 12px',minWidth:130}}>
              <option>📍 Any location</option>
              {['London','Manchester','Birmingham','Brighton','Leeds','Glasgow'].map(c=><option key={c}>{c}</option>)}
            </select>
            <button onClick={()=>setPage('browse')} className="btn-primary" style={{padding:'13px 28px',fontSize:'0.88rem',whiteSpace:'nowrap'}}>Find a Queen 👑</button>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginTop:16}}>
            {tags.map(t=>(
              <span key={t} data-hover onClick={()=>setActiveTag(t)} style={{background:activeTag===t?'rgba(255,45,120,0.15)':'rgba(255,255,255,0.04)',border:activeTag===t?'1px solid #FF2D78':'1px solid rgba(255,255,255,0.1)',color:activeTag===t?'#FF2D78':'var(--text-muted)',padding:'7px 16px',borderRadius:100,fontSize:'0.78rem',cursor:'none',transition:'all .2s'}}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{position:'absolute',bottom:40,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <span style={{fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)'}}>Scroll</span>
          <div style={{width:1,height:36,background:'linear-gradient(to bottom,#FF2D78,transparent)'}}/>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{padding:'32px 0',overflow:'hidden',borderTop:'1px solid rgba(255,255,255,0.04)',borderBottom:'1px solid rgba(255,255,255,0.04)',background:'rgba(255,45,120,0.02)'}}>
        <div style={{display:'flex',gap:60,animation:'marquee 22s linear infinite',whiteSpace:'nowrap',width:'max-content'}}>
          {['Hen Parties','Corporate Events','Drag Bingo','Wedding Crashers','Pride Events','Birthday Parties','Bottomless Brunch','Cabaret Nights','Hen Parties','Corporate Events','Drag Bingo','Wedding Crashers','Pride Events','Birthday Parties','Bottomless Brunch','Cabaret Nights'].map((item,i)=>(
            <span key={i} style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',color:'rgba(255,255,255,0.14)',display:'inline-flex',alignItems:'center',gap:20}}>
              {item} <span style={{color:'var(--hot-pink)',fontSize:'0.55rem'}}>◆</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes starSpin{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.3)}100%{transform:rotate(360deg) scale(1)}}@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* STATS */}
      <div style={{display:'flex',justifyContent:'center',gap:60,padding:'60px 40px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:'rgba(255,255,255,0.02)',flexWrap:'wrap',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 100% at 20% 50%,rgba(255,45,120,0.08) 0%,transparent 60%),radial-gradient(ellipse 60% 100% at 80% 50%,rgba(155,0,255,0.08) 0%,transparent 60%)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(255,45,120,0.6) 1px,transparent 1px),radial-gradient(circle,rgba(155,0,255,0.4) 1px,transparent 1px)',backgroundSize:'60px 60px, 80px 80px',backgroundPosition:'0 0, 30px 30px',opacity:.12,pointerEvents:'none'}}/>
        {[['1,240+','Drag Performers'],['8,300+','Events Booked'],['4.9★','Average Rating'],['0%','Agency Fees']].map(([num,lbl])=>(
          <div key={lbl} style={{textAlign:'center'}}>
            <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'2.4rem',background:'linear-gradient(135deg,#FF2D78,#FF80AB,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:6,filter:'drop-shadow(0 0 16px rgba(255,45,120,0.8)) drop-shadow(0 0 32px rgba(155,0,255,0.5))'}}>{num}</div>
            <div style={{fontSize:'0.72rem',color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:500}}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* PERFORMERS */}
      <section style={{padding:'80px 60px'}}>
        <div className="eyebrow">Featured Performers</div>
        <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'0.04em',marginBottom:12}}>
          Find Your Perfect <span style={{display:'inline-flex',alignItems:'center',gap:6}}><span style={{color:'#FFE600',fontSize:'0.65em',filter:'drop-shadow(0 0 8px #FFE600)',animation:'starSpin 3s linear infinite',display:'inline-block'}}>✦</span><span style={{background:'var(--grad-primary)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Drag Star</span><span style={{color:'#FFE600',fontSize:'0.65em',filter:'drop-shadow(0 0 8px #FFE600)',animation:'starSpin 3s linear infinite reverse',display:'inline-block'}}>✦</span></span>
        </h2>
        <p style={{color:'var(--text-muted)',fontWeight:300,maxWidth:480,lineHeight:1.7,marginBottom:48,fontSize:'0.92rem'}}>Browse verified performers by style, location and event type. Every queen and king on DragBook is reviewed and rated by real event organisers.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(270px,1fr))',gap:22}}>
          {PERFORMERS.map(p=><PerformerCard key={p.name} {...p} onClick={()=>setPage('profile')}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:44}}>
          <button onClick={()=>setPage('browse')} className="btn-secondary">Browse All Performers ✨</button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{padding:'80px 60px',background:'linear-gradient(135deg,rgba(155,0,255,0.07),rgba(255,45,120,0.07))',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div className="eyebrow">Simple Process</div>
        <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,letterSpacing:'0.04em',marginBottom:48}}>
          Book in <em style={{fontStyle:'normal',background:'var(--grad-primary)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Three Steps</em>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:32}}>
          {[['01','🔍','Search & Discover','Browse verified drag performers by location, event type, and style. Filter by budget, availability, and act speciality to find your perfect match.'],
            ['02','💬','Connect Directly','Message performers directly through DragBook. Discuss your event, agree on details, and get a quote — no agents, no mark-ups, no middlemen.'],
            ['03','🎉','Book & Celebrate','Confirm your booking securely through the platform. Payment is held safely and released after your event. Then prepare to be absolutely fabulous.']
          ].map(([num,icon,title,desc])=>(
            <div key={num} style={{textAlign:'center',padding:'36px 28px',background:'rgba(255,255,255,0.03)',borderRadius:24,border:'1px solid rgba(255,255,255,0.06)'}}>
              <div style={{fontFamily:"'Abril Fatface',cursive",fontSize:'3.5rem',background:'linear-gradient(135deg,#FF2D78,#9B00FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',lineHeight:1,marginBottom:8,filter:'drop-shadow(0 0 16px rgba(255,45,120,0.7))'}}>{num}</div>
              <div style={{fontSize:'2.2rem',marginBottom:18}}>{icon}</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'1.3rem',fontWeight:700,fontWeight:700,marginBottom:10,color:'white'}}>{title}</div>
              <p style={{fontSize:'0.88rem',color:'var(--text-muted)',lineHeight:1.7,fontWeight:300}}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'80px 60px'}}>
        <div className="eyebrow">Reviews</div>
        <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,letterSpacing:'0.04em',marginBottom:48}}>
          Don't take our word for it, <em style={{fontStyle:'normal',background:'var(--grad-primary)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>darling</em>
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:22}}>
          {[
            {text:"Found the most incredible drag host for my sister's hen do in about 10 minutes. She was an absolute sensation — the whole group is still talking about it three months later.",name:'Sophie T.',role:'Hen party organiser · London',av:'linear-gradient(135deg,#FF2D78,#9B00FF)',ic:'👰'},
            {text:"We booked a drag bingo night for our whole office Christmas party. Honestly the best decision we've made. DragBook made it so easy — found someone local, brilliant reviews, done.",name:'Marcus P.',role:'Events Manager · Manchester',av:'linear-gradient(135deg,#FFE600,#FF2D78)',ic:'💼'},
            {text:"As a performer, finally having a platform that gets the drag community is everything. I've had more bookings in two months on DragBook than the previous year combined.",name:'Scarlett Voltage',role:'Drag Performer · London',av:'linear-gradient(135deg,#00F5FF,#9B00FF)',ic:'🎭'},
          ].map(t=>(
            <div key={t.name} style={{background:'var(--card-bg)',borderRadius:24,padding:28,border:'1px solid var(--border)',position:'relative'}}>
              <div style={{fontFamily:'var(--font-display)',fontSize:'5rem',color:'var(--electric-purple)',opacity:.12,position:'absolute',top:-8,left:18,lineHeight:1}}>"</div>
              <p style={{fontSize:'0.9rem',lineHeight:1.7,color:'var(--text-muted)',fontWeight:300,marginBottom:22,fontStyle:'italic'}}>{t.text}</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:42,height:42,borderRadius:'50%',background:t.av,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem',flexShrink:0}}>{t.ic}</div>
                <div>
                  <div style={{fontSize:'0.88rem',fontWeight:500,color:'white'}}>{t.name}</div>
                  <div style={{fontSize:'0.72rem',color:'var(--text-muted)',marginTop:2}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PERFORMER CTA */}
      <section style={{padding:'60px 60px 100px'}}>
        <div style={{background:'linear-gradient(135deg,rgba(155,0,255,0.2),rgba(255,45,120,0.2))',border:'1px solid rgba(255,45,120,0.3)',borderRadius:32,padding:'72px 60px',textAlign:'center',backdropFilter:'blur(20px)',maxWidth:860,margin:'0 auto',position:'relative',overflow:'hidden'}}>
          <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2rem,4vw,2.8rem)',fontWeight:900,lineHeight:1.1,marginBottom:18}}>
            Are You a Drag Performer?<br/>
            <em style={{fontStyle:'italic',background:'linear-gradient(135deg,#FFE600,#FF2D78)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>This Is Your Platform.</em>
          </h2>
          <p style={{color:'var(--text-muted)',fontSize:'0.95rem',lineHeight:1.7,fontWeight:300,maxWidth:500,margin:'0 auto 36px'}}>List your act for free and get discovered by thousands of event organisers across the UK. No agency taking a cut. No gatekeeping. Just you, your talent, and the bookings you deserve.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={()=>setPage('pricing')} className="btn-primary">List Your Act Free 💄</button>
            <button className="btn-secondary">See How It Works</button>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
}

Object.assign(window, { HomePage });
