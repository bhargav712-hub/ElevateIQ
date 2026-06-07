import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  FiClock, FiStar, FiUsers, FiCheck, FiArrowRight,
  FiCode, FiBarChart2, FiCloud, FiFeather, FiChevronDown
} from 'react-icons/fi';

import { FiShield } from 'react-icons/fi';

const categoryIconMap = {
  'Development': FiCode,
  'Data Science': FiBarChart2,
  'Cloud': FiCloud,
  'Security': FiShield,
  'Design': FiFeather
};

export default function Courses() {
  const [filter, setFilter] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [courses, setCourses] = useState([]);
  const [faqData, setFaqData] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/api/public/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Failed to fetch courses:", err));

    fetch('http://localhost:8080/api/public/faq')
      .then(res => res.json())
      .then(data => setFaqData(data))
      .catch(err => console.error("Failed to fetch FAQ:", err));
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:8080/api/student/enroll/${courseId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if(res.ok) {
        navigate('/student-dashboard');
      } else {
        const errText = await res.text();
        alert(`Enrollment failed: ${errText}`);
      }
    } catch (e) {
      console.error(e);
      alert("Error occurred during enrollment");
    }
  };

  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filtered = filter === 'All' ? courses : courses.filter(c => c.category === filter);

  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <div>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ letterSpacing: '-0.8px', fontWeight: 800 }}>Our Courses</h1>
          <p style={{ color: 'var(--gray-300)', fontWeight: 500 }}>Choose from industry-designed programs that accelerate your career</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'} btn-sm`} style={{ borderRadius: 8 }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((course, i) => {
              const Icon = categoryIconMap[course.category] || FiCode;
              return (
                <motion.div key={course.id} className="card" {...fadeUp} transition={{ delay: i * 0.1 }}
                   style={{ border: '1px solid var(--gray-200)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  <Link to={`/course/${course.id}`}>
                    <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                      <img src={course.imagePath} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Icon /> {course.category}
                      </div>
                    </div>
                  </Link>
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <Link to={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 8, color: 'var(--dark)' }}>{course.title}</h3>
                      </Link>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock /> {course.duration}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiStar style={{ color: 'var(--warning)', fill: 'var(--warning)' }} /> {course.rating}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiUsers /> {course.students} students</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                        {course.features.map((f, fi) => <span key={fi} className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FiCheck style={{ fontSize: 11 }} /> {f}</span>)}
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div>
                          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>${course.price}</span>
                          <span style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>${course.originalPrice}</span>
                        </div>
                        <span className="badge badge-success" style={{ background: 'rgba(16, 185, 129, 0.12)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>Save ${course.originalPrice - course.price}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <Link to={`/course/${course.id}`} className="btn btn-outline btn-block" style={{ textDecoration: 'none', flex: 1 }}>
                          Details
                        </Link>
                        <button onClick={(e) => { e.preventDefault(); handleEnroll(course.id); }} className="btn btn-primary btn-block" style={{ gap: 8, flex: 1, cursor: 'pointer', border: 'none' }}>
                          Enroll <FiArrowRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-gradient" style={{ background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2 style={{ color: 'white' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--gray-300)' }}>Everything you need to know about our courses</p>
          </motion.div>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqData.map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }}
                  onClick={() => setExpandedFaq(isOpen ? null : i)}
                  style={{
                    background: isOpen ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.03)',
                    border: isOpen ? '1px solid rgba(37,99,235,0.3)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14, padding: '20px 24px', cursor: 'pointer',
                    transition: 'all 0.3s ease', color: 'white',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontWeight: 600, fontSize: 16, color: isOpen ? 'var(--primary-light)' : 'white' }}>{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <FiChevronDown style={{ color: 'var(--primary-light)', fontSize: 18, flexShrink: 0 }} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ marginTop: 14, opacity: 0.8, fontSize: 14, lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
