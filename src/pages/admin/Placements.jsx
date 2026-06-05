import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function AdminPlacements() {
  const [toast, setToast] = useState(null);

  const stats = [
    { icon: '💼', value: '92%', label: 'Placement Rate' },
    { icon: '💰', value: '$110K', label: 'Avg Salary' },
    { icon: '🏢', value: '500+', label: 'Hiring Partners' },
    { icon: '🎯', value: '45 Days', label: 'Avg Time to Offer' },
  ];

  const placements = [
    { name: 'Sarah Johnson', company: 'Google', role: 'Software Engineer', package: '$120K', batch: '2026', status: 'placed' },
    { name: 'Michael Chen', company: 'Amazon', role: 'Data Scientist', package: '$135K', batch: '2026', status: 'placed' },
    { name: 'Priya Sharma', company: 'Microsoft', role: 'Cloud Architect', package: '$145K', batch: '2026', status: 'placed' },
    { name: 'James Wilson', company: 'Apple', role: 'Product Designer', package: '$110K', batch: '2026', status: 'placed' },
    { name: 'Ananya Rao', company: 'Meta', role: 'Frontend Dev', package: '$115K', batch: '2026', status: 'placed' },
  ];

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>💼 Manage Placements</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Track placements, companies, and success stories</p>

      <div className="grid-4" style={{ marginBottom: 30 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Add Placement Record</h3>
          <form onSubmit={(e) => { e.preventDefault(); setToast({ message: 'Placement record added!', type: 'success' }); }}>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>Student Name</label>
                <input placeholder="Student name" />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input placeholder="Company name" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input placeholder="Job role" />
              </div>
              <div className="form-group">
                <label>Package</label>
                <input placeholder="e.g., $120K" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Record →</button>
          </form>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Add Hiring Partner</h3>
          <form onSubmit={(e) => { e.preventDefault(); setToast({ message: 'Hiring partner added!', type: 'success' }); }}>
            <div className="form-group">
              <label>Company Name</label>
              <input placeholder="Company name" />
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select><option>Technology</option><option>Finance</option><option>Healthcare</option><option>Consulting</option></select>
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input type="email" placeholder="hr@company.com" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Partner →</button>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Recent Placements</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Student</th><th>Company</th><th>Role</th><th>Package</th><th>Batch</th><th>Status</th></tr>
              </thead>
              <tbody>
                {placements.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td>{p.company}</td><td>{p.role}</td>
                    <td style={{ fontWeight: 700, color: 'var(--success)' }}>{p.package}</td>
                    <td>{p.batch}</td>
                    <td><span className="badge badge-success">{p.status}</span></td>
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
