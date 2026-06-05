import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function StudentPayments() {
  const [toast, setToast] = useState(null);

  const payments = [
    { id: 'INV-001', course: 'Full Stack Web Development', amount: 2999, date: '2026-05-01', status: 'paid', method: 'Credit Card' },
    { id: 'INV-002', course: 'Data Science & ML', amount: 3499, date: '2026-05-15', status: 'paid', method: 'UPI' },
    { id: 'INV-003', course: 'UI/UX Design', amount: 2199, date: '2026-06-01', status: 'pending', method: 'Net Banking' },
  ];

  const makePayment = (course) => {
    setToast({ message: `Redirecting to secure payment for ${course}... (Stripe integration)`, type: 'info' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>💳 Payment History</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>View your payment history and make new payments</p>

      <div className="card" style={{ marginBottom: 30 }}>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Course</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>{p.id}</td>
                  <td style={{ fontSize: 14 }}>{p.course}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>${p.amount}</td>
                  <td style={{ fontSize: 14 }}>{p.date}</td>
                  <td style={{ fontSize: 14 }}>{p.method}</td>
                  <td>
                    <span className={`badge ${p.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Make a Payment</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Cloud Architecture - $2,499', 'Cybersecurity - $1,999'].map((item, i) => (
            <div key={i} style={{ flex: 1, minWidth: 200, padding: 16, border: '1px solid var(--gray-200)', borderRadius: 12 }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{item}</p>
              <button className="btn btn-primary btn-sm" onClick={() => makePayment(item)}>Pay Now 💳</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
