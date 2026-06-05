import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiUser, FiGlobe } from 'react-icons/fi';

export default function PortalLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titleMap = {
    student: 'Student Portal',
    trainer: 'Trainer Portal',
    employee: 'Employee Portal',
    admin: 'Admin Portal',
  };

  return (
    <div className="portal-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="portal-main">
        <header className="portal-header" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--gray-200)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setSidebarOpen(true)} style={{
              display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer',
              alignItems: 'center', justifyContent: 'center', color: 'var(--gray-700)'
            }} className="hamburger">
              <FiMenu />
            </button>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark)', letterSpacing: '-0.3px' }}>{titleMap[user?.role] || 'Portal'}</h2>
              <p style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 500 }}>Welcome back, {user?.name}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link to="/" style={{ fontSize: 13, color: 'var(--gray-600)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}
               className="nav-hover-item"
            >
              <FiGlobe /> Public Site
            </Link>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: 'var(--gray-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: 'var(--gray-700)'
            }}>
              {user?.avatar ? <span>{user.avatar}</span> : <FiUser />}
            </div>
          </div>
        </header>
        <div className="portal-content animate-fade-in">
          <Outlet />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .hamburger { display: flex !important; } }
        .nav-hover-item:hover { color: var(--primary) !important; }
      `}</style>
    </div>
  );
}
