export default function AdminEmails() {
  const emailLogs = [
    { to: 'rahul@test.com', subject: 'Exam Booking Confirmation - React Quiz', sent: '2026-06-02 10:30 AM', status: 'delivered' },
    { to: 'priya@test.com', subject: 'Payment Receipt - Course Enrollment', sent: '2026-06-01 2:15 PM', status: 'delivered' },
    { to: 'amit@test.com', subject: 'Login Credentials - New Account', sent: '2026-05-30 9:00 AM', status: 'delivered' },
    { to: 'neha@test.com', subject: 'Assignment Submission Confirmation', sent: '2026-05-29 4:45 PM', status: 'delivered' },
    { to: 'vikram@test.com', subject: 'Leave Request Approved', sent: '2026-05-28 11:20 AM', status: 'delivered' },
    { to: 'test@example.com', subject: 'Password Reset Request', sent: '2026-05-27 6:00 PM', status: 'failed' },
  ];

  const emailTemplates = [
    { name: 'Exam Booking Confirmation', trigger: 'When student books an exam slot', variables: '{student_name}, {exam_title}, {date}, {time}' },
    { name: 'Payment Receipt', trigger: 'When payment is successfully processed', variables: '{student_name}, {amount}, {course}, {invoice_id}' },
    { name: 'Login Credentials', trigger: 'When new account is created', variables: '{name}, {email}, {password}, {portal_link}' },
    { name: 'Assignment Submitted', trigger: 'When student submits assignment', variables: '{student_name}, {assignment_title}, {course}' },
    { name: 'Leave Request Status', trigger: 'When leave is approved/rejected', variables: '{employee_name}, {leave_type}, {status}, {dates}' },
    { name: 'Certificate Issued', trigger: 'When course is completed', variables: '{student_name}, {course_name}, {certificate_id}' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📧 Email Logs & Templates</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Monitor email deliveries and manage templates</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📋 Email Templates</h3>
            {emailTemplates.map((t, i) => (
              <details key={i} style={{ marginBottom: 8, padding: 12, border: '1px solid var(--gray-200)', borderRadius: 8, cursor: 'pointer' }}>
                <summary style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</summary>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 8 }}>🔹 Trigger: {t.trigger}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 4 }}>📝 Variables: {t.variables}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📤 Recent Email Logs</h3>
            <div className="table-responsive">
              <table>
                <thead><tr><th>To</th><th>Subject</th><th>Sent</th><th>Status</th></tr></thead>
                <tbody>
                  {emailLogs.map((log, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: 13 }}>{log.to}</td>
                      <td style={{ fontSize: 13 }}>{log.subject}</td>
                      <td style={{ fontSize: 12 }}>{log.sent}</td>
                      <td><span className={`badge ${log.status === 'delivered' ? 'badge-success' : 'badge-danger'}`}>{log.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 16 }}>✉️ Send Test Email</h3>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Recipient Email</label>
            <input placeholder="email@example.com" />
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Template</label>
            <select>
              {emailTemplates.map((t, i) => <option key={i}>{t.name}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" style={{ marginBottom: 2 }}>Send Test</button>
        </div>
      </div>
    </div>
  );
}
