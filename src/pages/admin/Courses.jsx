import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function AdminCourses() {
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: '', duration: '', price: '', status: 'active' });

  const courses = [
    { id: 1, title: 'Full Stack Web Development', category: 'Development', duration: '6 Months', price: 2999, students: 450, status: 'active' },
    { id: 2, title: 'Data Science & ML', category: 'Data Science', duration: '5 Months', price: 3499, students: 320, status: 'active' },
    { id: 3, title: 'Cloud Architecture', category: 'Cloud', duration: '4 Months', price: 2499, students: 180, status: 'active' },
    { id: 4, title: 'Cybersecurity', category: 'Security', duration: '3 Months', price: 1999, students: 95, status: 'draft' },
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      setToast({ message: 'Please fill required fields', type: 'error' });
      return;
    }
    setToast({ message: `Course "${form.title}" added!`, type: 'success' });
    setShowForm(false);
    setForm({ title: '', category: '', duration: '', price: '', status: 'active' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📚 Manage Courses</h1>
          <p style={{ color: 'var(--gray-500)' }}>Create and manage all courses</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ New Course</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24, padding: 24 }}>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Add New Course</h3>
          <form onSubmit={handleAdd}>
            <div className="grid-2" style={{ gap: 16 }}>
              <div className="form-group">
                <label>Course Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Course title" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  <option value="">Select...</option>
                  <option>Development</option><option>Data Science</option><option>Cloud</option><option>Security</option><option>Design</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g., 4 Months" />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="2999" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button type="submit" className="btn btn-primary">Create Course</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr><th>Course</th><th>Category</th><th>Duration</th><th>Price</th><th>Students</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.title}</td>
                  <td>{c.category}</td><td>{c.duration}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>${c.price}</td>
                  <td>{c.students}</td>
                  <td><span className={`badge ${c.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{c.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-sm btn-outline">Edit</button>
                      <button className="btn btn-sm btn-accent" onClick={() => setToast({ message: `Course status toggled`, type: 'info' })}>Toggle</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
