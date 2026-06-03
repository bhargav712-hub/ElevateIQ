import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

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
        <header className="portal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setSidebarOpen(true)} style={{
              display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'
            }} className="hamburger">☰</button>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{titleMap[user?.role] || 'Portal'}</h2>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>Welcome back, {user?.name}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link to="/" style={{ fontSize: 13, color: 'var(--gray-500)' }}>🌐 Public Site</Link>
            <span style={{ fontSize: '1.5rem' }}>{user?.avatar || '👤'}</span>
          </div>
        </header>
        <div className="portal-content animate-fade-in">
          <Outlet />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .hamburger { display: inline-block !important; } }
      `}</style>
    </div>
  );
}
