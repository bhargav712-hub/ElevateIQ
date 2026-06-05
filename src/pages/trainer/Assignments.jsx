import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function TrainerAssignments() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', dueDate: '', points: 100 });

  const assignments = [
    { title: 'React Todo App', course: 'Full Stack Web Dev', due: '2026-06-07', submissions: 33, total: 45, points: 100 },
    { title: 'REST API Project', course: 'Full Stack Web Dev', due: '2026-06-10', submissions: 28, total: 45, points: 100 },
    { title: 'Data Cleaning', course: 'Data Science', due: '2026-06-12', submissions: 20, total: 38, points: 100 },
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    setToast({ message: `Assignment "${form.title}" created!`, type: 'success' });
    setForm({ title: '', course: '', dueDate: '', points: 100 });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📄 Assignments</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Create and manage student assignments</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>New Assignment</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Assignment Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Build a Calculator" />
            </div>
            <div className="form-group">
              <label>Course</label>
              <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                <option value="">Select course...</option>
                <option value="Full Stack Web Dev">Full Stack Web Development</option>
                <option value="Data Science">Data Science & ML</option>
              </select>
            </div>
            <div className="grid-2" style={{ gap: 12 }}>
              <div className="form-group">
                <label>Due Date</label>
                <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Points</label>
                <input type="number" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Assignment →</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Active Assignments</h3>
          {assignments.map((a, i) => (
            <div key={i} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <h4 style={{ fontWeight: 600 }}>{a.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{a.course}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 12, fontSize: 13 }}>
                    <span>📅 Due: {a.due}</span>
                    <span>📤 {a.submissions}/{a.total}</span>
                  </div>
                  <div className="progress-bar" style={{ width: 80 }}>
                    <div className="progress-fill" style={{ width: `${a.submissions / a.total * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
