import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Instagram,
  Twitter,
  ExternalLink,
  Youtube,
  Settings,
  Camera,
  Moon,
  Sun,
  ChevronRight,
  Plus
} from 'lucide-react';

// Shared Interface
interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  icon: string;
}

// --- COMPONENTS ---

const ThemeToggle: React.FC<{ theme: 'dark' | 'light', toggle: () => void }> = ({ theme, toggle }) => (
  <button
    onClick={toggle}
    className="theme-btn"
    style={{ position: 'absolute', top: '2rem', left: '2rem' }}
  >
    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const PublicProfile: React.FC<{ links: LinkItem[], profile: any, onLinkClick: (id: string) => void }> = ({ links, profile, onLinkClick }) => (
  <div style={{ width: '100%', textAlign: 'center', marginTop: '2rem' }}>
    <div className="avatar-wrapper">
      <img src={profile.avatar} alt={profile.name} className="avatar-main" />
    </div>
    <h1 style={{ fontSize: '1.85rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.5px' }}>{profile.name}</h1>
    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontWeight: 300, fontSize: '1rem' }}>{profile.bio}</p>

    <div style={{ width: '100%' }}>
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="luxury-button"
          onClick={() => onLinkClick(link.id)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="icon">
              {link.icon === 'Instagram' && <Instagram size={22} />}
              {link.icon === 'Twitter' && <Twitter size={22} />}
              {link.icon === 'Youtube' && <Youtube size={22} />}
              {link.icon === 'ExternalLink' && <ExternalLink size={22} />}
            </div>
            <span>{link.title}</span>
          </div>
          <ChevronRight size={18} style={{ opacity: 0.3 }} />
        </a>
      ))}
    </div>
  </div>
);

const AdminDashboard: React.FC<{ links: LinkItem[], onAddLink: () => void }> = ({ links, onAddLink }) => (
  <div style={{ width: '100%', marginTop: '2rem' }}>
    <header style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.4rem' }}>Admin Control</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Security managed via /adminseguro route.</p>
    </header>

    <div className="analytics-grid">
      <div className="analytics-card">
        <div className="analytics-value">{links.reduce((acc, l) => acc + l.clicks, 0).toLocaleString()}</div>
        <div className="analytics-label">Total GERAL</div>
      </div>
      <div className="analytics-card">
        <div className="analytics-value">{links.length}</div>
        <div className="analytics-label">Links Ativos</div>
      </div>
    </div>

    <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>Gerenciar Links</h3>
        <button
          onClick={onAddLink}
          style={{
            background: 'var(--text-primary)',
            color: 'var(--matte-black)',
            border: 'none',
            padding: '0.6rem 1.25rem',
            borderRadius: '100px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s ease'
          }}
        >
          <Plus size={16} /> NOVO LINK
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {links.map((link) => (
          <div key={link.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '1rem', marginBottom: '0.2rem' }}>{link.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.url}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--accent-white)', fontWeight: 700, fontSize: '1.1rem' }}>{link.clicks}</div>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.4 }}>CLIQUES</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: 'flex', gap: '1.25rem' }}>
      <button className="glass-card" style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', fontWeight: 500 }}>
        <Camera size={22} /> Mudar Foto
      </button>
      <button className="glass-card" style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', fontWeight: 500 }}>
        <Settings size={22} /> Ajustes
      </button>
    </div>
  </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profile] = useState({
    name: 'Alex Rivera',
    bio: 'Digital Creator & UX Designer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop'
  });

  const [links, setLinks] = useState<LinkItem[]>([
    { id: '1', title: 'Instagram', url: 'https://instagram.com', clicks: 854, icon: 'Instagram' },
    { id: '2', title: 'Twitter / X', url: 'https://twitter.com', clicks: 1205, icon: 'Twitter' },
    { id: '3', title: 'Portfolio Website', url: '#', clicks: 3420, icon: 'ExternalLink' },
    { id: '4', title: 'Latest YouTube Video', url: 'https://youtube.com', clicks: 521, icon: 'Youtube' }
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLinkClick = (id: string) => {
    setLinks(prev => prev.map(link =>
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    ));
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'Novo Link Premium',
      url: 'https://',
      clicks: 0,
      icon: 'ExternalLink'
    };
    setLinks(prev => [...prev, newLink]);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <div className="premium-container">
        <ThemeToggle theme={theme} toggle={toggleTheme} />

        <Routes>
          <Route
            path="/"
            element={
              <PublicProfile
                links={links}
                profile={profile}
                onLinkClick={handleLinkClick}
              />
            }
          />
          <Route
            path="/adminseguro"
            element={
              <AdminDashboard
                links={links}
                onAddLink={addLink}
              />
            }
          />
          {/* Catch-all route to redirect to profile */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
