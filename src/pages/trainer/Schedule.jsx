import { useState } from 'react';
import { FiCalendar, FiClock, FiEdit3, FiMapPin, FiUsers } from 'react-icons/fi';
import Toast from '../../components/common/Toast';

export default function TrainerSchedule() {
  const [toast, setToast] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', date: '', time: '', duration: '60', room: '' });

  const classes = [
    { title: 'React Hooks Deep Dive', course: 'Full Stack Web Dev', date: '2026-06-05', time: '10:00 AM', duration: '90 min', room: 'Zoom A', students: 45 },
    { title: 'Node.js REST APIs', course: 'Full Stack Web Dev', date: '2026-06-05', time: '2:00 PM', duration: '90 min', room: 'Zoom A', students: 42 },
  ];

  const resetForm = () => {
    setForm({ title: '', course: '', date: '', time: '', duration: '60', room: '' });
    setEditingIndex(null);
  };

  const handleEdit = (cls, index) => {
    setEditingIndex(index);
    setForm({
      title: cls.title,
      course: cls.course,
      date: cls.date,
      time: '',
      duration: cls.duration.replace(' min', ''),
      room: cls.room,
    });
    setToast({ message: `Editing class "${cls.title}"`, type: 'info' });
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    const action = editingIndex === null ? 'scheduled' : 'updated';
    setToast({ message: `Class "${form.title}" ${action} for ${form.date}!`, type: 'success' });
    resetForm();
  };

  return (
    <div className="animate-fade-in trainer-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Schedule Classes</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Create, edit, and manage live class schedules</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>{editingIndex === null ? 'Schedule New Class' : 'Edit Scheduled Class'}</h3>
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
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-primary btn-block">{editingIndex === null ? 'Schedule Class' : 'Update Class'}</button>
              {editingIndex !== null && <button type="button" className="btn btn-outline btn-block" onClick={resetForm}>Cancel Edit</button>}
            </div>
          </form>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Scheduled Classes</h3>
          {classes.map((cls, i) => (
            <div key={cls.title} style={{ padding: '12px 0', borderBottom: i < classes.length - 1 ? '1px solid var(--gray-200)' : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 14 }}>{cls.title}</h4>
                  <p style={{ fontSize: 12, color: 'var(--gray-500)' }}>{cls.course}</p>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => handleEdit(cls, i)}><FiEdit3 /> Edit</button>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap', fontSize: 12 }}>
                <span className="badge badge-primary"><FiCalendar /> {cls.date}</span>
                <span className="badge badge-success"><FiClock /> {cls.time}</span>
                <span className="badge badge-warning"><FiMapPin /> {cls.room}</span>
                <span className="badge badge-info"><FiUsers /> {cls.students}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
