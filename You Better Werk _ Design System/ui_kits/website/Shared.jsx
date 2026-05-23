// Shared.jsx — Nav, Footer, shared components
const { useState, useEffect } = React;

function Nav({ page, setPage }) {
  return (
    <nav style={{
      position:'fixed',top:0,width:'100%',zIndex:100,
      padding:'14px 60px',display:'flex',alignItems:'center',justifyContent:'space-between',
      background:'rgba(10,0,8,0.95)',backdropFilter:'blur(20px)',
      borderBottom:'1px solid rgba(255,255,255,0.04)'
    }}>
      <a href="#" onClick={e=>{e.preventDefault();setPage('home')}} style={{textDecoration:'none',display:'flex',alignItems:'center',gap:10}}>
        <img src="../../assets/logo.png" alt="You Better Werk" style={{height:48,width:'auto',filter:'drop-shadow(0 0 8px rgba(255,45,120,0.5))'}}/>
      </a>
      <ul style={{display:'flex',gap:32,listStyle:'none',alignItems:'center'}}>
        {[['browse','Find Performers'],['howItWorks','How It Works'],['pricing','Pricing']].map(([p,label],i)=>(
          <li key={i}><a href="#" onClick={e=>{e.preventDefault();setPage(p)}} style={{color:page===p?'#FFE8FF':'#C084C8',textDecoration:'none',fontSize:'0.82rem',fontWeight:500,letterSpacing:'0.05em',textTransform:'uppercase',transition:'color .2s',borderBottom:page===p?'2px solid #FF2D78':'2px solid transparent',paddingBottom:4}}>{label}</a></li>
        ))}
        <li>
          <a href="#" onClick={e=>{e.preventDefault();setPage('pricing')}} style={{background:'linear-gradient(135deg,#FF2D78,#9B00FF)',color:'white',padding:'9px 22px',borderRadius:100,fontSize:'0.82rem',fontWeight:500,textDecoration:'none',boxShadow:'0 0 20px rgba(255,45,120,0.3)',display:'inline-block'}}>List Your Act ✨</a>
        </li>
      </ul>
    </nav>
  );
}

function Footer({ setPage }) {
  const linkStyle = {color:'rgba(255,232,255,0.4)',textDecoration:'none',fontSize:'0.85rem',fontWeight:300,transition:'color .2s',display:'block',marginBottom:10};
  return (
    <footer style={{padding:'60px 60px 36px',borderTop:'1px solid var(--border)',background:'var(--card-bg-2)',position:'relative',zIndex:1}}>
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:60,marginBottom:48}}>
        <div>
          <div style={{fontFamily:'var(--font-display)',fontSize:'1.6rem',background:'linear-gradient(135deg,#FF2D78,#9B00FF,#00F5FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>DragBook</div>
          <p style={{color:'var(--text-muted)',fontSize:'0.85rem',lineHeight:1.7,fontWeight:300,marginTop:14,maxWidth:240}}>The UK's only dedicated marketplace connecting drag performers with event organisers. No agency fees. No gatekeeping.</p>
        </div>
        {[
          ['For Bookers',['Find a Performer','Browse by Event','How It Works','Pricing Guide']],
          ['For Performers',['List Your Act','Performer Dashboard','Community','Resources']],
          ['Company',['About DragBook','Blog','Press','Contact','Terms & Privacy']]
        ].map(([title,links])=>(
          <div key={title}>
            <h4 style={{fontSize:'0.65rem',fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:18}}>{title}</h4>
            <ul style={{listStyle:'none'}}>{links.map(l=><li key={l}><a href="#" style={linkStyle}>{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:28,borderTop:'1px solid var(--border)',fontSize:'0.75rem',color:'rgba(255,232,255,0.22)'}}>
        <span>© 2026 DragBook · Built with love and glitter ✨</span>
        <div style={{display:'flex',gap:10}}>
          {['📸','🎵','🐦','💼'].map(ic=>(
            <a key={ic} href="#" style={{width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',textDecoration:'none',transition:'all .2s'}}>{ic}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function StarRating({ rating = 5 }) {
  return <span style={{color:'var(--acid-yellow)',fontSize:'0.7rem',letterSpacing:1}}>{'★'.repeat(Math.floor(rating))}{'½'.includes(String(rating))?'½':''}</span>;
}

function PerformerCard({ name, location, emoji, gradient, tags, rating, reviews, price, badge, badgeStyle, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div data-hover onClick={onClick}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{background:'var(--card-bg)',borderRadius:20,overflow:'hidden',
        border:hovered?'1px solid rgba(255,45,120,0.3)':'1px solid var(--border)',
        transition:'transform .3s,box-shadow .3s,border-color .3s',cursor:'none',
        transform:hovered?'translateY(-6px)':'none',
        boxShadow:hovered?'0 24px 50px rgba(0,0,0,0.4),0 0 30px rgba(255,45,120,0.1)':'none'}}>
      <div style={{height:240,background:gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3.5rem',position:'relative'}}>
        {emoji}
        {badge && <div style={{position:'absolute',top:12,right:12,padding:'4px 10px',borderRadius:100,fontSize:'0.66rem',fontWeight:500,letterSpacing:'0.05em',textTransform:'uppercase',...badgeStyle}}>{badge}</div>}
        <div style={{position:'absolute',top:12,left:12,width:30,height:30,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(10px)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',border:'1px solid rgba(255,255,255,0.08)'}}>🤍</div>
      </div>
      <div style={{padding:'16px 20px 20px'}}>
        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'1.2rem',fontWeight:700,fontWeight:700,color:'white',marginBottom:3}}>{name}</div>
        <div style={{fontSize:'0.74rem',color:'var(--text-muted)',marginBottom:9}}>📍 {location}</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:12}}>
          {tags.map(t=><span key={t} style={{background:'rgba(155,0,255,0.1)',border:'1px solid rgba(155,0,255,0.22)',color:'#C084FF',padding:'3px 9px',borderRadius:100,fontSize:'0.64rem'}}>{t}</span>)}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:12,borderTop:'1px solid var(--border)'}}>
          <div style={{display:'flex',alignItems:'center',gap:4,fontSize:'0.78rem'}}><StarRating rating={rating}/> {rating} ({reviews})</div>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:'0.95rem',fontWeight:700,fontWeight:700,color:'white'}}>from £{price} <span style={{fontFamily:'var(--font-body)',fontSize:'0.66rem',color:'var(--text-muted)'}}>/ event</span></div>
        </div>
        <button style={{width:'100%',marginTop:12,background:'var(--grad-primary)',border:'none',color:'white',padding:11,borderRadius:100,fontFamily:'var(--font-body)',fontSize:'0.82rem',fontWeight:500,cursor:'none',opacity:hovered?1:0,transform:hovered?'translateY(0)':'translateY(5px)',transition:'opacity .2s,transform .2s'}}>View Profile →</button>
      </div>
    </div>
  );
}

const PERFORMERS = [
  {name:'Scarlett Voltage',location:'London · travels UK-wide',emoji:'👑',gradient:'linear-gradient(135deg,#FF2D78,#9B00FF)',tags:['Hen Parties','Drag Bingo','Corporate'],rating:5.0,reviews:47,price:380,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}},
  {name:'Madam Glitterbomb',location:'Manchester · North West',emoji:'💜',gradient:'linear-gradient(135deg,#9B00FF,#00F5FF)',tags:['Weddings','Cabaret','Live Singing'],rating:4.9,reviews:62,price:450,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}},
  {name:'Rex Havoc',location:'Brighton · South East',emoji:'⚡',gradient:'linear-gradient(135deg,#FFE600,#FF2D78)',tags:['Drag King','Pride Events','Festivals'],rating:5.0,reviews:38,price:320,badge:'🏆 Top Rated',badgeStyle:{background:'rgba(255,230,0,0.12)',border:'1px solid rgba(255,230,0,0.35)',color:'#FFE600'}},
  {name:'Crystal Charade',location:'Birmingham · Midlands',emoji:'💎',gradient:'linear-gradient(135deg,#00F5FF,#9B00FF)',tags:['Wedding Crasher','Hen Parties','Hosting'],rating:4.8,reviews:29,price:350,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}},
  {name:'Nova Nightshade',location:'Leeds · Yorkshire',emoji:'🌈',gradient:'linear-gradient(135deg,#FF2D78,#FFE600)',tags:['Drag Bingo','Comedy','Corporate'],rating:4.9,reviews:51,price:295,badge:'✓ Verified',badgeStyle:{background:'rgba(0,245,255,0.12)',border:'1px solid rgba(0,245,255,0.35)',color:'#00F5FF'}},
  {name:'Destiny Devine',location:'Glasgow · Scotland',emoji:'🔥',gradient:'linear-gradient(135deg,#9B00FF,#FF2D78)',tags:['Live Singing','Cabaret','Weddings'],rating:5.0,reviews:18,price:410,badge:'🔥 Hot Right Now',badgeStyle:{background:'rgba(255,45,120,0.12)',border:'1px solid rgba(255,45,120,0.35)',color:'#FF2D78'}},
];

Object.assign(window, { Nav, Footer, StarRating, PerformerCard, PERFORMERS });
