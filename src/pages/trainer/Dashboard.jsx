import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function TrainerDashboard() {
  const stats = [
    { icon: '📚', value: '4', label: 'Active Courses' },
    { icon: '👥', value: '128', label: 'Total Students' },
    { icon: '📝', value: '6', label: 'Upcoming Tests' },
    { icon: '📊', value: '92%', label: 'Avg Performance' },
  ];

  const upcomingClasses = [
    { title: 'React Hooks Deep Dive', time: 'Today, 10:00 AM', students: 45, room: 'Zoom A' },
    { title: 'Node.js REST APIs', time: 'Today, 2:00 PM', students: 42, room: 'Zoom A' },
    { title: 'MongoDB Aggregation', time: 'Tomorrow, 10:00 AM', students: 38, room: 'Zoom B' },
    { title: 'Express Middleware', time: 'Tomorrow, 2:00 PM', students: 40, room: 'Zoom A' },
  ];

  const pendingTasks = [
    { task: 'Grade assignments - React Todo App', count: 12, type: 'warning' },
    { task: 'Review test submissions', count: 8, type: 'info' },
    { task: 'Upload recording - Session 12', count: 1, type: 'primary' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👩‍🏫 Trainer Dashboard</h1>
        <p style={{ color: 'var(--gray-500)' }}>Manage your courses, classes, and students.</p>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: 14 }}>{cls.title}</h4>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{cls.time} • 👥 {cls.students} • 📍 {cls.room}</p>
                  </div>
                  <button className="btn btn-primary btn-sm">Join</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📋 Pending Tasks</h3>
            {pendingTasks.map((task, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < pendingTasks.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className={`badge badge-${task.type}`}>{task.count}</span>
                  <span style={{ fontSize: 14 }}>{task.task}</span>
                </div>
                <button className="btn btn-outline btn-sm">Go</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📈 Course Performance Overview</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Students</th>
                  <th>Avg Score</th>
                  <th>Completion</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { course: 'Full Stack Web Dev', students: 45, score: 82, completion: 72, attendance: 89 },
                  { course: 'Data Science & ML', students: 38, score: 78, completion: 45, attendance: 85 },
                  { course: 'Cloud Architecture', students: 25, score: 88, completion: 60, attendance: 92 },
                  { course: 'UI/UX Design', students: 20, score: 90, completion: 90, attendance: 95 },
                ].map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{row.course}</td>
                    <td>{row.students}</td>
                    <td>{row.score}%</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ flex: 1, maxWidth: 100 }}>
                          <div className="progress-fill" style={{ width: `${row.completion}%` }} />
                        </div>
                        <span style={{ fontSize: 12 }}>{row.completion}%</span>
                      </div>
                    </td>
                    <td>{row.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
