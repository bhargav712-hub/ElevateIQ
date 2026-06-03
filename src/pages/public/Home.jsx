import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookOpen, FiStar, FiUsers, FiTrendingUp, FiArrowRight, FiClock } from 'react-icons/fi';
import { siteInfo, courses, placements, achievements } from '../../data/siteData';
import { HeroScene } from '../../components/3d/Scene3D';

export default function Home() {
  const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

  return (
    <div>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', overflow: 'hidden', paddingTop: 70 }}>
        <HeroScene />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: 680 }}>
            <span style={{ background: 'rgba(37,99,235,0.15)', color: 'var(--primary-light)', padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600, letterSpacing: '0.3px' }}>🚀 World-Class Online Education</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, color: 'white', margin: '20px 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {siteInfo.tagline}
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
              Transform your career with industry-led courses, hands-on projects, and guaranteed placement support.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-primary btn-lg">
                <FiBookOpen size={18} /> Explore Courses <FiArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn btn-white btn-lg">
                Student Login →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-4">
            {achievements.map((a, i) => (
              <motion.div key={i} className="stat-card" {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <div className="stat-icon">{a.icon || '📊'}</div>
                <div className="stat-value">{a.value}</div>
                <div className="stat-label" style={{ fontSize: 15 }}>{a.label}</div>
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
              <motion.div key={course.id} className="card" {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <div className="card-body">
                  <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{course.image}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{course.title}</h3>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10, fontSize: 13, color: 'var(--gray-500)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={12} /> {course.duration}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiStar size={12} /> {course.rating}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiUsers size={12} /> {course.students}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                    {course.features.map((f, fi) => <span key={fi} className="badge badge-primary">{f}</span>)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>${course.price}</span>
                      <span style={{ fontSize: 12, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 6 }}>${course.originalPrice}</span>
                    </div>
                    <Link to="/courses" className="btn btn-primary btn-sm">Learn More</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/courses" className="btn btn-outline">
              View All Courses <FiArrowRight size={16} />
            </Link>
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
              <motion.div key={p.id} className="card" {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '2.8rem' }}>{p.image}</span>
                    <div>
                      <h4 style={{ fontWeight: 700 }}>{p.name}</h4>
                      <p style={{ fontSize: 14, opacity: 0.7 }}>{p.role}</p>
                      <div className="badge badge-success" style={{ marginTop: 6, background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>💰 {p.package}</div>
                      <p style={{ fontSize: 13, opacity: 0.6, marginTop: 10, fontStyle: 'italic', lineHeight: 1.6 }}>"{p.story}"</p>
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
          <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'IBM', 'Adobe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify'].map((c, i) => (
              <span key={i} className="badge" style={{
                padding: '8px 20px', fontSize: 14, background: 'var(--gray-50)', color: 'var(--gray-600)', fontWeight: 600, border: '1px solid var(--gray-200)'
              }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Ready to Start Your Journey?</h2>
            <p style={{ color: 'var(--gray-500)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', fontSize: 15 }}>
              Join 15,000+ students and transform your career with industry-leading courses.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg">
              <FiArrowRight size={18} /> Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
