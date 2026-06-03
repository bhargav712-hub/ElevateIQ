import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const studentLinks = [
  { label: 'Dashboard', path: '/student-dashboard', icon: '📊' },
  { label: 'My Courses', path: '/student-courses', icon: '📚' },
  { label: 'Tests & Exams', path: '/student-tests', icon: '📝' },
  { label: 'Assignments', path: '/student-assignments', icon: '📄' },
  { label: 'Class Recordings', path: '/student-recordings', icon: '🎥' },
  { label: 'Exam Slots', path: '/student-exam-slots', icon: '📅' },
  { label: 'Payment History', path: '/student-payments', icon: '💳' },
  { label: 'Certificates', path: '/student-certificates', icon: '🏆' },
];

const trainerLinks = [
  { label: 'Dashboard', path: '/trainer-dashboard', icon: '📊' },
  { label: 'My Courses', path: '/trainer-courses', icon: '📚' },
  { label: 'Schedule Classes', path: '/trainer-schedule', icon: '📅' },
  { label: 'Create Tests', path: '/trainer-tests', icon: '📝' },
  { label: 'Assignments', path: '/trainer-assignments', icon: '📄' },
  { label: 'Upload Recordings', path: '/trainer-recordings', icon: '🎥' },
  { label: 'Students', path: '/trainer-students', icon: '👥' },
];

const employeeLinks = [
  { label: 'Dashboard', path: '/employee-dashboard', icon: '📊' },
  { label: 'Clock In/Out', path: '/employee-attendance', icon: '⏰' },
  { label: 'Leave Requests', path: '/employee-leave', icon: '📋' },
  { label: 'Meetings', path: '/employee-meetings', icon: '🎥' },
  { label: 'Raise Ticket', path: '/employee-tickets', icon: '🎫' },
  { label: 'Announcements', path: '/employee-announcements', icon: '📢' },
];

const adminLinks = [
  { label: 'Dashboard', path: '/admin-dashboard', icon: '📊' },
  { label: 'Students', path: '/admin-students', icon: '👨‍🎓' },
  { label: 'Trainers', path: '/admin-trainers', icon: '👩‍🏫' },
  { label: 'Employees', path: '/admin-employees', icon: '👥' },
  { label: 'Courses', path: '/admin-courses', icon: '📚' },
  { label: 'Payments', path: '/admin-payments', icon: '💳' },
  { label: 'Placements', path: '/admin-placements', icon: '💼' },
  { label: 'Website Content', path: '/admin-content', icon: '🌐' },
  { label: 'Reports', path: '/admin-reports', icon: '📈' },
  { label: 'Email Logs', path: '/admin-emails', icon: '📧' },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  let links = [];
  if (user?.role === 'student') links = studentLinks;
  else if (user?.role === 'trainer') links = trainerLinks;
  else if (user?.role === 'employee') links = employeeLinks;
  else if (user?.role === 'admin') links = adminLinks;

  const dashboardPath = `/${user?.role}-dashboard`;

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.5)' }} className="sidebar-overlay" />}
      <aside className={`portal-sidebar ${open ? 'open' : ''}`}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>
            ⚡ EduVance
          </Link>
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '2rem' }}>{user?.avatar || '👤'}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 0' }}>
          {links.map(link => (
            <Link key={link.path} to={link.path} onClick={onClose} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
              color: location.pathname === link.path ? 'var(--primary-light)' : 'rgba(255,255,255,0.7)',
              background: location.pathname === link.path ? 'rgba(108,92,231,0.15)' : 'transparent',
              borderRight: location.pathname === link.path ? '3px solid var(--primary)' : '3px solid transparent',
              fontSize: 14, fontWeight: 500, transition: 'var(--transition)',
            }}
              onMouseEnter={e => { if (location.pathname !== link.path) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (location.pathname !== link.path) e.target.style.background = 'transparent'; }}
            >
              <span>{link.icon}</span> {link.label}
            </Link>
          ))}
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 'auto' }}>
          <Link to="/" style={{ display: 'block', padding: '8px 0', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>🌐 Public Site</Link>
          <button onClick={logout} style={{
            background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer',
            padding: '8px 0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, width: '100%'
          }}>🚪 Logout</button>
        </div>
      </aside>
      <style>{`
        @media (max-width: 768px) {
          .sidebar-overlay { display: block !important; }
        }
        @media (min-width: 769px) {
          .sidebar-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}
