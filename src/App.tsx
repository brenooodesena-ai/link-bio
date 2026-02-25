import React, { useState, useEffect, useMemo } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, Timestamp, serverTimestamp } from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  Instagram,
  Twitter,
  ExternalLink,
  Youtube,
  Moon,
  Sun,
  ChevronRight,
  Plus,
  Pencil,
  Check,
  X,
  Trash2,
  Facebook,
  Linkedin,
  Github,
  Globe,
  Mail,
  Phone,
  Send,           // Telegram
  Twitch,
  ShoppingBag,
  MapPin,
  PlayIcon,
  Video,
  Apple,
  Slack,
  MessageSquare,
  LifeBuoy,
  Music,
  Disc
} from 'lucide-react';

// --- CUSTOM ICONS ---

const TikTokIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47V18.5c0 1.51-.43 3.03-1.39 4.23-1.05 1.32-2.73 2.05-4.4 2.1-1.7-.1-3.33-.86-4.52-2.1-1.12-1.15-1.75-2.72-1.75-4.32 0-3.39 2.74-6.14 6.12-6.14.39 0 .78.04 1.17.11v4.03c-.39-.06-.78-.1-1.17-.1-1.13 0-2.07.93-2.07 2.1 0 1.13.93 2.07 2.07 2.07 1.13 0 2.07-.93 2.07-2.07l.02-16.14z" />
  </svg>
);

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.395 0 .01 5.385.008 12.037c0 2.126.556 4.2 1.612 6.062L0 24l6.095-1.6a11.777 11.777 0 005.952 1.587h.005c6.654 0 12.04-5.385 12.042-12.037a11.82 11.82 0 00-3.535-8.482z" />
  </svg>
);

const SpotifyIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.302c-.218.358-.684.474-1.041.255-2.852-1.742-6.443-2.135-10.672-1.168-.41.094-.822-.162-.916-.572-.094-.411.162-.822.572-.916 4.634-1.059 8.597-.611 11.802 1.346.357.218.473.682.255 1.055zm1.464-3.257c-.274.446-.86.59-1.306.316-3.266-2.008-8.243-2.589-12.106-1.417-.5.152-1.028-.13-1.18-.63-.153-.5-.13-1.027.63-1.18 4.417-1.34 9.897-.68 13.593 1.59.447.274.59.86.316 1.307l-.151.114zm.135-3.376c-3.918-2.327-10.384-2.543-14.135-1.405-.6.182-1.24-.16-1.423-.76-.183-.603.16-1.242.763-1.425 4.316-1.31 11.455-1.057 15.965 1.62.54.32.715 1.012.394 1.55-.32.538-1.01.716-1.55.396l-.014-.026z" />
  </svg>
);

const DiscordIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.006 14.006 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const SnapchatIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-.676 0-1.284.14-1.864.407-1.157.534-1.636 1.83-2.025 3.097-.247.81-.468 1.547-.798 1.956-.3.37-.84.5-1.303.612-1.38.33-2.61.64-3.41 1.702-.45.594-.6 1.36-.6 2.05s.23 1.32.68 1.81c.64.7 1.71.9 2.76 1-.36.33-.6.64-.6 1.05 0 .5.36 1 1 1.05 1.78.14 3.56.28 5.34.42v1c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1v-1c1.78-.14 3.56-.28 5.34-.42.64-.05 1-1.05 1-1.05 0-.41-.24-.72-.6-1.05 1.05-.1 2.12-.3 2.76-1 .45-.49.68-1.12.68-1.81s-.15-1.456-.6-2.05c-.8-.062-2.03-.372-3.41-1.702-.46-.112-1-.242-1.303-.612-.33-.409-.551-1.146-.798-1.956-.389-1.267-.868-2.563-2.025-3.097-.58-.267-1.188-.407-1.864-.407z" />
  </svg>
);

const PinterestIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.398 2.966 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
  </svg>
);

const PatreonIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.386.5c-4.758 0-8.622 3.864-8.622 8.622 0 4.757 3.864 8.622 8.622 8.622 4.757 0 8.621-3.865 8.621-8.622S20.143.5 15.386.5zM.485.5v22.998h4.288V.5H.485z" />
  </svg>
);

// --- CONSTANTS ---

const ICON_MAP: Record<string, React.ReactNode> = {
  Nenhum: <X size={20} opacity={0.3} />,
  WhatsApp: <WhatsAppIcon size={22} />,
  Instagram: <Instagram size={22} />,
  TikTok: <TikTokIcon size={22} />,
  Youtube: <Youtube size={22} />,
  Spotify: <SpotifyIcon size={22} />,
  Facebook: <Facebook size={22} />,
  Twitter: <Twitter size={22} />,
  Suporte: <LifeBuoy size={22} />,
  Discord: <DiscordIcon size={22} />,
  Snapchat: <SnapchatIcon size={22} />,
  Pinterest: <PinterestIcon size={22} />,
  Patreon: <PatreonIcon size={22} />,
  Messenger: <MessageSquare size={22} />,
  Slack: <Slack size={22} />,
  Twitch: <Twitch size={22} />,
  LinkedIn: <Linkedin size={22} />,
  Github: <Github size={22} />,
  Telegram: <Send size={22} />,
  Apple: <Apple size={22} />,
  Website: <Globe size={22} />,
  Email: <Mail size={22} />,
  Phone: <Phone size={22} />,
  Loja: <ShoppingBag size={22} />,
  Local: <MapPin size={22} />,
  Video: <Video size={22} />,
  Play: <PlayIcon size={22} />,
  Musica: <Music size={22} />,
  Podcast: <Disc size={22} />,
  Link: <ExternalLink size={22} />
};

// Shared Interface
interface LinkItem {
  id: string;
  title: string;
  url: string;
  clicks: number;
  icon: string;
}

// --- COMPONENTS ---

const LinkEditor: React.FC<{
  link: Partial<LinkItem> | null;
  onClose: () => void;
  onSave: (link: Partial<LinkItem>) => void;
}> = ({ link, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: link?.title || '',
    url: link?.url || '',
    icon: link?.icon || 'ExternalLink'
  });

  const iconOptions = Object.keys(ICON_MAP);

  const isValidUrl = (url: string) => {
    try {
      const pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      return !!pattern.test(url);
    } catch (e) {
      return false;
    }
  };

  const urlError = formData.url && !isValidUrl(formData.url);

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-content" style={{ maxWidth: '440px' }}>
        <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {link?.id ? 'Editar Link' : 'Novo Link'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="input-label">NOME NO BOTÃO</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Meu Instagram"
              className="glass-input"
            />
          </div>

          <div>
            <label className="input-label">URL DO SITE</label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              className={`glass-input ${urlError ? 'error' : ''}`}
            />
            {urlError && (
              <span style={{ color: '#ff4444', fontSize: '0.7rem', marginTop: '4px', display: 'block' }}>
                Insira uma URL válida (ex: https://google.com)
              </span>
            )}
          </div>

          <div>
            <label className="input-label">ESCOLHA O ÍCONE</label>
            <div className="icon-selector-wrapper">
              <div className="icon-selection-grid">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`icon-choice ${formData.icon === icon ? 'active' : ''}`}
                  >
                    {ICON_MAP[icon]}
                    <span style={{ fontSize: '0.6rem', marginTop: '4px', opacity: 0.8 }}>{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={onClose} className="glass-card-mini" style={{ flex: 1, padding: '1rem' }}>
              CANCELAR
            </button>
            <button
              onClick={() => onSave({ ...link, ...formData })}
              className="save-btn"
              style={{ flex: 2, margin: 0 }}
              disabled={!formData.title || !formData.url || !!urlError}
            >
              SALVAR LINK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoEditor: React.FC<{
  image: string;
  onClose: () => void;
  onSave: (croppedImage: string) => void;
}> = ({ image, onClose, onSave }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const CONTAINER_SIZE = 280;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleExport = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = 600; // High quality
    canvas.width = size;
    canvas.height = size;

    if (ctx && imgRef.current && containerRef.current) {
      const img = imgRef.current;
      const rect = img.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Final scale factor to map container space to canvas space
      const canvasScale = size / CONTAINER_SIZE;

      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      const drawWidth = rect.width * canvasScale;
      const drawHeight = rect.height * canvasScale;
      const drawX = (rect.left - containerRect.left) * canvasScale;
      const drawY = (rect.top - containerRect.top) * canvasScale;

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      onSave(canvas.toDataURL('image/jpeg', 0.95));
    }
  };

  return (
    <div className="modal-overlay" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="glass-card modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Ajustar Foto</h3>

        <div
          ref={containerRef}
          className="cropper-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <img
            ref={imgRef}
            src={image}
            alt="To crop"
            draggable={false}
            onLoad={() => {
              setPosition({ x: 0, y: 0 });
              setZoom(1);
            }}
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: 'none',
              minWidth: '100%',
              minHeight: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${zoom})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              pointerEvents: 'none'
            }}
          />
          <div className="cropper-overlay" />
        </div>

        <div style={{ marginTop: '2rem', padding: '0 1rem' }}>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="zoom-slider"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onClick={onClose} className="glass-card-mini" style={{ flex: 1, padding: '1rem' }}>
            <X size={20} /> CANCELAR
          </button>
          <button onClick={handleExport} className="save-btn" style={{ flex: 2, margin: 0 }}>
            <Check size={20} style={{ marginRight: '8px' }} /> CONCLUÍDO
          </button>
        </div>
      </div>
    </div>
  );
};

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
      {profile.avatar ? (
        <img src={profile.avatar} alt={profile.name} className="avatar-main" />
      ) : (
        <div className="avatar-main" style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', background: 'var(--glass-dark)', border: '2px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '2rem', fontWeight: 600 }}>{profile.name.charAt(0)}</span>
        </div>
      )}
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
            {link.icon !== 'Nenhum' && (
              <div className="icon">
                {ICON_MAP[link.icon] || ICON_MAP['Link']}
              </div>
            )}
            <span>{link.title}</span>
          </div>
          <ChevronRight size={18} style={{ opacity: 0.3 }} />
        </a>
      ))}
    </div>
  </div>
);

const AdminDashboard: React.FC<{
  links: LinkItem[],
  profile: any,
  onUpdateProfile: (p: any) => void,
  onAddLink: () => void,
  onEditLink: (link: LinkItem) => void,
  onDeleteLink: (id: string) => void,
  theme: 'dark' | 'light',
  toggleTheme: () => void
}> = ({ links, profile, onUpdateProfile, onAddLink, onEditLink, onDeleteLink, theme, toggleTheme }) => {
  const [localProfile, setLocalProfile] = useState(profile);
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // --- ANALYTICS STATE ---
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '14d' | '30d' | 'custom'>('today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLinkId, setSelectedLinkId] = useState<string>('all');

  const fetchAnalytics = async () => {
    try {
      let q;
      const clicksRef = collection(db, 'clicks');
      const now = new Date();

      if (timeRange === 'custom') {
        const start = new Date(selectedDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(selectedDate);
        end.setHours(23, 59, 59, 999);
        q = query(clicksRef, where('timestamp', '>=', Timestamp.fromDate(start)), where('timestamp', '<=', Timestamp.fromDate(end)));
      } else {
        const days = timeRange === 'today' ? 0 : parseInt(timeRange);
        const startDate = new Date();
        if (days === 0) {
          startDate.setHours(0, 0, 0, 0);
        } else {
          startDate.setDate(now.getDate() - days);
        }
        q = query(clicksRef, where('timestamp', '>=', Timestamp.fromDate(startDate)));
      }

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setAnalyticsData(data);
    } catch (error) {
      console.error("Erro ao buscar analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, selectedDate]);

  const stats = useMemo(() => {
    const filteredData = selectedLinkId === 'all'
      ? analyticsData
      : analyticsData.filter(d => d.linkId === selectedLinkId);

    const total = filteredData.length;
    const linkStats = links.map(link => ({
      ...link,
      periodClicks: analyticsData.filter(d => d.linkId === link.id).length
    }));

    // Horário de Pico
    const hours = new Array(24).fill(0);
    filteredData.forEach(d => {
      const date = d.timestamp?.toDate ? d.timestamp.toDate() : new Date(d.timestamp);
      hours[date.getHours()]++;
    });

    const peakValue = Math.max(...hours);
    const peakHour = hours.indexOf(peakValue);

    return { total, linkStats, peakHour: peakValue > 0 ? `${peakHour}:00 - ${peakHour + 1}:00` : '--:--' };
  }, [analyticsData, links, selectedLinkId]);

  const handleSave = () => {
    onUpdateProfile(localProfile);
    alert('Alterações salvas com sucesso!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setEditingPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onPhotoSave = (croppedImage: string) => {
    setLocalProfile({ ...localProfile, avatar: croppedImage });
    setEditingPhoto(null);
  };

  return (
    <div style={{ width: '100%', marginTop: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '0.4rem', fontFamily: 'Outfit, sans-serif' }}>Admin Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Ajuste suas informações e links.</p>
        </div>
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </header>

      <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '2rem', fontFamily: 'Outfit, sans-serif' }}>Editar Perfil</h3>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <div className="admin-avatar-container">
            {localProfile.avatar ? (
              <img src={localProfile.avatar} alt="Current" className="avatar-main" />
            ) : (
              <div className="avatar-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass-dark)' }}>
                <span style={{ fontSize: '2rem' }}>{localProfile.name.charAt(0)}</span>
              </div>
            )}
            <button className="avatar-edit-badge" onClick={() => fileInputRef.current?.click()}>
              <Pencil size={16} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>NOME PRINCIPAL</label>
              <input
                type="text"
                value={localProfile.name}
                onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                className="glass-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '0.5rem' }}>DESCRIÇÃO</label>
              <textarea
                value={localProfile.bio}
                onChange={(e) => setLocalProfile({ ...localProfile, bio: e.target.value })}
                className="glass-input"
                rows={2}
              />
            </div>

            <button onClick={handleSave} className="save-btn" style={{ fontFamily: 'Outfit, sans-serif' }}>
              SALVAR ALTERAÇÕES
            </button>
          </div>
        </div>
      </div>

      {editingPhoto && (
        <PhotoEditor
          image={editingPhoto}
          onClose={() => setEditingPhoto(null)}
          onSave={onPhotoSave}
        />
      )}

      <div className="analytics-section">
        <div className="link-selector-container">
          <label className="input-label" style={{ marginBottom: '0.8rem' }}>ANALISAR DESEMPENHO DE:</label>
          <div className="link-pills-scroll">
            <button
              className={`link-pill ${selectedLinkId === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedLinkId('all')}
            >
              Todos os Links
            </button>
            {links.map(link => (
              <button
                key={link.id}
                className={`link-pill ${selectedLinkId === link.id ? 'active' : ''}`}
                onClick={() => setSelectedLinkId(link.id)}
              >
                <div className="mini-icon-inline">{ICON_MAP[link.icon]}</div>
                {link.title}
              </button>
            ))}
          </div>
        </div>

        <div className="analytics-header">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>Estatísticas de Cliques</h3>
          <div className="range-selector">
            {(['today', '7d', '14d', '30d'] as const).map(r => (
              <button
                key={r}
                className={`range-btn ${timeRange === r ? 'active' : ''}`}
                onClick={() => setTimeRange(r)}
              >
                {r === 'today' ? 'Hoje' : r}
              </button>
            ))}
            <div className="calendar-input-wrapper">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setTimeRange('custom');
                }}
                className={`calendar-input ${timeRange === 'custom' ? 'active' : ''}`}
              />
            </div>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card highlight">
            <div className="analytics-value">{stats.total.toLocaleString()}</div>
            <div className="analytics-label">Cliques no Período</div>
          </div>
          <div className="analytics-card pulse">
            <div className="analytics-value" style={{ fontSize: '1.4rem' }}>{stats.peakHour}</div>
            <div className="analytics-label">Horário mais Quente</div>
          </div>
          <div className="analytics-card">
            <div className="analytics-value">{links.reduce((acc, l) => acc + l.clicks, 0).toLocaleString()}</div>
            <div className="analytics-label">Total Histórico</div>
          </div>
        </div>

        <div className="links-stats-list">
          {stats.linkStats.map(link => (
            <div key={link.id} className="link-stat-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="mini-icon">{ICON_MAP[link.icon]}</div>
                <span className="link-title">{link.title}</span>
              </div>
              <div className="link-count">
                <strong>{link.periodClicks}</strong>
                <span style={{ fontSize: '0.7rem', opacity: 0.5, marginLeft: '4px' }}> cliques</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${stats.total > 0 ? (link.periodClicks / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 500, fontFamily: 'Outfit, sans-serif' }}>Gerenciar Links</h3>
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
              transition: 'all 0.3s ease',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            <Plus size={16} /> NOVO LINK
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {links.map((link) => (
            <div key={link.id} className="admin-link-row">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div className="admin-link-icon">
                  {ICON_MAP[link.icon] || ICON_MAP['ExternalLink']}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.1rem' }}>{link.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.url}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ textAlign: 'right', marginRight: '1rem' }}>
                  <div style={{ color: 'var(--accent-white)', fontWeight: 700, fontSize: '1.1rem' }}>{link.clicks}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.4 }}>CLIQUES</div>
                </div>
                <button onClick={() => onEditLink(link)} className="action-btn" title="Editar">
                  <Pencil size={16} />
                </button>
                <button onClick={() => onDeleteLink(link.id)} className="action-btn delete" title="Excluir">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [editingLink, setEditingLink] = useState<Partial<LinkItem> | null>(null);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : {
      name: 'Alex Rivera',
      bio: 'Digital Creator & UX Designer',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop'
    };
  });

  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem('links');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Instagram', url: 'https://instagram.com', clicks: 854, icon: 'Instagram' },
      { id: '2', title: 'Twitter / X', url: 'https://twitter.com', clicks: 1205, icon: 'Twitter' },
      { id: '3', title: 'Portfolio Website', url: '#', clicks: 3420, icon: 'ExternalLink' },
      { id: '4', title: 'Latest YouTube Video', url: 'https://youtube.com', clicks: 521, icon: 'Youtube' }
    ];
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  const handleLinkClick = async (id: string) => {
    // 1. Update local counter (optimistic)
    setLinks(prev => prev.map(link =>
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    ));

    // 2. Log to Firestore for "real" global analytics
    try {
      const link = links.find(l => l.id === id);
      await addDoc(collection(db, 'clicks'), {
        linkId: id,
        linkTitle: link?.title || 'Unknown',
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.error("Erro ao registrar clique:", e);
    }
  };

  const handleSaveLink = (linkData: Partial<LinkItem>) => {
    if (linkData.id) {
      setLinks(prev => prev.map(l => l.id === linkData.id ? { ...l, ...linkData } as LinkItem : l));
    } else {
      const newLink: LinkItem = {
        id: Date.now().toString(),
        title: linkData.title || 'Novo Link',
        url: linkData.url || '#',
        clicks: 0,
        icon: linkData.icon || 'ExternalLink'
      };
      setLinks(prev => [...prev, newLink]);
    }
    setEditingLink(null);
  };

  const handleDeleteLink = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este link?')) {
      setLinks(prev => prev.filter(l => l.id !== id));
    }
  };

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <div className="premium-container">
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
                profile={profile}
                onUpdateProfile={setProfile}
                onAddLink={() => setEditingLink({})}
                onEditLink={setEditingLink}
                onDeleteLink={handleDeleteLink}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {editingLink && (
          <LinkEditor
            link={editingLink}
            onClose={() => setEditingLink(null)}
            onSave={handleSaveLink}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
