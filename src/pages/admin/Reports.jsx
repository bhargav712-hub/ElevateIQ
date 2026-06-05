export default function AdminReports() {
  const reports = [
    { title: 'Monthly Revenue Report', date: 'June 2026', type: 'Financial', size: '2.4 MB' },
    { title: 'Student Enrollment Analytics', date: 'Q2 2026', type: 'Analytics', size: '1.8 MB' },
    { title: 'Placement Performance', date: '2026 Batch', type: 'Placement', size: '1.2 MB' },
    { title: 'Trainer Performance Review', date: 'May 2026', type: 'HR', size: '0.8 MB' },
    { title: 'Course Completion Rates', date: '2026', type: 'Academic', size: '1.5 MB' },
    { title: 'Attendance Summary', date: 'May 2026', type: 'Academic', size: '0.6 MB' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📈 Reports & Analytics</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Generate and download platform reports</p>

      <div className="grid-3" style={{ marginBottom: 30 }}>
        {[
          { icon: '👨‍🎓', label: 'Total Students', value: '1,250', change: '+12%' },
          { icon: '💰', label: 'Monthly Revenue', value: '$245K', change: '+8%' },
          { icon: '💼', label: 'Placements This Qtr', value: '86', change: '+15%' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label} <span style={{ color: 'var(--success)', fontWeight: 600 }}>{s.change}</span></div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Available Reports</h3>
          <div className="table-responsive">
            <table>
              <thead><tr><th>Report</th><th>Period</th><th>Type</th><th>Size</th><th>Actions</th></tr></thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.title}</td>
                    <td>{r.date}</td><td>{r.type}</td><td>{r.size}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-sm btn-primary">⬇ Download</button>
                        <button className="btn btn-sm btn-outline">📧 Email</button>
                      </div>
                    </td>
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
