import { useState } from 'react';
import Toast from '../../components/common/Toast';

const userData = {
  students: [
    { id: 1, name: 'Rahul Verma', email: 'rahul@test.com', courses: 2, joined: '2026-01-15', status: 'active' },
    { id: 2, name: 'Priya Sharma', email: 'priya@test.com', courses: 1, joined: '2026-02-20', status: 'active' },
    { id: 3, name: 'Amit Singh', email: 'amit@test.com', courses: 1, joined: '2026-03-10', status: 'active' },
    { id: 4, name: 'Neha Gupta', email: 'neha@test.com', courses: 2, joined: '2026-01-05', status: 'inactive' },
  ],
  trainers: [
    { id: 1, name: 'Anita Sharma', email: 'anita@test.com', courses: 3, students: 128, joined: '2025-06-01', status: 'active' },
    { id: 2, name: 'Rajesh Kumar', email: 'rajesh@test.com', courses: 2, students: 89, joined: '2025-08-15', status: 'active' },
  ],
  employees: [
    { id: 1, name: 'Vikram Singh', email: 'vikram@test.com', dept: 'Placement', role: 'Executive', joined: '2025-09-01' },
    { id: 2, name: 'Kavita Reddy', email: 'kavita@test.com', dept: 'HR', role: 'Manager', joined: '2025-04-01' },
  ],
};

export default function AdminStudents() {
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = userData.students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👨‍🎓 Manage Students</h1>
          <p style={{ color: 'var(--gray-500)' }}>View and manage all registered students</p>
        </div>
        <button className="btn btn-primary" onClick={() => setToast({ message: 'Add student feature opened', type: 'info' })}>+ Add Student</button>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ padding: 16 }}>
          <input
            placeholder="🔍 Search students..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--gray-300)', borderRadius: 10, fontSize: 15 }}
          />
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Email</th><th>Courses</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>#{s.id}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.courses}</td>
                  <td>{s.joined}</td>
                  <td><span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{s.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-sm btn-outline">Edit</button>
                      <button className="btn btn-sm btn-accent" onClick={() => setToast({ message: `Email sent to ${s.name}`, type: 'success' })}>Email</button>
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

export function AdminTrainers() {
  const [toast, setToast] = useState(null);
  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👩‍🏫 Manage Trainers</h1>
          <p style={{ color: 'var(--gray-500)' }}>View and manage trainers</p>
        </div>
        <button className="btn btn-primary">+ Add Trainer</button>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Courses</th><th>Students</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {userData.trainers.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600 }}>{t.name}</td><td>{t.email}</td><td>{t.courses}</td>
                  <td>{t.students}</td><td>{t.joined}</td>
                  <td><span className="badge badge-success">{t.status}</span></td>
                  <td><button className="btn btn-sm btn-outline">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminEmployees() {
  const [toast, setToast] = useState(null);
  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👥 Manage Employees</h1>
          <p style={{ color: 'var(--gray-500)' }}>View and manage employees</p>
        </div>
        <button className="btn btn-primary">+ Add Employee</button>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {userData.employees.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: 600 }}>{e.name}</td><td>{e.email}</td>
                  <td>{e.dept}</td><td>{e.role}</td><td>{e.joined}</td>
                  <td><button className="btn btn-sm btn-outline">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
