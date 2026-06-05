import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../components/common/Toast';
import { FiClock, FiLayers, FiFileText, FiVolume2, FiBriefcase, FiCalendar, FiUser, FiActivity } from 'react-icons/fi';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [toast, setToast] = useState(null);
  const [clockedIn, setClockedIn] = useState(false);
  const [clockTime, setClockTime] = useState(null);

  const stats = [
    { icon: FiClock, value: clockedIn ? 'Active' : 'Offline', label: 'Status', color: clockedIn ? 'var(--success)' : 'var(--danger)' },
    { icon: FiLayers, value: '2', label: 'Leaves This Month', color: 'var(--primary)' },
    { icon: FiFileText, value: '3', label: 'Open Tickets', color: 'var(--accent)' },
    { icon: FiVolume2, value: '5', label: 'New Announcements', color: 'var(--warning)' },
  ];

  const handleClock = () => {
    if (!clockedIn) {
      setClockedIn(true);
      const now = new Date();
      setClockTime(now.toLocaleTimeString());
      setToast({ message: `Clocked in at ${now.toLocaleTimeString()}`, type: 'success' });
    } else {
      setClockedIn(false);
      setToast({ message: `Clocked out at ${new Date().toLocaleTimeString()}`, type: 'info' });
    }
  };

  const todayMeetings = [
    { title: 'Weekly Standup', time: '9:30 AM', room: 'Zoom Main', with: 'Dev Team' },
    { title: 'Placement Strategy', time: '11:00 AM', room: 'Conference A', with: 'HR Team' },
    { title: '1:1 with Manager', time: '3:00 PM', room: 'Manager Office', with: 'Sarah Williams' },
  ];

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ marginBottom: 30, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: '2rem', color: 'var(--primary)', display: 'inline-flex' }}><FiBriefcase /></span>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>Employee Dashboard</h1>
          <p style={{ color: 'var(--gray-500)', margin: 0 }}>Welcome back, {user?.name}!</p>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 30 }}>
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="stat-icon" style={{ color: s.color, display: 'inline-flex', justifyContent: 'center', marginBottom: 12 }}><Icon /></div>
              <div className="stat-value" style={{ fontSize: clockedIn && i === 0 ? '1.2rem' : '1.5rem' }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-body" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center' }}>
              <FiClock style={{ color: 'var(--primary)' }} /> Time Tracking
            </h3>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: clockedIn ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: clockedIn ? 'var(--success)' : 'var(--danger)', fontSize: '2rem', marginBottom: 12 }}>
              <FiActivity className={clockedIn ? 'animate-pulse' : ''} style={{ animation: clockedIn ? 'spin 8s linear infinite' : 'none' }} />
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 4 }}>
              {clockedIn ? 'Clocked In' : 'Clocked Out'}
            </div>
            {clockTime && <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 8 }}>Last action: {clockTime}</p>}
            <button onClick={handleClock} className={`btn btn-lg ${clockedIn ? 'btn-accent' : 'btn-success'}`} style={{ marginTop: 8 }}>
              {clockedIn ? 'Clock Out' : 'Clock In'}
            </button>
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiCalendar style={{ color: 'var(--secondary)' }} /> Today's Meetings
            </h3>
            {todayMeetings.map((m, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < todayMeetings.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: 14 }}>{m.title}</h4>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
                      <span>{m.time}</span>
                      <span>• {m.room}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}><FiUser style={{ fontSize: 12 }} /> {m.with}</span>
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm">Join</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiLayers style={{ color: 'var(--accent)' }} /> Recent Activity
            </h3>
            {[
              { action: 'Raised ticket #1024 - System Access Issue', time: '1 hour ago' },
              { action: 'Leave approved for June 10-12', time: '3 hours ago' },
              { action: 'Completed weekly task report', time: 'Yesterday' },
            ].map((act, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--gray-200)' : 'none', fontSize: 14 }}>
                <p style={{ margin: '0 0 4px 0' }}>{act.action}</p>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{act.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiVolume2 style={{ color: 'var(--warning)' }} /> Recent Announcements
            </h3>
            {[
              { title: 'Office Holiday on June 15', date: 'June 2, 2026', priority: 'high' },
              { title: 'New Placement Drive - Google', date: 'June 1, 2026', priority: 'high' },
              { title: 'Team Outing This Friday', date: 'May 30, 2026', priority: 'low' },
            ].map((ann, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${ann.priority === 'high' ? 'badge-danger' : 'badge-primary'}`} style={{ fontSize: 11, padding: '2px 8px' }}>
                    {ann.priority === 'high' ? 'High' : 'Normal'}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{ann.title}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4, marginLeft: 0 }}>{ann.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
