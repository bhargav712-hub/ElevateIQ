import { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';

export default function StudentTests() {
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingTests = [
    { title: 'React Fundamentals', date: '2026-06-05', duration: '60 min', questions: 50, status: 'upcoming' },
    { title: 'Node.js Mid-Term', date: '2026-06-08', duration: '90 min', questions: 75, status: 'upcoming' },
    { title: 'MongoDB Quiz', date: '2026-06-12', duration: '30 min', questions: 25, status: 'upcoming' },
  ];

  const completedTests = [
    { title: 'HTML/CSS Basics', score: 92, total: 100, date: '2026-05-20', status: 'passed' },
    { title: 'JavaScript Quiz', score: 85, total: 100, date: '2026-05-15', status: 'passed' },
    { title: 'Git & GitHub', score: 78, total: 100, date: '2026-05-10', status: 'passed' },
  ];

  const examSlots = [
    { course: 'Full Stack Web Dev', date: '2026-06-20', time: '10:00 AM - 12:00 PM', room: 'Online - Zoom A', status: 'available' },
    { course: 'Full Stack Web Dev', date: '2026-06-20', time: '2:00 PM - 4:00 PM', room: 'Online - Zoom B', status: 'booked' },
    { course: 'Data Science', date: '2026-06-22', time: '10:00 AM - 12:00 PM', room: 'Online - Zoom C', status: 'available' },
  ];

  const bookSlot = (slot) => {
    setToast({ message: `Exam slot booked for ${slot.date}! Confirmation sent to your email.`, type: 'success' });
  };

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📝 Tests & Exams</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>View upcoming tests, scores, and book exam slots</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['upcoming', 'completed', 'slots'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`btn btn-sm ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}>
            {tab === 'upcoming' ? '📋 Upcoming Tests' : tab === 'completed' ? '✅ Completed' : '📅 Exam Slots'}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div className="grid-2">
          {upcomingTests.map((test, i) => (
            <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="card-body">
                <h3 style={{ fontWeight: 700 }}>{test.title}</h3>
                <div style={{ display: 'flex', gap: 12, margin: '12px 0', flexWrap: 'wrap', fontSize: 13 }}>
                  <span className="badge badge-primary">📅 {test.date}</span>
                  <span className="badge badge-warning">⏱ {test.duration}</span>
                  <span className="badge badge-success">❓ {test.questions} Qs</span>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => setToast({ message: 'Test started! Good luck! 📝', type: 'info' })}>Start Test →</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="grid-2">
          {completedTests.map((test, i) => (
            <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="card-body">
                <h3 style={{ fontWeight: 700 }}>{test.title}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: test.score >= 80 ? 'var(--success)' : 'var(--warning)', margin: '12px 0' }}>
                  {test.score}%
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 13, color: 'var(--gray-500)' }}>
                  <span>📅 {test.date}</span>
                  <span>🎯 {test.score}/{test.total}</span>
                </div>
                <div className="progress-bar" style={{ marginTop: 12 }}>
                  <div className="progress-fill" style={{ width: `${test.score}%`, background: test.score >= 80 ? 'var(--success)' : 'var(--warning)' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'slots' && (
        <div>
          <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Available Exam Slots</h3>
          <div className="grid-2">
            {examSlots.map((slot, i) => (
              <motion.div key={i} className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="card-body">
                  <h4 style={{ fontWeight: 600 }}>{slot.course}</h4>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)', margin: '8px 0' }}>
                    <div>📅 {slot.date}</div>
                    <div>⏱ {slot.time}</div>
                    <div>📍 {slot.room}</div>
                  </div>
                  <span className={`badge ${slot.status === 'available' ? 'badge-success' : 'badge-warning'}`} style={{ marginBottom: 12, display: 'inline-block' }}>
                    {slot.status === 'available' ? '✅ Available' : '📌 Booked'}
                  </span>
                  <br />
                  <button className="btn btn-primary btn-sm" disabled={slot.status === 'booked'} onClick={() => bookSlot(slot)}>
                    {slot.status === 'available' ? 'Book Slot →' : 'Already Booked'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
