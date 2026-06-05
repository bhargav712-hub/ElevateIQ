import { useState } from 'react';

export default function StudentRecordings() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const recordings = [
  {
  id: 1,
  title: 'SQL Fundamentals',
  course: 'Database Management',
  date: '2026-05-28',
  duration: '1:20:00',
  instructor: 'Kudvenkat',
  watched: false,
  videoUrl: 'public/videos/sql-demo.mp4'
},
    {
  id: 2,
  title: 'MERN Stack Architecture',
  course: 'Full Stack Web Development',
  date: '2026-05-26',
  duration: '1:45:00',
  instructor: 'Piyush Garg',
  watched: false,
  videoUrl: 'public/videos/sql-demo.mp4'
},
    {
  id: 3,
  title: 'Python Full Stack Development',
  course: 'Python Full Stack',
  date: '2026-05-24',
  duration: '1:50:00',
  instructor: 'Adhi naryan',
  watched: false,
  videoUrl: 'public/videos/sql-demo.mp4'
},
   {
  id: 4,
  title: 'Data Science Fundamentals',
  course: 'Data Science',
  date: '2026-05-22',
  duration: '2:00:00',
  instructor: 'Krish Naik',
  watched: false,
  videoUrl: 'public/videos/sql-demo.mp4'
}
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🎥 Class Recordings</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Access recordings of your live classes</p>

      {selectedVideo && (
  <div
    className="card"
    style={{
      marginBottom: 24,
      padding: 20
    }}
  >
    <button
  className="btn btn-outline"
  onClick={() => setSelectedVideo(null)}
  style={{
    marginBottom: '16px'
  }}
>
  ← Back to Recordings
</button>
    <h2 style={{ marginBottom: 16 }}>
      {selectedVideo.title}
    </h2>
    <div
  style={{
    marginBottom: 20,
    color: '#666',
    lineHeight: '1.8'
  }}
>
  <div>
    <strong>Course:</strong> {selectedVideo.course}
  </div>

  <div>
    <strong>Trainer:</strong> {selectedVideo.instructor}
  </div>

  <div>
    <strong>Duration:</strong> {selectedVideo.duration}
  </div>
</div>

<>
  <p>Video Path: {selectedVideo.videoUrl}</p>

  <video
  src={selectedVideo.videoUrl}
  width="100%"
  controls
  autoPlay
  style={{
    borderRadius: '10px'
  }}
/>
</>
      <div

>
  <h3>Notes</h3>

  <textarea
    rows="8"
    placeholder="Write your notes here..."
    style={{
      width: '100%',
      padding: '10px',
      borderRadius: '8px'
    }}
  />
</div>
      <h3>Key Points</h3>

      <ul>
        <li>Course Introduction</li>
        <li>Core Concepts Explained</li>
        <li>Hands-on Examples</li>
        <li>Best Practices</li>
      </ul>
      <div
  style={{
    marginTop: 20,
    padding: 16,
    background: '#f8f9fa',
    borderRadius: 10
  }}
>
</div>
    </div>
)}

      {!selectedVideo && (
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
                <button
  className={`btn btn-sm ${rec.watched ? 'btn-outline' : 'btn-primary'}`}
  style={{ minWidth: 80 }}
  onClick={() => setSelectedVideo(rec)}
>
                  {rec.watched ? 'Replay' : 'Watch'}
                </button>
              </div>
            </div>
          </div>
        ))}
              </div>
)}
    </div>
  );
}
