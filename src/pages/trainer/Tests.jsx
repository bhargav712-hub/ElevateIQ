import { useState } from 'react';
import { FiCalendar, FiClock, FiEdit3, FiHelpCircle } from 'react-icons/fi';
import Toast from '../../components/common/Toast';

export default function TrainerTests() {
  const [toast, setToast] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ title: '', course: '', questions: 10, duration: '60', date: '' });

  const tests = [
    { title: 'React Fundamentals Quiz', course: 'Full Stack Web Dev', questions: 50, duration: '60 min', date: '2026-06-05', status: 'scheduled' },
    { title: 'JavaScript Mid-Term', course: 'Full Stack Web Dev', questions: 75, duration: '90 min', date: '2026-06-08', status: 'draft' },
  ];

  const resetForm = () => {
    setForm({ title: '', course: '', questions: 10, duration: '60', date: '' });
    setEditingIndex(null);
  };

  const handleEdit = (test, index) => {
    setEditingIndex(index);
    setForm({
      title: test.title,
      course: test.course,
      questions: test.questions,
      duration: test.duration.replace(' min', ''),
      date: test.date,
    });
    setToast({ message: `Editing test "${test.title}"`, type: 'info' });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    const action = editingIndex === null ? 'created and scheduled' : 'updated';
    setToast({ message: `Test "${form.title}" ${action}!`, type: 'success' });
    resetForm();
  };

  return (
    <div className="animate-fade-in trainer-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Create Tests</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Design, edit, and schedule module tests & exams</p>

      <div className="grid-2" style={{ marginBottom: 30 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>{editingIndex === null ? 'New Test / Exam' : 'Edit Scheduled Test'}</h3>
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
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-primary btn-block">{editingIndex === null ? 'Create Test' : 'Update Test'}</button>
              {editingIndex !== null && <button type="button" className="btn btn-outline btn-block" onClick={resetForm}>Cancel Edit</button>}
            </div>
          </form>
        </div>

        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Scheduled Tests</h3>
          {tests.map((test, i) => (
            <div key={test.title} className="card" style={{ marginBottom: 12 }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{test.title}</h4>
                    <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{test.course}</p>
                  </div>
                  <span className={`badge ${test.status === 'scheduled' ? 'badge-success' : 'badge-warning'}`}>{test.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                  <span><FiHelpCircle /> {test.questions} Qs</span>
                  <span><FiClock /> {test.duration}</span>
                  <span><FiCalendar /> {test.date}</span>
                </div>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 12 }} onClick={() => handleEdit(test, i)}><FiEdit3 /> Edit Test</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
