import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function EmployeeTickets() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ subject: '', category: 'Technical', priority: 'Medium', description: '' });
  const [errors, setErrors] = useState({});

  const tickets = [
    { id: 'TK-1024', subject: 'System Access Issue', category: 'Technical', priority: 'High', status: 'open', date: '2026-06-01' },
    { id: 'TK-1023', subject: 'HR Portal Not Loading', category: 'Technical', priority: 'Medium', status: 'in-progress', date: '2026-05-30' },
    { id: 'TK-1022', subject: 'New Software Request', category: 'Admin', priority: 'Low', status: 'resolved', date: '2026-05-28' },
  ];

  const validate = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: `Ticket raised: ${form.subject}`, type: 'success' });
      setForm({ subject: '', category: 'Technical', priority: 'Medium', description: '' });
    }
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎫 Raise a Ticket</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Report issues and track support tickets</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>New Ticket</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={errors.subject ? 'error' : ''} placeholder="Brief title of your issue" />
              {errors.subject && <div className="form-error">{errors.subject}</div>}
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option>Technical</option>
                  <option>Admin</option>
                  <option>HR</option>
                  <option>Facilities</option>
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={errors.description ? 'error' : ''} placeholder="Describe the issue in detail..." />
              {errors.description && <div className="form-error">{errors.description}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit Ticket →</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>My Tickets</h3>
          {tickets.map((t, i) => (
            <div key={i} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontWeight: 600, fontSize: 14 }}>{t.subject}</h4>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{t.id} • {t.category}</p>
                  </div>
                  <span className={`badge ${t.status === 'open' ? 'badge-danger' : t.status === 'in-progress' ? 'badge-warning' : 'badge-success'}`}>
                    {t.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <span className={`badge ${t.priority === 'High' ? 'badge-danger' : t.priority === 'Medium' ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: 11 }}>{t.priority}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-500)' }}>📅 {t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
