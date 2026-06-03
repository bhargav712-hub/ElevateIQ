import { useState } from 'react';
import Toast from '../../components/common/Toast';

const leaveTypes = ['Sick Leave', 'Casual Leave', 'Annual Leave', 'Personal Leave'];

export default function EmployeeLeave() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ type: 'Sick Leave', from: '', to: '', reason: '' });
  const [errors, setErrors] = useState({});

  const leaveHistory = [
    { type: 'Sick Leave', from: '2026-05-20', to: '2026-05-21', days: 2, status: 'approved', reason: 'Flu' },
    { type: 'Casual Leave', from: '2026-05-10', to: '2026-05-10', days: 1, status: 'approved', reason: 'Personal' },
    { type: 'Annual Leave', from: '2026-06-10', to: '2026-06-12', days: 3, status: 'pending', reason: 'Vacation' },
  ];

  const validate = () => {
    const errs = {};
    if (!form.from) errs.from = 'Start date required';
    if (!form.to) errs.to = 'End date required';
    if (!form.reason.trim()) errs.reason = 'Reason required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: `Leave request submitted! (${form.type})`, type: 'success' });
      setForm({ type: 'Sick Leave', from: '', to: '', reason: '' });
    }
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📋 Leave Requests</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Apply for leave and track your requests</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Apply for Leave</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Leave Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>From Date</label>
                <input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className={errors.from ? 'error' : ''} />
                {errors.from && <div className="form-error">{errors.from}</div>}
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className={errors.to ? 'error' : ''} />
                {errors.to && <div className="form-error">{errors.to}</div>}
              </div>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} className={errors.reason ? 'error' : ''} placeholder="Explain your reason..." />
              {errors.reason && <div className="form-error">{errors.reason}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit Request →</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Leave Balance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Sick Leave', total: 12, used: 4 },
              { label: 'Casual Leave', total: 10, used: 3 },
              { label: 'Annual Leave', total: 15, used: 5 },
              { label: 'Personal Leave', total: 5, used: 1 },
            ].map((item, i) => (
              <div key={i} className="card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{item.total - item.used}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>left of {item.total}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Recent Requests</h3>
          {leaveHistory.map((l, i) => (
            <div key={i} className="card" style={{ marginBottom: 8, padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{l.type}</span>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{l.from} → {l.to} ({l.days} days)</p>
                </div>
                <span className={`badge ${l.status === 'approved' ? 'badge-success' : l.status === 'rejected' ? 'badge-danger' : 'badge-warning'}`}>
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
