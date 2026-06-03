import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteInfo, courses, placements, achievements } from '../../data/siteData';
import { HeroScene } from '../../components/3d/Scene3D';

export default function Home() {
  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <div>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', overflow: 'hidden', paddingTop: 70 }}>
        <HeroScene />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: 700 }}>
            <span style={{ background: 'rgba(108,92,231,0.2)', color: 'var(--primary-light)', padding: '8px 20px', borderRadius: 50, fontSize: 14, fontWeight: 600 }}>🚀 World-Class Online Education</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'white', margin: '20px 0', lineHeight: 1.15 }}>
              {siteInfo.tagline}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: 30 }}>
              Transform your career with industry-led courses, hands-on projects, and guaranteed placement support.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-primary btn-lg">Explore Courses →</Link>
              <Link to="/register" className="btn btn-white btn-lg">Get Started Free</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-4">
            {achievements.map((a, i) => (
              <motion.div key={i} className="stat-card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="stat-value" style={{ fontSize: '2.5rem' }}>{a.value}</div>
                <div className="stat-label" style={{ fontSize: 16 }}>{a.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Popular Courses</h2>
            <p>Industry-designed curriculum tailored for career success</p>
          </motion.div>
          <div className="grid-3">
            {courses.slice(0, 6).map((course, i) => (
              <motion.div key={course.id} className="card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ cursor: 'pointer' }}>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: '3rem', marginBottom: 12 }}>{course.image}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>{course.title}</h3>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, fontSize: 13, color: 'var(--gray-500)' }}>
                    <span>⏱ {course.duration}</span>
                    <span>⭐ {course.rating}</span>
                    <span>👥 {course.students}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {course.features.map((f, fi) => <span key={fi} className="badge badge-primary">{f}</span>)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>${course.price}</span>
                      <span style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>${course.originalPrice}</span>
                    </div>
                    <Link to={`/courses`} className="btn btn-primary btn-sm">Enroll Now</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/courses" className="btn btn-outline">View All Courses →</Link>
          </div>
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Our Success Stories</h2>
            <p>Hear from our alumni who landed their dream jobs</p>
          </motion.div>
          <div className="grid-2">
            {placements.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} className="card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '3rem' }}>{p.image}</span>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>{p.name}</h4>
                      <p style={{ fontSize: 14, opacity: 0.8 }}>{p.role}</p>
                      <div className="badge badge-success" style={{ marginTop: 8, background: 'rgba(0,184,148,0.2)', color: '#55efc4' }}>💰 {p.package}</div>
                      <p style={{ fontSize: 13, opacity: 0.7, marginTop: 12, fontStyle: 'italic' }}>"{p.story}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Our Hiring Partners</h2>
            <p>Top companies hiring our graduates</p>
          </motion.div>
          <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'IBM', 'Adobe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify'].map((c, i) => (
              <span key={i} className="badge" style={{
                padding: '10px 24px', fontSize: 15, background: 'var(--gray-100)', color: 'var(--gray-700)', fontWeight: 600, border: '1px solid var(--gray-200)'
              }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Ready to Start Your Journey?</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 30, maxWidth: 500, margin: '0 auto 30px' }}>Join 15,000+ students and transform your career with industry-leading courses.</p>
            <Link to="/register" className="btn btn-primary btn-lg">Enroll Now — Start Learning →</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
