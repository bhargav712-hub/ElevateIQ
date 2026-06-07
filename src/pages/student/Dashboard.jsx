import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/student/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Loading dashboard...</div>;
  }

  const stats = [
    { icon: '📚', value: data?.stats?.enrolledCount || 0, label: 'Enrolled Courses' },
    { icon: '📊', value: data?.stats?.overallProgress || '0%', label: 'Overall Progress' },
    { icon: '📝', value: data?.stats?.upcomingTestsCount || 0, label: 'Upcoming Tests' },
    { icon: '🎯', value: data?.stats?.attendanceRate || '0%', label: 'Attendance Rate' },
  ];

  const upcomingClasses = data?.upcomingClasses || [];
  const courseProgress = data?.courseProgress || [];
  const recentActivity = data?.recentActivities || [];

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
            {upcomingClasses.length === 0 && <p style={{fontSize: 14, color: 'var(--gray-500)'}}>No upcoming classes</p>}
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
            {courseProgress.length === 0 && <p style={{fontSize: 14, color: 'var(--gray-500)'}}>No enrolled courses</p>}
            {courseProgress.map((course, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{course.courseName}</span>
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
            {recentActivity.length === 0 && <p style={{fontSize: 14, color: 'var(--gray-500)'}}>No recent activity</p>}
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
            {courseProgress.length === 0 && <p style={{fontSize: 14, color: 'var(--gray-500)'}}>No attendance data</p>}
            {courseProgress.map((a, i) => {
              const rate = a.total > 0 ? Math.round((a.attended / a.total) * 100) : 0;
              return (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{a.courseName}</span>
                    <span>{a.attended}/{a.total} ({rate}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
