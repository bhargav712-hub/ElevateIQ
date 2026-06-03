import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Placements', path: '/placements' },
  { label: 'Career', path: '/career' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = location.pathname === '/';
  const bg = scrolled || !isHome ? 'rgba(26,26,46,0.98)' : 'transparent';
  const shadow = scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: bg, boxShadow: shadow, transition: 'var(--transition)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none', padding: '0 20px'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>
          <span style={{ fontSize: '1.8rem' }}>⚡</span> EduVance Pro
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                padding: '8px 16px', color: location.pathname === link.path ? 'var(--primary-light)' : 'rgba(255,255,255,0.8)',
                fontSize: 14, fontWeight: 500, borderRadius: 8, transition: 'var(--transition)',
                borderBottom: location.pathname === link.path ? '2px solid var(--primary)' : '2px solid transparent',
                display: 'none',
              }}
                className="nav-link"
                onMouseEnter={e => e.target.style.color = 'var(--primary-light)'}
                onMouseLeave={e => e.target.style.color = location.pathname === link.path ? 'var(--primary-light)' : 'rgba(255,255,255,0.8)'}
              >{link.label}</Link>
            ))}
          </div>

          {isAuthenticated ? (
            <Link to={`/${user.role}-dashboard`} className="btn btn-primary btn-sm">
              Dashboard
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 28, cursor: 'pointer', padding: 8
          }} className="mobile-menu-btn">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: 'var(--gray-900)', padding: 20, display: 'none' }} className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 16px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>{link.label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .nav-link { display: inline-block !important; } .mobile-menu-btn { display: none !important; } .mobile-menu { display: none !important; } }
        @media (max-width: 768px) { .nav-link { display: none !important; } .mobile-menu-btn { display: inline-block !important; } .mobile-menu { display: block !important; } }
      `}</style>
    </nav>
  );
}
