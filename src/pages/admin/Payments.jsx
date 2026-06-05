import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function AdminPayments() {
  const [toast, setToast] = useState(null);

  const payments = [
    { id: 'INV-001', student: 'Rahul Verma', course: 'Full Stack Web Dev', amount: 2999, date: '2026-05-01', method: 'Credit Card', status: 'paid' },
    { id: 'INV-002', student: 'Priya Sharma', course: 'Data Science', amount: 3499, date: '2026-05-15', method: 'UPI', status: 'paid' },
    { id: 'INV-003', student: 'Amit Singh', course: 'Cloud Arch', amount: 2499, date: '2026-05-20', method: 'Net Banking', status: 'pending' },
    { id: 'INV-004', student: 'Neha Gupta', course: 'UI/UX Design', amount: 2199, date: '2026-06-01', method: 'Credit Card', status: 'paid' },
    { id: 'INV-005', student: 'Vikram Patel', course: 'Cybersecurity', amount: 1999, date: '2026-05-28', method: 'UPI', status: 'refunded' },
  ];

  const totalRevenue = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>💳 Manage Payments</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Track and manage all financial transactions</p>

      <div className="grid-3" style={{ marginBottom: 30 }}>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">${totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{payments.filter(p => p.status === 'paid').length}</div>
          <div className="stat-label">Completed Payments</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{payments.filter(p => p.status === 'pending').length}</div>
          <div className="stat-label">Pending Payments</div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr><th>Invoice</th><th>Student</th><th>Course</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{p.id}</td>
                  <td>{p.student}</td>
                  <td style={{ fontSize: 14 }}>{p.course}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>${p.amount}</td>
                  <td style={{ fontSize: 14 }}>{p.date}</td>
                  <td style={{ fontSize: 14 }}>{p.method}</td>
                  <td>
                    <span className={`badge ${p.status === 'paid' ? 'badge-success' : p.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{p.status}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {p.status === 'pending' && <button className="btn btn-sm btn-success" onClick={() => setToast({ message: 'Payment confirmed! Email sent.', type: 'success' })}>Approve</button>}
                      <button className="btn btn-sm btn-outline">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
