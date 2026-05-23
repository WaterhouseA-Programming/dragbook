// App.jsx — Router + top-level app
const { useState, useEffect } = React;

const STORAGE_KEY = 'dragbook_page';

function App() {
  const [page, setPage] = useState('home');

  const navigate = (p) => {
    setPage(p);
    try { localStorage.setItem(STORAGE_KEY, p); } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Nav page={page} setPage={navigate} />
      {page === 'home'       && <HomePage       setPage={navigate} />}
      {page === 'browse'     && <BrowsePage     setPage={navigate} />}
      {page === 'profile'    && <ProfilePage    setPage={navigate} />}
      {page === 'pricing'    && <PricingPage    setPage={navigate} />}
      {page === 'howItWorks' && <HowItWorksPage setPage={navigate} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
