import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiGrid, FiBook, FiFileText, FiVideo, FiCalendar, FiCreditCard, FiAward,
  FiEdit3, FiUsers, FiClock, FiClipboard, FiBell, FiUserCheck, FiDollarSign, FiBriefcase, FiGlobe, FiBarChart2, FiMail, FiLogOut, FiUser, FiChevronRight
} from 'react-icons/fi';
import Logo from './Logo';

const studentLinks = [
  { label: 'Dashboard', path: '/student-dashboard', icon: FiGrid },
  { label: 'My Courses', path: '/student-courses', icon: FiBook },
  { label: 'Tests & Exams', path: '/student-tests', icon: FiEdit3 },
  { label: 'Assignments', path: '/student-assignments', icon: FiFileText },
  { label: 'Class Recordings', path: '/student-recordings', icon: FiVideo },
  { label: 'Exam Slots', path: '/student-exam-slots', icon: FiCalendar },
  { label: 'Payment History', path: '/student-payments', icon: FiCreditCard },
  { label: 'Certificates', path: '/student-certificates', icon: FiAward },
];

const trainerLinks = [
  { label: 'Dashboard', path: '/trainer-dashboard', icon: FiGrid },
  { label: 'My Courses', path: '/trainer-courses', icon: FiBook },
  { label: 'Schedule Classes', path: '/trainer-schedule', icon: FiCalendar },
  { label: 'Create Tests', path: '/trainer-tests', icon: FiEdit3 },
  { label: 'Assignments', path: '/trainer-assignments', icon: FiFileText },
  { label: 'Upload Recordings', path: '/trainer-recordings', icon: FiVideo },
  { label: 'Students', path: '/trainer-students', icon: FiUsers },
];

const employeeLinks = [
  { label: 'Dashboard', path: '/employee-dashboard', icon: FiGrid },
  { label: 'Clock In/Out', path: '/employee-attendance', icon: FiClock },
  { label: 'Leave Requests', path: '/employee-leave', icon: FiFileText },
  { label: 'Meetings', path: '/employee-meetings', icon: FiVideo },
  { label: 'Raise Ticket', path: '/employee-tickets', icon: FiClipboard },
  { label: 'Announcements', path: '/employee-announcements', icon: FiBell },
];

const adminLinks = [
  { label: 'Dashboard', path: '/admin-dashboard', icon: FiGrid },
  { label: 'Students', path: '/admin-students', icon: FiUserCheck },
  { label: 'Trainers', path: '/admin-trainers', icon: FiUsers },
  { label: 'Employees', path: '/admin-employees', icon: FiUsers },
  { label: 'Courses', path: '/admin-courses', icon: FiBook },
  { label: 'Payments', path: '/admin-payments', icon: FiDollarSign },
  { label: 'Placements', path: '/admin-placements', icon: FiBriefcase },
  { label: 'Website Content', path: '/admin-content', icon: FiGlobe },
  { label: 'Reports', path: '/admin-reports', icon: FiBarChart2 },
  { label: 'Email Logs', path: '/admin-emails', icon: FiMail },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  let links = [];
  if (user?.role === 'student') links = studentLinks;
  else if (user?.role === 'trainer') links = trainerLinks;
  else if (user?.role === 'employee') links = employeeLinks;
  else if (user?.role === 'admin') links = adminLinks;

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.5)' }} className="sidebar-overlay" />}
      <aside className={`portal-sidebar ${open ? 'open' : ''}`}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Logo style={{ color: 'white' }} />
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: 'white'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '8px 0' }}>
          {links.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} onClick={onClose} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px',
                color: isActive ? 'var(--primary-light)' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(37,99,235,0.12)' : 'transparent',
                borderRight: isActive ? '3px solid var(--primary-light)' : '3px solid transparent',
                fontSize: 14, fontWeight: 500, transition: 'var(--transition)',
              }}
                onMouseEnter={e => { if (!isActive) e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!isActive) e.target.style.background = 'transparent'; }}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 'auto' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            <FiGlobe size={14} /> Public Site
          </Link>
          <button onClick={logout} style={{
            background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer',
            padding: '8px 0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, width: '100%', opacity: 0.8
          }}>
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </aside>
      <style>{`
        @media (max-width: 768px) { .sidebar-overlay { display: block !important; } }
        @media (min-width: 769px) { .sidebar-overlay { display: none !important; } }
      `}</style>
    </>
  );
}
