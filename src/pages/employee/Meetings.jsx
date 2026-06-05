import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function EmployeeMeetings() {
  const [toast, setToast] = useState(null);

  const meetings = [
    { title: 'Weekly Team Standup', date: '2026-06-02', time: '9:30 AM', duration: '30 min', host: 'Sarah Williams', status: 'today', link: 'Zoom Main' },
    { title: 'Placement Strategy Meeting', date: '2026-06-02', time: '11:00 AM', duration: '1 hour', host: 'HR Team', status: 'today', link: 'Conference A' },
    { title: '1:1 with Manager', date: '2026-06-02', time: '3:00 PM', duration: '30 min', host: 'Sarah Williams', status: 'today', link: 'Manager Office' },
    { title: 'Quarterly Review', date: '2026-06-05', time: '10:00 AM', duration: '2 hours', host: 'Management', status: 'upcoming', link: 'Board Room' },
    { title: 'Training Session - React 19', date: '2026-06-08', time: '2:00 PM', duration: '1.5 hours', host: 'Dev Team', status: 'upcoming', link: 'Zoom Training' },
  ];

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎥 Meetings</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>View and join scheduled meetings</p>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📅 Today's Meetings</h3>
          {meetings.filter(m => m.status === 'today').map((m, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: i < meetings.filter(mm => mm.status === 'today').length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: 600 }}>{m.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>⏱ {m.time} • {m.duration} • 👤 {m.host} • 📍 {m.link}</p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setToast({ message: 'Joining meeting...', type: 'info' })}>Join Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>📅 Upcoming Meetings</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr><th>Title</th><th>Date</th><th>Time</th><th>Duration</th><th>Host</th><th>Location</th></tr>
              </thead>
              <tbody>
                {meetings.filter(m => m.status === 'upcoming').map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{m.title}</td>
                    <td>{m.date}</td><td>{m.time}</td><td>{m.duration}</td><td>{m.host}</td><td>{m.link}</td>
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
