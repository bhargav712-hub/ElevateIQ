import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { icon: '👨‍🎓', value: '1,250', label: 'Total Students' },
    { icon: '👩‍🏫', value: '48', label: 'Active Trainers' },
    { icon: '👥', value: '32', label: 'Employees' },
    { icon: '📚', value: '24', label: 'Active Courses' },
    { icon: '💳', value: '$1.2M', label: 'Revenue' },
    { icon: '💼', value: '92%', label: 'Placement Rate' },
  ];

  const recentPayments = [
    { id: 'INV-004', student: 'Rahul Verma', course: 'Full Stack Web Dev', amount: 2999, date: '2026-06-01', status: 'paid' },
    { id: 'INV-005', student: 'Priya Sharma', course: 'Data Science', amount: 3499, date: '2026-06-01', status: 'paid' },
    { id: 'INV-006', student: 'Amit Singh', course: 'Cloud Arch', amount: 2499, date: '2026-05-31', status: 'pending' },
    { id: 'INV-007', student: 'Neha Gupta', course: 'UI/UX Design', amount: 2199, date: '2026-05-30', status: 'paid' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👩‍💻 Admin Dashboard</h1>
        <p style={{ color: 'var(--gray-500)' }}>Full platform overview and management</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 30 }}>
        {stats.map((s, i) => (
          <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📈 Revenue Overview (Last 6 Months)</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 150, padding: '0 8px' }}>
              {[
                { month: 'Jan', value: 65 }, { month: 'Feb', value: 78 }, { month: 'Mar', value: 82 },
                { month: 'Apr', value: 70 }, { month: 'May', value: 90 }, { month: 'Jun', value: 95 },
              ].map((m, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '100%', background: 'linear-gradient(180deg, var(--primary), var(--secondary))',
                    borderRadius: '6px 6px 0 0', height: `${m.value}%`, transition: 'height 0.5s ease',
                    minHeight: 20, display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    paddingTop: 4, fontSize: 10, color: 'white', fontWeight: 700
                  }}>{m.value}%</div>
                  <span style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 4 }}>{m.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>💳 Recent Payments</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr><th>Invoice</th><th>Student</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {recentPayments.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 13 }}>{p.id}</td>
                      <td>{p.student}</td>
                      <td style={{ fontWeight: 700 }}>${p.amount}</td>
                      <td><span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>👥 Platform Users</h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Students', value: 1250, color: 'var(--primary)' },
                { label: 'Trainers', value: 48, color: 'var(--secondary)' },
                { label: 'Employees', value: 32, color: 'var(--accent)' },
                { label: 'Admins', value: 5, color: 'var(--warning)' },
              ].map((u, i) => (
                <div key={i} style={{ flex: 1, minWidth: 120, padding: 16, borderRadius: 12, background: 'var(--gray-100)', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: u.color }}>{u.value}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{u.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>⚠️ Pending Actions</h3>
            {[
              { task: 'Pending payment approvals', count: 5, type: 'warning' },
              { task: 'New trainer applications', count: 3, type: 'info' },
              { task: 'Placement requests to process', count: 8, type: 'primary' },
              { task: 'Support tickets open', count: 12, type: 'danger' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--gray-200)' : 'none' }}>
                <span style={{ fontSize: 14 }}>{a.task}</span>
                <span className={`badge badge-${a.type}`}>{a.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
