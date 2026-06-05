import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { siteInfo, placements, achievements } from '../../data/siteData';
import { HeroScene, ThreeDCard } from '../../components/3d/Scene3D';
import {
  FiSend, FiCode, FiBarChart2, FiCloud, FiShield, FiFeather,
  FiClock, FiStar, FiUsers, FiDollarSign, FiArrowRight, FiCheck,
  FiZap, FiAward, FiBriefcase, FiTrendingUp
} from 'react-icons/fi';

const categoryIconMap = {
  'Development': FiCode,
  'Data Science': FiBarChart2,
  'Cloud': FiCloud,
  'Security': FiShield,
  'Design': FiFeather
};

/* ── Animated typing subtitle ───────────────────── */
const SUBTITLES = [
  'Master Full-Stack Development',
  'Excel in Data Science & AI',
  'Build Cloud-Native Solutions',
  'Launch Your Tech Career',
];

function TypingSubtitle() {
  const [idx, setIdx]   = useState(0);
  const [shown, setShown] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = SUBTITLES[idx];
    let timeout;
    if (!deleting && shown.length < target.length) {
      timeout = setTimeout(() => setShown(target.slice(0, shown.length + 1)), 60);
    } else if (!deleting && shown.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && shown.length > 0) {
      timeout = setTimeout(() => setShown(shown.slice(0, -1)), 35);
    } else if (deleting && shown.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % SUBTITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [shown, deleting, idx]);

  return (
    <span style={{ color: 'var(--secondary)', fontWeight: 800, letterSpacing: '-0.5px' }}>
      {shown}
      <span style={{
        display: 'inline-block',
        width: 3,
        height: '0.85em',
        background: 'linear-gradient(180deg, var(--secondary), #2563eb)',
        marginLeft: 4,
        verticalAlign: 'middle',
        borderRadius: 2,
        animation: 'blink 1s step-end infinite'
      }} />
    </span>
  );
}

/* ── Floating stat badge ────────────────────────── */
function FloatingBadge({ icon: Icon, label, value, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      style={{
        position: 'absolute',
        background: 'rgba(15, 23, 42, 0.82)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(37, 99, 235, 0.35)',
        borderRadius: 14,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        ...style,
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(6,182,212,0.3))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--secondary)', fontSize: 16,
      }}>
        <Icon />
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11, color: 'rgba(148,163,184,0.9)', fontWeight: 500 }}>{label}</div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/public/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error("Failed to fetch courses:", err));
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { type: 'spring', damping: 14, stiffness: 110 }
    }
  };

  return (
    <div>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 90,
        paddingBottom: 60,
        background: 'transparent',
      }}>
        {/* Live Neural Network Background */}
        <HeroScene />

        {/* Noise texture overlay for premium feel */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }} className="hero-grid">

            {/* ── Left: Copy ─────────────────────── */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

              {/* Pill badge */}
              <motion.span
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(37,99,235,0.12)',
                  color: '#93c5fd',
                  padding: '7px 18px', borderRadius: 50,
                  fontSize: 12, fontWeight: 700,
                  border: '1px solid rgba(37,99,235,0.3)',
                  textTransform: 'uppercase', letterSpacing: '1.2px',
                  marginBottom: 14,
                  boxShadow: '0 0 20px rgba(37,99,235,0.15)',
                }}
              >
                <FiZap style={{ fontSize: 11 }} /> Next-Generation Learning Engine
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.6rem)',
                  fontWeight: 900,
                  margin: '0 0 14px 0',
                  lineHeight: 1.13,
                  letterSpacing: '-2px',
                  color: '#ffffff',
                  textShadow: '0 0 40px rgba(37,99,235,0.4)',
                }}
              >
                <span style={{
                  background: 'linear-gradient(135deg, #ffffff 30%, #bfdbfe 65%, #67e8f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {siteInfo.tagline}
                </span>
              </motion.h1>

              {/* Typing subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                style={{ marginBottom: 22 }}
              >
                {/* Label */}
                <span style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2.5px',
                  color: 'rgba(148,163,184,0.65)',
                  marginBottom: 5,
                }}>Currently enrolling in</span>

                {/* Main typing text */}
                <p style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: '-0.8px',
                  margin: 0,
                  paddingBottom: 10,
                  borderBottom: '2px solid',
                  borderImage: 'linear-gradient(90deg, #2563eb, #06b6d4, transparent) 1',
                  display: 'inline-block',
                  maxWidth: '100%',
                }}>
                  <TypingSubtitle />
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                style={{ fontSize: '1.05rem', color: 'rgba(203,213,225,0.85)', lineHeight: 1.9, marginBottom: 38, fontWeight: 400, maxWidth: 520 }}
              >
                Master complex tech disciplines through structured live labs, guided production builds,
                and premium placement pathways with 200+ hiring partners across the globe.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}
              >
                <Link to="/courses" className="btn btn-primary btn-lg" style={{
                  gap: 8,
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  boxShadow: '0 0 30px rgba(37,99,235,0.4)',
                  border: '1px solid rgba(96,165,250,0.3)',
                }}>
                  Explore Courses <FiArrowRight />
                </Link>
                <Link to="/register" className="btn btn-lg" style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'white',
                  backdropFilter: 'blur(8px)',
                  gap: 8,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                >
                  Get Started Free
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
                style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}
              >
                {[
                  { icon: FiAward, text: 'Industry Certified' },
                  { icon: FiBriefcase, text: '200+ Hiring Partners' },
                  { icon: FiTrendingUp, text: '94% Placement Rate' },
                ].map(({ icon: Icon, text }, i) => (
                  <span key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 13, color: 'rgba(148,163,184,0.9)', fontWeight: 600,
                  }}>
                    <Icon style={{ color: 'var(--secondary)', fontSize: 14 }} /> {text}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Visual Card with floating badges ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
              className="hero-visual-side"
            >
              {/* Glow ring behind card */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 420, height: 420, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
                animation: 'pulse-ring 3s ease-in-out infinite',
                pointerEvents: 'none',
              }} />

              <ThreeDCard style={{
                width: '100%', maxWidth: 460, borderRadius: 22,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 30px 60px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                background: 'rgba(11,19,43,0.7)',
                backdropFilter: 'blur(14px)',
                position: 'relative',
              }}>
                {/* Top bar */}
                <div style={{
                  padding: '12px 18px',
                  background: 'rgba(37,99,235,0.08)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {['#ef4444','#f59e0b','#10b981'].map((c,i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                  <span style={{ marginLeft: 8, fontSize: 16, color: 'rgba(148,163,184,0.7)', fontFamily: 'monospace' }}>
                    elevateiq
                  </span>
                </div>

                <img
                  src="/courses/fullstack.png"
                  alt="ElevateIQ Learning Dashboard"
                  style={{ width: '100%', display: 'block', height: 'auto', objectFit: 'cover' }}
                />

                {/* Bottom info bar */}
                <div style={{
                  padding: '14px 18px',
                  background: 'rgba(15,23,42,0.9)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 13, color: '#93c5fd', fontWeight: 600 }}>🔴 Live Session</span>
                  <span style={{ fontSize: 12, color: 'rgba(148,163,184,0.7)' }}>2,341 students online</span>
                </div>
              </ThreeDCard>

              {/* Floating stat badges */}
              <FloatingBadge icon={FiUsers}     value="15,000+"  label="Active Learners"  style={{ top: '8%',  left: '-12%', zIndex: 10 }} />
              <FloatingBadge icon={FiStar}      value="4.9 ★"    label="Avg Rating"       style={{ bottom: '22%', left: '-14%', zIndex: 10 }} />
              <FloatingBadge icon={FiAward}     value="94%"      label="Placement Rate"   style={{ top: '10%', right: '-10%', zIndex: 10 }} />
              <FloatingBadge icon={FiTrendingUp} value="₹12 LPA" label="Avg Package"      style={{ bottom: '8%',  right: '-8%', zIndex: 10 }} />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to bottom, transparent, rgba(10,15,30,0.6))',
          pointerEvents: 'none', zIndex: 3,
        }} />
      </section>

      <style>{`
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes pulse-ring {
          0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%,-50%) scale(1.08); opacity: 1; }
        }
        @media (max-width: 991px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .hero-grid > div:first-child { align-items: center !important; display: flex; flex-direction: column; }
          .hero-grid h1 { justify-content: center; }
          .hero-grid p { max-width: 600px; }
          .hero-visual-side { margin-top: 20px; }
        }
      `}</style>

      {/* ═══════════════ STATS STRIP ═══════════════ */}
      <section className="section" style={{ background: 'var(--white)', padding: '50px 0' }}>
        <div className="container">
          <div className="grid-4">
            {achievements.map((a, i) => (
              <motion.div key={i} className="stat-card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ border: '1px solid var(--gray-200)', background: 'var(--gray-100)', textAlign: 'center', padding: '28px 20px', borderRadius: 16 }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>{a.value}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-600)', marginTop: 8 }}>{a.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ POPULAR COURSES ═══════════════ */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Popular Courses</h2>
            <p>Industry-designed curriculum tailored for career success</p>
          </motion.div>
          <div className="grid-3">
            {courses.slice(0, 6).map((course, i) => {
              const Icon = categoryIconMap[course.category] || FiCode;
              return (
                <motion.div key={course.id} className="card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ cursor: 'pointer', border: '1px solid var(--gray-200)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <img src={course.imagePath} alt={course.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)',
                      color: 'white', padding: '4px 10px', borderRadius: 8,
                      fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6
                    }}>
                      <Icon /> {course.category}
                    </div>
                  </div>
                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 8, color: 'var(--dark)' }}>{course.title}</h3>
                      <div style={{ display: 'flex', gap: 12, marginBottom: 16, fontSize: 13, color: 'var(--gray-500)', fontWeight: 500 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock /> {course.duration}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiStar style={{ color: 'var(--warning)', fill: 'var(--warning)' }} /> {course.rating}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiUsers /> {course.students}</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                        {course.features.map((f, fi) => (
                          <span key={fi} className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <FiCheck style={{ fontSize: 11 }} /> {f}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--gray-200)', paddingTop: 16 }}>
                      <div>
                        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>₹{course.price}</span>
                        <span style={{ fontSize: 13, color: 'var(--gray-400)', textDecoration: 'line-through', marginLeft: 8 }}>₹{course.originalPrice}</span>
                      </div>
                      <Link to="/courses" className="btn btn-primary btn-sm">Enroll Now</Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/courses" className="btn btn-outline" style={{ gap: 8 }}>View All Courses <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SUCCESS STORIES ═══════════════ */}
      <section className="section section-gradient" style={{ background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2 style={{ color: 'white' }}>Our Success Stories</h2>
            <p style={{ color: 'var(--gray-400)' }}>Hear from our alumni who landed their dream jobs</p>
          </motion.div>
          <div className="grid-2">
            {placements.slice(0, 4).map((p, i) => (
              <motion.div key={p.id} className="card" {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.06)', color: 'white' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <img src={p.image} alt={p.name}
                      style={{
                        width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
                        border: '2px solid rgba(37,99,235,0.3)'
                      }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div>
                      <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{p.name}</h4>
                      <p style={{ fontSize: 14, opacity: 0.8, fontWeight: 500 }}>{p.role}</p>
                      <div className="badge" style={{
                        marginTop: 8, background: 'rgba(16,185,129,0.15)',
                        color: '#10b981', border: '1px solid rgba(16,185,129,0.25)',
                        fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4
                      }}>
                        <FiDollarSign /> {p.package} Package
                      </div>
                      <p style={{ fontSize: 13, opacity: 0.7, marginTop: 16, fontStyle: 'italic', lineHeight: 1.6 }}>"{p.story}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HIRING PARTNERS ═══════════════ */}
      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Our Hiring Partners</h2>
            <p>Top companies actively hiring our graduates</p>
          </motion.div>
          <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'IBM', 'Adobe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify'].map((c, i) => (
              <span key={i} className="badge" style={{
                padding: '12px 24px', fontSize: 14,
                background: 'var(--gray-100)', color: 'var(--gray-700)',
                fontWeight: 600, border: '1px solid var(--gray-200)', borderRadius: 8
              }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #0d1b2e 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp}>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: 16, color: 'white', letterSpacing: '-1px' }}>
              Ready to Start Your Journey?
            </h2>
            <p style={{ color: 'var(--gray-400)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', fontWeight: 500, fontSize: '1.05rem' }}>
              Join 15,000+ students and transform your career with industry-leading courses and expert mentors.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg" style={{
              gap: 8,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              boxShadow: '0 0 40px rgba(37,99,235,0.5)',
              border: '1px solid rgba(96,165,250,0.3)',
            }}>
              Enroll Now — Start Learning <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
