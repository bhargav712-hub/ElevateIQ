import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function StudentCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8080/api/student/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setEnrolledCourses(data);
        }
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/student-courseDetails/${courseId}`);
  };

  if (loading) {
    return (
      <div className="animate-fade-in" style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading your courses...</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1
        style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          marginBottom: 8,
        }}
      >
        📚 My Courses
      </h1>

      <p
        style={{
          color: 'var(--gray-500)',
          marginBottom: 24,
        }}
      >
        Track your enrolled courses and progress
      </p>

      {enrolledCourses.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
            <h3>No Enrolled Courses</h3>
            <p style={{ color: 'var(--gray-500)', marginBottom: '24px' }}>
              You haven't enrolled in any courses yet. Check out the catalog to get started!
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/courses')}>
              Browse Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="grid-2">
          {enrolledCourses.map((item, i) => {
            const course = item.course;
            const progress = item.progress;
            
            if (!course) return null;

            return (
              <motion.div
                key={course.id}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="card-body">
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: 12,
                    }}
                  >
                    {course.imagePath || '🚀'}
                  </div>

                  <h3
                    style={{
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {course.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--gray-500)',
                      marginBottom: 16,
                    }}
                  >
                    👩‍🏫 Instructor {course.rating ? `| ⭐ ${course.rating}` : ''}
                  </p>

                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 13,
                        marginBottom: 6,
                      }}
                    >
                      <span>Course Progress</span>

                      <span
                        style={{
                          fontWeight: 700,
                          color: 'var(--primary)',
                        }}
                      >
                        {progress.progress || 0}%
                      </span>
                    </div>

                    <div className="progress-bar" style={{ background: '#e5e7eb', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${progress.progress || 0}%`,
                          background: 'var(--primary)',
                          height: '100%'
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 13,
                      color: 'var(--gray-500)',
                      marginBottom: 16,
                    }}
                  >
                    <span>
                      📚 {progress.attended || 0}/{progress.total || 0} Modules Completed
                    </span>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    Continue Learning →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}