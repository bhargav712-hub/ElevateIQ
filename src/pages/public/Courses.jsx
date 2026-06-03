import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses, faqData } from '../../data/siteData';
import Toast from '../../components/common/Toast';

export default function Courses() {
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const categories = ['All', ...new Set(courses.map(c => c.category))];
  const filtered = filter === 'All' ? courses : courses.filter(c => c.category === filter);

  const openEnroll = (course) => {
    setSelectedCourse(course);
    setEnrollForm({ name: '', email: '', phone: '' });
    setErrors({});
  };

  const handleEnroll = (e) => {
    e.preventDefault();
    const errs = {};
    if (!enrollForm.name.trim()) errs.name = 'Name is required';
    if (!enrollForm.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(enrollForm.email)) errs.email = 'Invalid email';
    if (!enrollForm.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: `Enrolled in ${selectedCourse.title}! Check your email for payment link.`, type: 'success' });
      setSelectedCourse(null);
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Our Courses</h1>
          <p>Choose from industry-designed programs that accelerate your career</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'} btn-sm`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((course, i) => (
              <motion.div key={course.id} className="card" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>{course.image}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>{course.title}</h3>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 13, color: 'var(--gray-500)' }}>
                    <span>⏱ {course.duration}</span>
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.students} students</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {course.features.map((f, fi) => <span key={fi} className="badge badge-primary">{f}</span>)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)' }}>${course.price}</span>
                      <span style={{ fontSize: 14, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>${course.originalPrice}</span>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: 12 }}>Save ${course.originalPrice - course.price}</span>
                  </div>
                  <button onClick={() => openEnroll(course)} className="btn btn-primary btn-block">
                    Enroll Now → <span style={{ fontSize: 12, opacity: 0.7 }}>Secure Payment</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Frequently Asked Questions</h2>
          </motion.div>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {faqData.map((faq, i) => (
              <motion.details key={i} {...fadeUp} transition={{ delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, marginBottom: 12, padding: 16, cursor: 'pointer', color: 'white' }}>
                <summary style={{ fontWeight: 600, fontSize: 16 }}>{faq.q}</summary>
                <p style={{ marginTop: 12, opacity: 0.8, fontSize: 14 }}>{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {selectedCourse && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
        }} onClick={() => setSelectedCourse(null)}>
          <div style={{
            background: 'white', borderRadius: 16, padding: 32, maxWidth: 480, width: '90%', maxHeight: '80vh', overflow: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Enroll in {selectedCourse.title}</h3>
              <button onClick={() => setSelectedCourse(null)} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>&times;</button>
            </div>
            <div style={{ background: 'var(--gray-100)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--gray-500)' }}>Course Price</span>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)' }}>${selectedCourse.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--gray-500)' }}>Duration</span>
                <span>{selectedCourse.duration}</span>
              </div>
            </div>
            <form onSubmit={handleEnroll}>
              <div className="form-group">
                <label>Full Name</label>
                <input value={enrollForm.name} onChange={e => setEnrollForm({ ...enrollForm, name: e.target.value })} className={errors.name ? 'error' : ''} placeholder="Your name" />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={enrollForm.email} onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })} className={errors.email ? 'error' : ''} placeholder="your@email.com" />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={enrollForm.phone} onChange={e => setEnrollForm({ ...enrollForm, phone: e.target.value })} className={errors.phone ? 'error' : ''} placeholder="+1 555-000-0000" />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>
              <div style={{ background: 'var(--gray-100)', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: 'var(--gray-500)' }}>
                🔒 Secure payment via Stripe. Your information is encrypted.
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Proceed to Payment 💳</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
