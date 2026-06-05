import { useState } from 'react';
import { FiCalendar, FiClock, FiEye, FiFilm, FiFolder, FiHardDrive, FiUploadCloud } from 'react-icons/fi';
import Toast from '../../components/common/Toast';

export default function TrainerRecordings() {
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', date: '', source: 'local', file: null, driveLink: '' });

  const recordings = [
    { title: 'React Hooks - useState & useEffect', course: 'Full Stack Web Dev', date: '2026-05-28', duration: '1:45:00', views: 42 },
    { title: 'Node.js Express Routing', course: 'Full Stack Web Dev', date: '2026-05-26', duration: '1:30:00', views: 38 },
  ];

  const handleUpload = (e) => {
    e.preventDefault();
    const hasLocalFile = form.source === 'local' && form.file;
    const hasDriveFile = form.source === 'drive' && form.driveLink;

    if (!form.title || (!hasLocalFile && !hasDriveFile)) {
      setToast({ message: 'Please add a title and choose a recording file/source', type: 'error' });
      return;
    }

    setToast({ message: `Recording "${form.title}" uploaded successfully!`, type: 'success' });
    setForm({ title: '', course: '', date: '', source: 'local', file: null, driveLink: '' });
  };

  return (
    <div className="animate-fade-in trainer-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Upload Recordings</h1>
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
              <label>Recording Source</label>
              <div className="segmented-control">
                <button type="button" className={form.source === 'local' ? 'active' : ''} onClick={() => setForm({ ...form, source: 'local', driveLink: '' })}>
                  <FiHardDrive /> Local File
                </button>
                <button type="button" className={form.source === 'drive' ? 'active' : ''} onClick={() => setForm({ ...form, source: 'drive', file: null })}>
                  <FiUploadCloud /> Google Drive
                </button>
              </div>
            </div>

            {form.source === 'local' ? (
              <div className="form-group">
                <label>Choose Recording File</label>
                <input type="file" accept="video/*" onChange={e => setForm({ ...form, file: e.target.files?.[0] || null })} />
                {form.file && <p style={{ color: 'var(--gray-500)', fontSize: 12, marginTop: 6 }}><FiFolder /> {form.file.name}</p>}
              </div>
            ) : (
              <div className="form-group">
                <label>Google Drive File Link</label>
                <input value={form.driveLink} onChange={e => setForm({ ...form, driveLink: e.target.value })} placeholder="Paste Google Drive share link" />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block"><FiUploadCloud /> Upload Recording</button>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Uploaded Recordings</h3>
          {recordings.map(rec => (
            <div key={rec.title} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <h4 style={{ fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><FiFilm /> {rec.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{rec.course}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                  <span><FiCalendar /> {rec.date}</span>
                  <span><FiClock /> {rec.duration}</span>
                  <span><FiEye /> {rec.views} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
