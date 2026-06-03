import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function TrainerCourses() {
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', duration: '', category: '', topics: '' });

  const courses = [
    { id: 1, title: 'Full Stack Web Development', students: 45, topics: 24, status: 'active', category: 'Development' },
    { id: 2, title: 'Data Science & ML', students: 38, topics: 20, status: 'active', category: 'Data Science' },
    { id: 3, title: 'Cloud Architecture', students: 25, topics: 16, status: 'active', category: 'Cloud' },
  ];

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!form.title || !form.duration || !form.category) {
      setToast({ message: 'Please fill all required fields', type: 'error' });
      return;
    }
    setToast({ message: `Course "${form.title}" created successfully!`, type: 'success' });
    setForm({ title: '', duration: '', category: '', topics: '' });
    setShowForm(false);
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📚 My Courses</h1>
          <p style={{ color: 'var(--gray-500)' }}>Manage your courses and topics</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Course</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24, padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Create New Course</h3>
          <form onSubmit={handleAddCourse}>
            <div className="grid-2" style={{ gap: 16 }}>
              <div className="form-group">
                <label>Course Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g., Advanced React" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 3 Months" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select...</option>
                  <option value="Development">Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud">Cloud</option>
                  <option value="Security">Security</option>
                  <option value="Design">Design</option>
                </select>
              </div>
              <div className="form-group">
                <label>Topics (comma separated)</label>
                <input value={form.topics} onChange={e => setForm({ ...form, topics: e.target.value })} placeholder="HTML, CSS, JS, React..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button type="submit" className="btn btn-primary">Create Course</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid-2">
        {courses.map(course => (
          <div key={course.id} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700 }}>{course.title}</h3>
                <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{course.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, margin: '12px 0', fontSize: 13, color: 'var(--gray-500)' }}>
                <span>👥 {course.students} students</span>
                <span>📚 {course.topics} topics</span>
                <span>📁 {course.category}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm">Manage Topics</button>
                <button className="btn btn-outline btn-sm">View Students</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
