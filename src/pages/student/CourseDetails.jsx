import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/student/courses/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
        // Set first uncompleted module video as active, or first module
        const syllabus = json.course?.syllabus || [];
        const completed = json.progress?.completedModules || [];
        const firstUncompleted = syllabus.find(m => !completed.includes(m.title));
        if (firstUncompleted && firstUncompleted.videoUrl) {
           setActiveVideoUrl(firstUncompleted.videoUrl);
        } else if (syllabus.length > 0 && syllabus[0].videoUrl) {
           setActiveVideoUrl(syllabus[0].videoUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const handleMarkComplete = async (moduleTitle) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/student/courses/${id}/modules/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ moduleTitle })
      });
      if (res.ok) {
        // Refresh data
        fetchCourseData();
      }
    } catch (error) {
      console.error('Error marking module complete:', error);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading course details...</div>;
  }

  if (!data || !data.course) {
    return (
      <div className="card">
        <div className="card-body">
          <h2>Course Not Found</h2>
          <button className="btn" onClick={() => navigate('/student-courses')} style={{ marginTop: '20px' }}>Go Back</button>
        </div>
      </div>
    );
  }

  const { course, progress } = data;
  const completedModules = progress.completedModules || [];

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button
        className="btn"
        onClick={() => navigate('/student-courses')}
        style={{
          marginBottom: '20px',
          background: '#f3f4f6',
        }}
      >
        ← Back to My Courses
      </button>

      {/* Video Player Section */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-body" style={{ padding: 0, overflow: 'hidden' }}>
          {activeVideoUrl ? (
            <iframe 
              width="100%" 
              height="500" 
              src={activeVideoUrl} 
              title="Course Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <div style={{ width: '100%', height: '500px', background: '#1f2937', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>▶️</div>
              <h2>Select a module to play video</h2>
              <p style={{ color: '#9ca3af' }}>No video URL available for this module.</p>
            </div>
          )}
        </div>
      </div>

      {/* Single Course Details Card */}
      <div className="card">
        <div className="card-body">
          <h1 style={{ marginBottom: '15px' }}>
            📚 {course.title}
          </h1>

          <p>
            ⏳ <strong>Duration:</strong> {course.duration || 'Self-paced'}
          </p>

          <p>
            🎓 <strong>Category:</strong> {course.category || 'General'}
          </p>

          {/* Progress */}
          <div
            style={{
              marginTop: '20px',
              marginBottom: '25px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>📈 Progress</h3>
                <span>{progress.attended || 0} / {progress.total || 0} Modules Completed</span>
            </div>

            <div
              style={{
                background: '#e5e7eb',
                height: '10px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginTop: '10px'
              }}
            >
              <div
                style={{
                  width: `${progress.progress || 0}%`,
                  height: '100%',
                  background: '#22c55e',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>

            <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#16a34a' }}>
              {progress.progress || 0}% Completed
            </p>
          </div>

          <hr />

          {/* Modules */}
          <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>
            📚 Course Modules
          </h3>

          {(course.syllabus || []).map((module, index) => {
            const isCompleted = completedModules.includes(module.title);
            return (
              <div
                key={index}
                style={{
                  padding: '15px',
                  margin: '10px 0',
                  background: isCompleted ? '#f0fdf4' : '#eff6ff',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: isCompleted ? '1px solid #bbf7d0' : '1px solid #bfdbfe'
                }}
              >
                <div>
                  <h4 style={{ margin: 0, color: isCompleted ? '#16a34a' : '#1e3a8a' }}>
                    {module.module}. {module.title}
                  </h4>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#6b7280' }}>
                    Duration: {module.duration || 'N/A'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    className="btn" 
                    style={{ background: '#3b82f6', color: 'white' }}
                    onClick={() => setActiveVideoUrl(module.videoUrl || '')}
                  >
                    ▶️ Play
                  </button>
                  {isCompleted ? (
                    <button className="btn" style={{ background: '#22c55e', color: 'white', cursor: 'default' }} disabled>
                      ✅ Completed
                    </button>
                  ) : (
                    <button className="btn" style={{ background: '#e5e7eb', color: '#374151' }} onClick={() => handleMarkComplete(module.title)}>
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}