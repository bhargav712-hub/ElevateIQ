import { motion } from 'framer-motion';

export default function About() {
  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
  const team = [
    { name: 'Dr. Meera Patel', role: 'CEO & Founder', image: '👩‍💻' },
    { name: 'Prof. Arjun Kapoor', role: 'Head of Academics', image: '👨‍🏫' },
    { name: 'Sarah Williams', role: 'VP of Placements', image: '👩‍💼' },
    { name: 'David Chen', role: 'CTO', image: '👨‍💻' },
  ];

  return (
    <div>
      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>About EduVance Pro</h1>
          <p>Empowering careers through world-class education since 2018</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <motion.div {...fadeUp}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 20 }}>Our Mission</h2>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 16 }}>
                At EduVance Pro, we believe education should be accessible, practical, and career-focused.
                Since 2018, we've helped over 15,000 students transform their careers through industry-aligned programs.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8, marginBottom: 16 }}>
                Our courses are designed in collaboration with industry experts from top companies,
                ensuring you learn the skills that matter most in today's competitive job market.
              </p>
              <p style={{ color: 'var(--gray-500)', lineHeight: 1.8 }}>
                With a 92% placement rate and 500+ hiring partners, we don't just teach — we build careers.
              </p>
            </motion.div>
            <motion.div {...fadeUp} style={{ textAlign: 'center', fontSize: '8rem' }}>🚀</motion.div>
          </div>
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div className="section-title" {...fadeUp}>
            <h2>Our Journey</h2>
          </motion.div>
          <div className="grid-4" style={{ marginTop: 30 }}>
            {[
              { year: '2018', event: 'Founded with 3 courses & 50 students' },
              { year: '2020', event: '1,000+ students & launched placement cell' },
              { year: '2023', event: '10,000+ students & 300 hiring partners' },
              { year: '2026', event: '15,000+ alumni & global expansion' },
            ].map((m, i) => (
              <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: 24 }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{m.year}</div>
                <p style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>{m.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Meet Our Leadership</h2>
          </motion.div>
          <div className="grid-4">
            {team.map((t, i) => (
              <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.1 }} style={{ textAlign: 'center', padding: 32 }}>
                <div style={{ fontSize: '4rem', marginBottom: 16 }}>{t.image}</div>
                <h4 style={{ fontWeight: 700 }}>{t.name}</h4>
                <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
