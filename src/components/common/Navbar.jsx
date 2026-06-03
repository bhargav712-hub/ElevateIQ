import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogIn, FiUserPlus, FiGrid } from 'react-icons/fi';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Placements', path: '/placements' },
  { label: 'Jobs', path: '/jobs' },
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
  const bg = scrolled || !isHome ? 'rgba(15,23,42,0.97)' : 'transparent';
  const shadow = scrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: bg, boxShadow: shadow, transition: 'var(--transition)',
      backdropFilter: scrolled ? 'blur(12px)' : 'none', padding: '0 24px'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70, padding: 0 }}>
        <Logo style={{ color: 'white' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {navLinks.map(link => (
              <Link key={link.path} to={link.path} style={{
                padding: '8px 14px', color: location.pathname === link.path ? 'var(--primary-light)' : 'rgba(255,255,255,0.75)',
                fontSize: 14, fontWeight: 500, borderRadius: 6, transition: 'var(--transition)',
                background: location.pathname === link.path ? 'rgba(37,99,235,0.15)' : 'transparent',
                display: 'none',
              }}
                className="nav-link"
              >{link.label}</Link>
            ))}
          </div>

          {isAuthenticated ? (
            <Link to={`/${user.role}-dashboard`} className="btn btn-primary btn-sm">
              <FiGrid size={14} /> Dashboard
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <FiLogIn size={14} /> Login
              </Link>
            </div>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer', padding: 8
          }} className="mobile-menu-btn">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: 'var(--gray-900)', padding: 16, display: 'none' }} className="mobile-menu">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 16px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.06)',
              fontSize: 14, borderRadius: 6
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
