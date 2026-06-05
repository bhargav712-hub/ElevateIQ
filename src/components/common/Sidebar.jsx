import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiGrid, FiBookOpen, FiCheckSquare, FiFileText, FiVideo, 
  FiCalendar, FiCreditCard, FiAward, FiMessageCircle, FiUsers, FiClock, 
  FiLayers, FiVolume2, FiBriefcase, FiGlobe, FiTrendingUp, 
  FiMail, FiLogOut, FiZap, FiUser
} from 'react-icons/fi';

const studentLinks = [
  { label: 'Dashboard', path: '/student-dashboard', icon: FiGrid },
  { label: 'My Courses', path: '/student-courses', icon: FiBookOpen },
  { label: 'Tests & Exams', path: '/student-tests', icon: FiCheckSquare },
  { label: 'Assignments', path: '/student-assignments', icon: FiFileText },
  { label: 'Class Recordings', path: '/student-recordings', icon: FiVideo },
  // { label: 'Exam Slots', path: '/student-exam-slots', icon: FiCalendar },
  // { label: 'Payment History', path: '/student-payments', icon: FiCreditCard },
  { label: 'Certificates', path: '/student-certificates', icon: FiAward },
  { label: 'Trainer Chat', path: '/student-chat', icon: FiMessageCircle },
];

const trainerLinks = [
  { label: 'Dashboard', path: '/trainer-dashboard', icon: FiGrid },
  { label: 'My Courses', path: '/trainer-courses', icon: FiBookOpen },
  { label: 'Schedule Classes', path: '/trainer-schedule', icon: FiCalendar },
  { label: 'Create Tests', path: '/trainer-tests', icon: FiCheckSquare },
  { label: 'Assignments', path: '/trainer-assignments', icon: FiFileText },
  { label: 'Upload Recordings', path: '/trainer-recordings', icon: FiVideo },
  { label: 'Students', path: '/trainer-students', icon: FiUsers },
];

const employeeLinks = [
  { label: 'Dashboard', path: '/employee-dashboard', icon: FiGrid },
  { label: 'Clock In/Out', path: '/employee-attendance', icon: FiClock },
  { label: 'Leave Requests', path: '/employee-leave', icon: FiLayers },
  { label: 'Meetings', path: '/employee-meetings', icon: FiVideo },
  { label: 'Raise Ticket', path: '/employee-tickets', icon: FiFileText },
  { label: 'Announcements', path: '/employee-announcements', icon: FiVolume2 },
];

const adminLinks = [
  { label: 'Dashboard', path: '/admin-dashboard', icon: FiGrid },
  { label: 'Students', path: '/admin-students', icon: FiUsers },
  { label: 'Trainers', path: '/admin-trainers', icon: FiUsers },
  { label: 'Employees', path: '/admin-employees', icon: FiUsers },
  { label: 'Courses', path: '/admin-courses', icon: FiBookOpen },
  { label: 'Payments', path: '/admin-payments', icon: FiCreditCard },
  { label: 'Placements', path: '/admin-placements', icon: FiBriefcase },
  { label: 'Website Content', path: '/admin-content', icon: FiGlobe },
  { label: 'Reports', path: '/admin-reports', icon: FiTrendingUp },
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
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }} className="sidebar-overlay" />}
      <aside className={`portal-sidebar ${open ? 'open' : ''}`} style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.25rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
            <FiZap style={{ color: 'var(--primary-light)', filter: 'drop-shadow(0 0 6px rgba(37, 99, 235, 0.5))' }} />
            <span>EduVance</span>
          </Link>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'white'
            }}>
              {user?.avatar ? <span>{user.avatar}</span> : <FiUser />}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: 'white' }}>{user?.name}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'capitalize', fontWeight: 500 }}>{user?.role}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {links.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} onClick={onClose} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
                background: isActive ? 'linear-gradient(90deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.02) 100%)' : 'transparent',
                borderRight: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                fontSize: 14, fontWeight: 500, transition: 'var(--transition)',
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon style={{ fontSize: '1.1rem', color: isActive ? 'var(--primary-light)' : 'inherit' }} /> 
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 500 }}
             onMouseEnter={e => e.currentTarget.style.color = 'white'}
             onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            <FiGlobe /> Public Site
          </Link>
          <button onClick={logout} style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer',
            padding: '8px 0', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, width: '100%',
            fontWeight: 500, transition: 'var(--transition)'
          }}
             onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
             onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            <FiLogOut /> Logout
          </button>
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
