import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function TrainerSchedule() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', date: '', time: '', duration: '60', room: '' });

  const classes = [
    { title: 'React Hooks Deep Dive', course: 'Full Stack Web Dev', date: '2026-06-05', time: '10:00 AM', duration: '90 min', room: 'Zoom A', students: 45 },
    { title: 'Node.js REST APIs', course: 'Full Stack Web Dev', date: '2026-06-05', time: '2:00 PM', duration: '90 min', room: 'Zoom A', students: 42 },
  ];

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    setToast({ message: `Class "${form.title}" scheduled for ${form.date}!`, type: 'success' });
    setForm({ title: '', course: '', date: '', time: '', duration: '60', room: '' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📅 Schedule Classes</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Create and manage live class schedules</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Schedule New Class</h3>
          <form onSubmit={handleSchedule}>
            <div className="form-group">
              <label>Class Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., React State Management" />
            </div>
            <div className="form-group">
              <label>Course</label>
              <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                <option value="">Select course...</option>
                <option value="Full Stack Web Dev">Full Stack Web Development</option>
                <option value="Data Science">Data Science & ML</option>
                <option value="Cloud Architecture">Cloud Architecture</option>
              </select>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
              </div>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>Duration (min)</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>
              <div className="form-group">
                <label>Room/Link</label>
                <input value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} placeholder="Zoom A / Google Meet" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Schedule Class →</button>
          </form>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Scheduled Classes</h3>
          {classes.map((cls, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < classes.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <h4 style={{ fontWeight: 600, fontSize: 14 }}>{cls.title}</h4>
              <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{cls.course}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap', fontSize: 12 }}>
                <span className="badge badge-primary">📅 {cls.date}</span>
                <span className="badge badge-success">⏱ {cls.time}</span>
                <span className="badge badge-warning">📍 {cls.room}</span>
                <span className="badge badge-info">👥 {cls.students}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
