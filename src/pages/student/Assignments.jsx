import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function StudentAssignments() {
  const [toast, setToast] = useState(null);
  const [file, setFile] = useState(null);

  const assignments = [
    { id: 1, title: 'Todo App with React', course: 'Full Stack Web Dev', due: '2026-06-07', status: 'pending', points: 100 },
    { id: 2, title: 'REST API with Node.js', course: 'Full Stack Web Dev', due: '2026-06-10', status: 'submitted', points: 100, submitted: '2026-06-05' },
    { id: 3, title: 'Data Cleaning Project', course: 'Data Science', due: '2026-06-12', status: 'pending', points: 100 },
    { id: 4, title: 'UI Design System', course: 'UI/UX Design', due: '2026-06-08', status: 'graded', points: 100, score: 88, submitted: '2026-06-03' },
  ];

  const handleSubmit = (id) => {
    if (!file) {
      setToast({ message: 'Please select a file to upload', type: 'error' });
      return;
    }
    setToast({ message: `Assignment submitted! File: ${file.name}`, type: 'success' });
    setFile(null);
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📄 Assignments</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>View, submit, and track your assignments</p>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td style={{ fontSize: 14 }}>{a.course}</td>
                  <td style={{ fontSize: 14 }}>{a.due}</td>
                  <td>
                    <span className={`badge ${a.status === 'submitted' || a.status === 'graded' ? 'badge-success' : 'badge-warning'}`}>
                      {a.status === 'graded' ? '✅ Graded' : a.status === 'submitted' ? '📤 Submitted' : '⏳ Pending'}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{a.score !== undefined ? `${a.score}/100` : '-'}</td>
                  <td>
                    {a.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ fontSize: 12, maxWidth: 120 }} />
                        <button className="btn btn-primary btn-sm" onClick={() => handleSubmit(a.id)}>Submit</button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{a.submitted}</span>
                    )}
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
