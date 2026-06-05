import { useState } from 'react';
import { motion } from 'framer-motion';
import { placements } from '../../data/siteData';
import Toast from '../../components/common/Toast';
import { FiCreditCard, FiFileText, FiVolume2, FiBookOpen, FiUsers, FiTrendingUp } from 'react-icons/fi';

export default function Placements() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', query: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: 'Placement executive will contact you within 24 hours!', type: 'success' });
      setForm({ name: '', email: '', phone: '', query: '' });
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Placements</h1>
          <p>92% placement rate with 500+ hiring partners</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Placement Statistics</h2>
          </motion.div>
          <div className="grid-4">
            {[
              { value: '92%', label: 'Placement Rate' },
              { value: '500+', label: 'Hiring Partners' },
              { value: '$110K', label: 'Average Salary' },
              { value: '45 Days', label: 'Avg Placement Time' },
            ].map((s, i) => (
              <motion.div key={i} className="stat-card" {...fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label" style={{ fontSize: 16 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container">
          <motion.div className="section-title" {...fadeUp}>
            <h2>Success Stories</h2>
            <p>Our alumni working at top companies worldwide</p>
          </motion.div>
          <div className="grid-2">
            {placements.map((p, i) => (
              <motion.div key={p.id} className="card" {...fadeUp} transition={{ delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(10px)' }}>
                <div className="card-body">
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <img src={p.image} alt={p.name}
                      style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid rgba(37,99,235,0.3)' }}
                    />
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>{p.name}</h4>
                      <p style={{ fontSize: 14, opacity: 0.8 }}>{p.role}</p>
                      <div className="badge badge-success" style={{ marginTop: 8, background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <FiCreditCard style={{ fontSize: 13 }} /> {p.package}
                      </div>
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
            <p>Top companies that trust our graduates</p>
          </motion.div>
          <motion.div {...fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, maxWidth: 800, margin: '0 auto' }}>
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'IBM', 'Adobe', 'Salesforce', 'Oracle', 'Intel', 'Cisco', 'Uber', 'Airbnb', 'Spotify', 'Twitter', 'LinkedIn', 'PayPal', 'Shopify'].map((c, i) => (
              <span key={i} className="badge" style={{
                padding: '10px 24px', fontSize: 15, background: 'var(--gray-100)', color: 'var(--gray-700)', fontWeight: 600, border: '1px solid var(--gray-200)'
              }}>{c}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 50, alignItems: 'flex-start' }}>
            <motion.div {...fadeUp}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16 }}>What We Offer</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: FiFileText, title: 'Resume Building', desc: 'Professional resume crafting by industry experts' },
                  { icon: FiVolume2, title: 'Mock Interviews', desc: 'One-on-one mock interviews with hiring managers' },
                  { icon: FiBookOpen, title: 'Career Counseling', desc: 'Personalized career guidance and roadmap' },
                  { icon: FiUsers, title: 'Job Referrals', desc: 'Direct referrals to 500+ partner companies' },
                  { icon: FiTrendingUp, title: 'Skill Assessments', desc: 'Regular assessments to track readiness' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, borderRadius: 12, background: 'var(--gray-100)' }}>
                      <span style={{ display: 'inline-flex', fontSize: '1.4rem', color: 'var(--primary)' }}><Icon /></span>
                      <div>
                        <h4 style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</h4>
                        <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20 }}>Contact Placement Executive</h3>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 20 }}>Fill this form and our placement team will reach out to you within 24 hours.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={errors.name ? 'error' : ''} placeholder="Your name" />
                    {errors.name && <div className="form-error">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={errors.email ? 'error' : ''} placeholder="your@email.com" />
                    {errors.email && <div className="form-error">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={errors.phone ? 'error' : ''} placeholder="+1 555-000-0000" />
                    {errors.phone && <div className="form-error">{errors.phone}</div>}
                  </div>
                  <div className="form-group">
                    <label>Your Query</label>
                    <textarea value={form.query} onChange={e => setForm({ ...form, query: e.target.value })} placeholder="Tell us about your background and goals..." />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Submit →</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
