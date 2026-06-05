import { useParams, useNavigate } from 'react-router-dom';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const courseData = {
    1: {
      title: 'Full Stack Web Development',
      instructor: 'Anita Sharma',
      duration: '6 Months',
      type: 'Certification Program',
      progress: 72,

      modules: [
        'HTML Fundamentals',
        'CSS3 & Responsive Design',
        'JavaScript ES6',
        'React Basics',
        'React Hooks',
        'Redux',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Project Deployment',
      ],

      assignments: [
        'Portfolio Website',
        'Todo Application',
        'Weather App',
        'E-Commerce Project',
      ],

      videos: [
        'Introduction to Web Development',
        'React Components',
        'State & Props',
        'React Hooks',
      ],
    },

    2: {
      title: 'Data Science & Machine Learning',
      instructor: 'Rajesh Kumar',
      duration: '8 Months',
      type: 'Advanced Professional Course',
      progress: 45,

      modules: [
        'Python Basics',
        'NumPy',
        'Pandas',
        'Data Cleaning',
        'Matplotlib',
        'Machine Learning',
        'Deep Learning',
        'Neural Networks',
      ],

      assignments: [
        'Data Analysis Project',
        'Prediction Model',
        'Stock Market Analysis',
      ],

      videos: [
        'Introduction to Data Science',
        'Working with Pandas',
        'Data Visualization',
        'Machine Learning Algorithms',
      ],
    },
  };

  const course = courseData[id];

  if (!course) {
    return (
      <div className="card">
        <div className="card-body">
          <h2>Course Not Found</h2>
        </div>
      </div>
    );
  }

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
        ← Back to Courses
      </button>

      {/* Single Course Details Card */}
      <div className="card">
        <div className="card-body">
          <h1 style={{ marginBottom: '15px' }}>
            📚 {course.title}
          </h1>

          <p>
            👩‍🏫 <strong>Instructor:</strong> {course.instructor}
          </p>

          <p>
            ⏳ <strong>Duration:</strong> {course.duration}
          </p>

          <p>
            🎓 <strong>Course Type:</strong> {course.type}
          </p>

          {/* Progress */}
          <div
            style={{
              marginTop: '20px',
              marginBottom: '25px',
            }}
          >
            <h3>📈 Progress</h3>

            <div
              style={{
                background: '#e5e7eb',
                height: '10px',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${course.progress}%`,
                  height: '100%',
                  background: '#22c55e',
                }}
              />
            </div>

            <p style={{ marginTop: '10px' }}>
              {course.progress}% Completed
            </p>
          </div>

          <hr />

          {/* Modules */}
          <h3 style={{ marginTop: '20px' }}>
            📚 Course Modules
          </h3>

          {course.modules.map((module, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '8px 0',
                background: '#eff6ff',
                borderRadius: '8px',
              }}
            >
              {index + 1}. {module}
            </div>
          ))}

          <hr />

          {/* Videos */}
          <h3 style={{ marginTop: '20px' }}>
            🎥 Video Lessons
          </h3>

          {course.videos.map((video, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '8px 0',
                background: '#fdf2f8',
                borderRadius: '8px',
              }}
            >
              ▶️ {video}
            </div>
          ))}

          <hr />

          {/* Assignments */}
          <h3 style={{ marginTop: '20px' }}>
            📝 Assignments
          </h3>

          {course.assignments.map((assignment, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '8px 0',
                background: '#fffbeb',
                borderRadius: '8px',
              }}
            >
              📄 {assignment}
            </div>
          ))}

          <hr />

          {/* Learning Outcomes */}
          <h3 style={{ marginTop: '20px' }}>
            🎯 Learning Outcomes
          </h3>

          {[
            'Build real-world projects',
            'Prepare for technical interviews',
            'Gain industry-ready skills',
            'Receive course completion certificate',
          ].map((item, index) => (
            <div
              key={index}
              style={{
                padding: '10px',
                margin: '8px 0',
                background: '#f0fdf4',
                borderRadius: '8px',
              }}
            >
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}