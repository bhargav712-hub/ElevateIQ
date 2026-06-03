import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StudentCourses() {
  const courses = [
    { id: 1, title: 'Full Stack Web Development', progress: 72, instructor: 'Anita Sharma', topics: 24, completed: 17, nextClass: 'React Hooks - June 5', image: '🚀' },
    { id: 2, title: 'Data Science & Machine Learning', progress: 45, instructor: 'Rajesh Kumar', topics: 20, completed: 9, nextClass: 'Python Pandas - June 6', image: '📊' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📚 My Courses</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Track your enrolled courses and progress</p>

      <div className="grid-2">
        {courses.map((course, i) => (
          <motion.div key={course.id} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="card-body">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>{course.image}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{course.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>👩‍🏫 {course.instructor}</p>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span>Course Progress</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress}%` }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>
                <span>📚 {course.completed}/{course.topics} Topics</span>
                <span>📅 {course.nextClass}</span>
              </div>

              <button className="btn btn-primary btn-block" style={{ fontSize: 13 }}>Continue Learning →</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
