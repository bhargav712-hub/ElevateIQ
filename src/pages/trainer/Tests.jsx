import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function TrainerTests() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', questions: 10, duration: '60', date: '' });

  const tests = [
    { title: 'React Fundamentals Quiz', course: 'Full Stack Web Dev', questions: 50, duration: '60 min', date: '2026-06-05', status: 'scheduled' },
    { title: 'JavaScript Mid-Term', course: 'Full Stack Web Dev', questions: 75, duration: '90 min', date: '2026-06-08', status: 'draft' },
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    setToast({ message: `Test "${form.title}" created and scheduled!`, type: 'success' });
    setForm({ title: '', course: '', questions: 10, duration: '60', date: '' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📝 Create Tests</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Design and schedule module tests & exams</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>New Test / Exam</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Test Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., React Hooks Quiz" />
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
                <label>No. of Questions</label>
                <input type="number" value={form.questions} onChange={e => setForm({ ...form, questions: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Duration (min)</label>
                <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
                  <option value="30">30 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                  <option value="120">120 min</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Schedule Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Test →</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Scheduled Tests</h3>
          {tests.map((test, i) => (
            <div key={i} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{test.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{test.course}</p>
                  </div>
                  <span className={`badge ${test.status === 'scheduled' ? 'badge-success' : 'badge-warning'}`}>{test.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--gray-500)' }}>
                  <span>❓ {test.questions} Qs</span>
                  <span>⏱ {test.duration}</span>
                  <span>📅 {test.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
