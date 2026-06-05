import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const enrolled = user?.enrolledCourses || [];

  const stats = [
    { icon: '📚', value: enrolled.length, label: 'Enrolled Courses' },
    { icon: '📊', value: '68%', label: 'Overall Progress' },
    { icon: '📝', value: '4', label: 'Upcoming Tests' },
    { icon: '🎯', value: '89%', label: 'Attendance Rate' },
  ];

  const upcomingClasses = [
    { title: 'React Hooks Deep Dive', time: 'Today, 10:00 AM', trainer: 'Anita Sharma', status: 'upcoming' },
    { title: 'Node.js REST APIs', time: 'Today, 2:00 PM', trainer: 'Anita Sharma', status: 'upcoming' },
    { title: 'MongoDB Aggregation', time: 'Tomorrow, 10:00 AM', trainer: 'Rajesh Kumar', status: 'upcoming' },
  ];

  const recentActivity = [
    { action: 'Submitted Assignment: React Todo App', time: '2 hours ago', type: 'success' },
    { action: 'Attended Class: JavaScript Basics', time: 'Yesterday', type: 'info' },
    { action: 'Test Result: HTML/CSS - 92%', time: '2 days ago', type: 'success' },
    { action: 'Payment: Course fee paid', time: '1 week ago', type: 'info' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎓 Student Dashboard</h1>
        <p style={{ color: 'var(--gray-500)' }}>Welcome back, {user?.name}! Here's your learning overview.</p>
      </div>

      <div className="grid-4" style={{ marginBottom: 30 }}>
        {stats.map((s, i) => (
          <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📅 Upcoming Classes</h3>
            {upcomingClasses.map((cls, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < upcomingClasses.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: 14 }}>{cls.title}</h4>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{cls.time} • {cls.trainer}</p>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: 11 }}>Live</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📊 Course Progress</h3>
            {[
              { name: 'Full Stack Web Development', progress: 72 },
              { name: 'Data Science & ML', progress: 45 },
              { name: 'UI/UX Design', progress: 90 },
            ].map((course, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid-2">
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>🎯 Recent Activity</h3>
            {recentActivity.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <span style={{ fontSize: '1.2rem' }}>{act.type === 'success' ? '✅' : 'ℹ️'}</span>
                <div>
                  <p style={{ fontSize: 14 }}>{act.action}</p>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📋 Attendance Overview</h3>
            {[
              { subject: 'Full Stack Web Dev', attended: 22, total: 25 },
              { subject: 'Data Science', attended: 15, total: 20 },
              { subject: 'UI/UX Design', attended: 18, total: 18 },
            ].map((a, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{a.subject}</span>
                  <span>{a.attended}/{a.total} ({Math.round(a.attended / a.total * 100)}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${a.attended / a.total * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
