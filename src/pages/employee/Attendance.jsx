import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function EmployeeAttendance() {
  const [toast, setToast] = useState(null);
  const [clockedIn, setClockedIn] = useState(false);

  const attendanceLog = [
    { date: '2026-06-02', clockIn: '9:15 AM', clockOut: '6:00 PM', hours: '8h 45m', status: 'present' },
    { date: '2026-06-01', clockIn: '8:55 AM', clockOut: '5:30 PM', hours: '8h 35m', status: 'present' },
    { date: '2026-05-31', clockIn: '-', clockOut: '-', hours: '-', status: 'weekend' },
    { date: '2026-05-30', clockIn: '9:30 AM', clockOut: '6:15 PM', hours: '8h 45m', status: 'present' },
    { date: '2026-05-29', clockIn: '10:00 AM', clockOut: '7:00 PM', hours: '9h 00m', status: 'present' },
    { date: '2026-05-28', clockIn: '-', clockOut: '-', hours: '-', status: 'leave' },
  ];

  const handleClock = (type) => {
    const time = new Date().toLocaleTimeString();
    if (type === 'in') {
      setClockedIn(true);
      setToast({ message: `Clocked in at ${time}`, type: 'success' });
    } else {
      setClockedIn(false);
      setToast({ message: `Clocked out at ${time}`, type: 'info' });
    }
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>⏰ Clock In / Out</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Track your daily attendance</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>{clockedIn ? '🟢' : '🔴'}</div>
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>{clockedIn ? 'Clocked In' : 'Clocked Out'}</h2>
          <p style={{ color: 'var(--gray-500)', marginBottom: 20, fontSize: 14 }}>
            {clockedIn ? 'You are currently on duty' : 'You are currently off duty'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-success btn-lg" disabled={clockedIn} onClick={() => handleClock('in')}>🟢 Clock In</button>
            <button className="btn btn-accent btn-lg" disabled={!clockedIn} onClick={() => handleClock('out')}>🔴 Clock Out</button>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>This Week Summary</h3>
          {[
            { label: 'Total Hours', value: '42h 30m' },
            { label: 'Days Present', value: '5' },
            { label: 'Days Absent', value: '0' },
            { label: 'Late Arrivals', value: '1' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--gray-200)' : 'none' }}>
              <span style={{ color: 'var(--gray-500)' }}>{s.label}</span>
              <span style={{ fontWeight: 700 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Attendance Log</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Date</th><th>Clock In</th><th>Clock Out</th><th>Hours</th><th>Status</th></tr>
              </thead>
              <tbody>
                {attendanceLog.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td><td>{row.clockIn}</td><td>{row.clockOut}</td><td>{row.hours}</td>
                    <td>
                      <span className={`badge ${row.status === 'present' ? 'badge-success' : row.status === 'leave' ? 'badge-warning' : 'badge-primary'}`}>
                        {row.status}
                      </span>
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
