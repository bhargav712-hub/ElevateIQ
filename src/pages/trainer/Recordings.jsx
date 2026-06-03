import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function TrainerRecordings() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', date: '', url: '' });

  const recordings = [
    { title: 'React Hooks - useState & useEffect', course: 'Full Stack Web Dev', date: '2026-05-28', duration: '1:45:00', views: 42 },
    { title: 'Node.js Express Routing', course: 'Full Stack Web Dev', date: '2026-05-26', duration: '1:30:00', views: 38 },
  ];

  const handleUpload = (e) => {
    e.preventDefault();
    if (!form.title || !form.url) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    setToast({ message: `Recording "${form.title}" uploaded successfully!`, type: 'success' });
    setForm({ title: '', course: '', date: '', url: '' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎥 Upload Recordings</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Upload class recordings for student access</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Upload New Recording</h3>
          <form onSubmit={handleUpload}>
            <div className="form-group">
              <label>Recording Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Session 12 - Arrays" />
            </div>
            <div className="form-group">
              <label>Course</label>
              <select value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                <option value="">Select course...</option>
                <option value="Full Stack Web Dev">Full Stack Web Development</option>
                <option value="Data Science">Data Science & ML</option>
              </select>
            </div>
            <div className="form-group">
              <label>Class Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Video URL (YouTube/Vimeo)</label>
              <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://youtube.com/..." />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Upload Recording →</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Uploaded Recordings</h3>
          {recordings.map((rec, i) => (
            <div key={i} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <h4 style={{ fontWeight: 600, fontSize: 14 }}>🎬 {rec.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{rec.course}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12, color: 'var(--gray-500)' }}>
                  <span>📅 {rec.date}</span>
                  <span>⏱ {rec.duration}</span>
                  <span>👁 {rec.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
