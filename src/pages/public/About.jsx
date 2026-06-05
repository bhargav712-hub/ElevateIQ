import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiAward, FiTrendingUp, FiUsers, FiGlobe, FiStar, FiBookOpen, FiCheck } from 'react-icons/fi';

export default function About() {
  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  const avatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&size=150&bold=true`;

  const team = [
    { name: 'Dr. Meera Patel', role: 'CEO & Founder', image: avatar('Meera Patel'), bio: '20+ years in EdTech with a passion for accessible education' },
    { name: 'Prof. Arjun Kapoor', role: 'Head of Academics', image: avatar('Arjun Kapoor'), bio: 'Former IIT professor, curriculum design expert' },
    { name: 'Sarah Williams', role: 'VP of Placements', image: avatar('Sarah Williams'), bio: 'Built placement networks at 3 top institutions' },
    { name: 'David Chen', role: 'CTO', image: avatar('David Chen'), bio: 'Ex-Google engineer, full-stack & AI specialist' },
  ];

  const values = [
    { icon: FiTarget, title: 'Mission-Driven', desc: 'Making quality tech education accessible to everyone' },
    { icon: FiHeart, title: 'Student-First', desc: 'Every decision prioritizes learner success and outcomes' },
    { icon: FiEye, title: 'Industry-Aligned', desc: 'Curriculum constantly updated with market demands' },
    { icon: FiGlobe, title: 'Global Reach', desc: 'Students from 40+ countries learning together' },
  ];

  const stats = [
    { value: '15,000+', label: 'Students Trained', icon: FiUsers },
    { value: '92%', label: 'Placement Rate', icon: FiTrendingUp },
    { value: '500+', label: 'Hiring Partners', icon: FiStar },
    { value: '4.8/5', label: 'Student Rating', icon: FiAward },
  ];

  return (
    <div>
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #0d1b2e 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-1px' }}>About ElevateIQ</h1>
          <p style={{ color: 'var(--gray-300)', maxWidth: 500, margin: '12px auto 0', fontSize: '1.1rem' }}>
            Empowering careers through world-class education since 2018
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <motion.div {...fadeUp}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(37,99,235,0.08)', color: 'var(--primary)',
                padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12
              }}><FiBookOpen /> Our Story</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.5px', lineHeight: 1.2 }}>
                Building Futures Through{' '}
                <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Technology Education
                </span>
              </h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
                At ElevateIQ, we believe education should be accessible, practical, and career-focused.
                Since 2018, we've helped over 15,000 students transform their careers through industry-aligned programs.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>
                Our courses are designed in collaboration with industry experts from top companies,
                ensuring you learn the skills that matter most in today's competitive job market.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.9, fontSize: 15 }}>
                With a 92% placement rate and 500+ hiring partners, we don't just teach — we build careers.
              </p>
            </motion.div>
            <motion.div {...fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="values-grid">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} style={{
                    background: 'var(--gray-100)', borderRadius: 16, padding: 24,
                    border: '1px solid var(--gray-200)', textAlign: 'center'
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, margin: '0 auto 12px',
                      background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(6,182,212,0.1))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--primary)', fontSize: 20
                    }}><Icon /></div>
                    <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{v.title}</h4>
                    <p style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>{v.desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary), #1d4ed8)', padding: '50px 0' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ textAlign: 'center', color: 'white' }}>
                  <Icon style={{ fontSize: 28, opacity: 0.8, marginBottom: 8 }} />
                  <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px' }}>{s.value}</div>
                  <div style={{ fontSize: 14, opacity: 0.8, fontWeight: 500 }}>{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Our Journey</h2>
            <p>Milestones that shaped ElevateIQ</p>
          </motion.div>
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
              transform: 'translateX(-50%)'
            }} className="timeline-line" />
            {[
              { year: '2018', event: 'Founded with 3 courses & 50 students', icon: '🚀', align: 'left' },
              { year: '2020', event: '1,000+ students & launched placement cell', icon: '📈', align: 'right' },
              { year: '2023', event: '10,000+ students & 300 hiring partners', icon: '🌍', align: 'left' },
              { year: '2026', event: '15,000+ alumni & global expansion', icon: '🏆', align: 'right' },
            ].map((m, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.15 }}
                style={{
                  display: 'flex', justifyContent: m.align === 'left' ? 'flex-start' : 'flex-end',
                  padding: '20px 0', position: 'relative'
                }}
              >
                <div style={{
                  width: '45%', padding: 24, borderRadius: 16,
                  background: 'white', border: '1px solid var(--gray-200)',
                  boxShadow: 'var(--shadow-sm)', position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: 28, width: 14, height: 14, borderRadius: '50%',
                    background: 'var(--primary)', border: '3px solid white',
                    boxShadow: '0 0 0 2px var(--primary)',
                    [m.align === 'left' ? 'right' : 'left']: '-37px',
                  }} className="timeline-dot" />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{m.icon}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: 8 }}>{m.year}</div>
                  <p style={{ fontSize: 14, color: 'var(--gray-500)', fontWeight: 500, margin: 0 }}>{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .timeline-line { left: 20px !important; }
            .timeline-dot { left: -7px !important; right: auto !important; }
            .values-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Meet Our Leadership</h2>
            <p>The experts driving our mission forward</p>
          </motion.div>
          <div className="grid-4">
            {team.map((t, i) => (
              <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: 32, border: '1px solid var(--gray-200)', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                  background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
                }} />
                <div style={{
                  width: 80, height: 80, borderRadius: '50%', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, var(--gray-200), var(--gray-300))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', overflow: 'hidden',
                }}>
                  <img src={t.image} alt={t.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.name}</h4>
                <p style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginBottom: 8 }}>{t.role}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #0d1b2e 100%)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 16, color: 'white', letterSpacing: '-1px' }}>
              Ready to Write Your Success Story?
            </h2>
            <p style={{ color: 'var(--gray-300)', marginBottom: 32, fontSize: '1.05rem', maxWidth: 480, margin: '0 auto 32px' }}>
              Join 15,000+ learners and take the first step toward your dream career.
            </p>
            <a href="/register" className="btn btn-primary btn-lg" style={{
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              boxShadow: '0 0 30px rgba(37,99,235,0.4)',
            }}>
              Get Started Free <FiCheck />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
