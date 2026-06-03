import { useState } from 'react';

export default function StudentRecordings() {
  const recordings = [
    { id: 1, title: 'React Hooks - useState & useEffect', course: 'Full Stack Web Dev', date: '2026-05-28', duration: '1:45:00', instructor: 'Anita Sharma', watched: true },
    { id: 2, title: 'Node.js Express Routing', course: 'Full Stack Web Dev', date: '2026-05-26', duration: '1:30:00', instructor: 'Anita Sharma', watched: false },
    { id: 3, title: 'MongoDB Schema Design', course: 'Full Stack Web Dev', date: '2026-05-24', duration: '1:50:00', instructor: 'Rajesh Kumar', watched: false },
    { id: 4, title: 'Python Data Structures', course: 'Data Science', date: '2026-05-25', duration: '1:20:00', instructor: 'Rajesh Kumar', watched: true },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎥 Class Recordings</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Access recordings of your live classes</p>

      <div className="grid-2">
        {recordings.map(rec => (
          <div key={rec.id} className="card" style={{ cursor: 'pointer' }}>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '1.5rem' }}>{rec.watched ? '✅' : '🆕'}</span>
                    <h3 style={{ fontWeight: 700, fontSize: 15 }}>{rec.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                    <span>📚 {rec.course}</span>
                    <span>📅 {rec.date}</span>
                    <span>⏱ {rec.duration}</span>
                    <span>👩‍🏫 {rec.instructor}</span>
                  </div>
                </div>
                <button className={`btn btn-sm ${rec.watched ? 'btn-outline' : 'btn-primary'}`} style={{ minWidth: 80 }}>
                  {rec.watched ? 'Replay' : 'Watch'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
