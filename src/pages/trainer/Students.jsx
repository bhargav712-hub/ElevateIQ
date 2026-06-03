export default function TrainerStudents() {
  const students = [
    { name: 'Rahul Verma', email: 'rahul@test.com', course: 'Full Stack Web Dev', progress: 72, attendance: 89, status: 'active' },
    { name: 'Priya Sharma', email: 'priya@test.com', course: 'Full Stack Web Dev', progress: 85, attendance: 95, status: 'active' },
    { name: 'Amit Singh', email: 'amit@test.com', course: 'Data Science', progress: 45, attendance: 78, status: 'active' },
    { name: 'Neha Gupta', email: 'neha@test.com', course: 'Data Science', progress: 60, attendance: 82, status: 'active' },
    { name: 'Vikram Patel', email: 'vikram@test.com', course: 'Cloud Architecture', progress: 30, attendance: 70, status: 'at-risk' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>👥 Enrolled Students</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>View and manage students in your courses</p>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>Progress</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td style={{ fontSize: 14 }}>{s.email}</td>
                  <td style={{ fontSize: 14 }}>{s.course}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span style={{ fontSize: 12 }}>{s.progress}%</span>
                    </div>
                  </td>
                  <td>{s.attendance}%</td>
                  <td>
                    <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-danger'}`}>{s.status}</span>
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
