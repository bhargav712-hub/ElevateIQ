import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses } from '../../data/siteData';
import { FiArrowLeft, FiBookOpen, FiList, FiFileText, FiCheck, FiArrowRight, FiClock, FiStar, FiUsers } from 'react-icons/fi';

export default function CourseDetail() {
  const { id } = useParams();
  const [detailTab, setDetailTab] = useState('description');

  const course = courses.find(c => c.id === Number(id));

  if (!course) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center' }}>
        <h1>Course not found</h1>
        <Link to="/courses" className="btn btn-primary" style={{ marginTop: 20 }}>Back to Courses</Link>
      </div>
    );
  }

  const tabs = [
    { key: 'description', label: 'Description', icon: FiFileText },
    { key: 'content', label: 'Course Content', icon: FiList },
    { key: 'syllabus', label: 'Syllabus', icon: FiBookOpen },
  ];

  return (
    <div style={{ paddingTop: 70 }}>
      <div style={{
        background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 20px' }}>
          <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--gray-400)', fontSize: 14, fontWeight: 500, marginBottom: 20, transition: 'var(--transition)' }}
            onMouseEnter={e => e.target.style.color = 'white'}
            onMouseLeave={e => e.target.style.color = 'var(--gray-400)'}
          ><FiArrowLeft /> Back to Courses</Link>
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <img src={course.imagePath} alt={course.title}
              style={{ width: 200, height: 140, borderRadius: 16, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', margin: '0 0 8px', letterSpacing: '-0.5px' }}>{course.title}</h1>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14, color: 'var(--gray-300)', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock /> {course.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiStar style={{ color: 'var(--warning)' }} /> {course.rating}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiUsers /> {course.students} students</span>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                {course.features.map((f, fi) => (
                  <span key={fi} className="badge" style={{ background: 'rgba(37,99,235,0.15)', color: '#93c5fd', border: '1px solid rgba(37,99,235,0.25)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FiCheck style={{ fontSize: 11 }} /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section" style={{ padding: '30px 0', background: 'var(--gray-100)', minHeight: '50vh' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, marginBottom: 24, borderBottom: '1px solid var(--gray-200)', flexWrap: 'wrap' }}>
            {tabs.map(tab => {
              const TabIcon = tab.icon;
              const active = detailTab === tab.key;
              return (
                <button key={tab.key} onClick={() => setDetailTab(tab.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px',
                    background: active ? 'var(--primary)' : 'transparent',
                    color: active ? 'white' : 'var(--gray-500)',
                    border: 'none', borderRadius: '8px 8px 0 0', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                    transition: 'var(--transition)',
                    borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
                    marginBottom: -1,
                  }}
                ><TabIcon /> {tab.label}</button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={detailTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              {detailTab === 'description' && (
                <div className="card" style={{ padding: 32, border: '1px solid var(--gray-200)' }}>
                  <p style={{ color: 'var(--gray-600)', lineHeight: 1.9, fontSize: 15 }}>{course.description}</p>
                  <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 140, background: 'var(--gray-100)', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid var(--gray-200)' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{course.duration}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, marginTop: 4 }}>Duration</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 140, background: 'var(--gray-100)', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid var(--gray-200)' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>${course.price}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, marginTop: 4 }}>Price</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 140, background: 'var(--gray-100)', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid var(--gray-200)' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{course.rating}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, marginTop: 4 }}>Rating</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 140, background: 'var(--gray-100)', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid var(--gray-200)' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{course.students}</div>
                      <div style={{ fontSize: 13, color: 'var(--gray-500)', fontWeight: 500, marginTop: 4 }}>Students</div>
                    </div>
                  </div>
                  <Link to="/register" className="btn btn-primary btn-lg" style={{ marginTop: 28, display: 'inline-flex', gap: 8 }}>
                    Enroll Now — Start Learning <FiArrowRight />
                  </Link>
                </div>
              )}

              {detailTab === 'content' && (
                <div className="card" style={{ padding: 32, border: '1px solid var(--gray-200)' }}>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 20 }}>What you'll learn in this program:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {course.content.map((item, ci) => (
                      <div key={ci} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: 'var(--gray-100)', borderRadius: 10, padding: '14px 18px',
                        border: '1px solid var(--gray-200)'
                      }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: 'rgba(37,99,235,0.1)', color: 'var(--primary)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, flexShrink: 0
                        }}>{ci + 1}</div>
                        <span style={{ color: 'var(--dark)', fontWeight: 500, fontSize: 14 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {detailTab === 'syllabus' && (
                <div className="card" style={{ padding: 32, border: '1px solid var(--gray-200)' }}>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14, marginBottom: 20 }}>Program syllabus broken down by module:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {course.syllabus.map((mod, mi) => (
                      <div key={mi} style={{
                        border: '1px solid var(--gray-200)', borderRadius: 14, overflow: 'hidden',
                        background: 'white',
                      }}>
                        <div style={{
                          background: 'var(--gray-100)', padding: '14px 20px',
                          fontWeight: 700, fontSize: 15, color: 'var(--dark)',
                          borderBottom: '1px solid var(--gray-200)',
                          display: 'flex', alignItems: 'center', gap: 10
                        }}>
                          <span style={{
                            background: 'var(--primary)', color: 'white', borderRadius: 6,
                            padding: '3px 10px', fontSize: 11, fontWeight: 700
                          }}>Module {mi + 1}</span>
                          {mod.module}
                        </div>
                        <div style={{ padding: '10px 20px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                          {mod.topics.map((topic, ti) => (
                            <div key={ti} style={{
                              display: 'flex', alignItems: 'center', gap: 8,
                              padding: '6px 0', fontSize: 13, color: 'var(--gray-600)'
                            }}>
                              <FiCheck style={{ color: 'var(--success)', fontSize: 13, flexShrink: 0 }} />
                              {topic}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/register" className="btn btn-primary btn-lg" style={{ marginTop: 24, display: 'inline-flex', gap: 8 }}>
                    Enroll Now — Start Learning <FiArrowRight />
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}