import { FiBookOpen, FiFolder, FiUsers } from 'react-icons/fi';

export default function TrainerCourses() {
  const courses = [
    { id: 1, title: 'Full Stack Web Development', students: 45, topics: 24, status: 'active', category: 'Development' },
    { id: 2, title: 'Data Science & ML', students: 38, topics: 20, status: 'active', category: 'Data Science' },
    { id: 3, title: 'Cloud Architecture', students: 25, topics: 16, status: 'active', category: 'Cloud' },
  ];

  return (
    <div className="animate-fade-in trainer-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>My Courses</h1>
          <p style={{ color: 'var(--gray-500)' }}>Manage your courses and topics</p>
        </div>
      </div>

      <div className="grid-2">
        {courses.map(course => (
          <div key={course.id} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <h3 style={{ fontWeight: 700 }}>{course.title}</h3>
                <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{course.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, margin: '12px 0', fontSize: 13, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                <span><FiUsers /> {course.students} students</span>
                <span><FiBookOpen /> {course.topics} topics</span>
                <span><FiFolder /> {course.category}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
