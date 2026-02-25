import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ExternalLink, 
  Settings, 
  BarChart3, 
  Plus, 
  Camera, 
  Moon, 
  Sun,
  ChevronRight,
  TrendingUp,
  MousePointer2
} from 'lucide-react';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  icon: string;
}

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [profile, setProfile] = useState({
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
    if (isAdmin) return;
    setLinks(links.map(link => 
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    ));
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      title: 'New Bio Link',
      url: 'https://',
      clicks: 0,
      icon: 'ExternalLink'
    };
    setLinks([...links, newLink]);
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="premium-container">
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="glass-card" 
        style={{ padding: '0.75rem', width: 'auto', position: 'absolute', top: '2rem', left: '2rem', border: 'none' }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {!isAdmin ? (
        /* PUBLIC PROFILE VIEW */
        <div style={{ width: '100%', textAlign: 'center', marginTop: '3rem' }}>
          <div className="avatar-wrapper">
            <img src={profile.avatar} alt={profile.name} className="avatar-main" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>{profile.name}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontWeight: 300 }}>{profile.bio}</p>

          <div style={{ width: '100%' }}>
            {links.map((link) => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button"
                onClick={() => handleLinkClick(link.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {link.icon === 'Instagram' && <Instagram size={20} />}
                  {link.icon === 'Twitter' && <Twitter size={20} />}
                  {link.icon === 'Youtube' && <Youtube size={20} />}
                  {link.icon === 'ExternalLink' && <ExternalLink size={20} />}
                  <span>{link.title}</span>
                </div>
                <ChevronRight size={16} style={{ opacity: 0.5 }} />
              </a>
            ))}
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD VIEW */
        <div style={{ width: '100%', marginTop: '3rem' }}>
          <header style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Admin Dashboard</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage your profile and link analytics.</p>
          </header>

          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-value">{links.reduce((acc, l) => acc + l.clicks, 0).toLocaleString()}</div>
              <div className="analytics-label">Total Clicks</div>
            </div>
            <div className="analytics-card">
              <div className="analytics-value">{links.length}</div>
              <div className="analytics-label">Active Links</div>
            </div>
          </div>

          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Active Links</h3>
              <button 
                onClick={addLink}
                style={{ background: 'var(--gold)', border: 'none', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={14} /> Add New
              </button>
            </div>

            {links.map((link) => (
              <div key={link.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{link.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{link.url}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '0.9rem' }}>{link.clicks}</div>
                  <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.5 }}>Clicks</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="glass-card" style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <Camera size={20} /> Update Photo
            </button>
            <button className="glass-card" style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <Settings size={20} /> Edit Info
            </button>
          </div>
        </div>
      )}

      {/* Admin Toggle Switch */}
      <button 
        className="admin-toggle"
        onClick={() => setIsAdmin(!isAdmin)}
        title={isAdmin ? "View Profile" : "Manage Portfolio"}
      >
        {isAdmin ? <MousePointer2 size={24} /> : <Settings size={24} />}
      </button>
    </div>
  );
};

export default App;
