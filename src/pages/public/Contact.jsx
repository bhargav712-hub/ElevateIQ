import { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: 'Message sent successfully! We\'ll get back to you soon.', type: 'success' });
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with our team.</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 50 }}>
            <motion.div {...fadeUp}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 20 }}>Get In Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={errors.name ? 'error' : ''} placeholder="John Doe" />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={errors.email ? 'error' : ''} placeholder="john@example.com" />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input name="subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={errors.subject ? 'error' : ''} placeholder="How can we help?" />
                  {errors.subject && <div className="form-error">{errors.subject}</div>}
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className={errors.message ? 'error' : ''} placeholder="Tell us more..." />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">Send Message →</button>
              </form>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 20 }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="card" style={{ padding: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>📧</span>
                  <h4 style={{ fontWeight: 600, margin: '8px 0' }}>Email</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>info@eduvancepro.com</p>
                </div>
                <div className="card" style={{ padding: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                  <h4 style={{ fontWeight: 600, margin: '8px 0' }}>Phone</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>+1 (555) 123-4567</p>
                </div>
                <div className="card" style={{ padding: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <h4 style={{ fontWeight: 600, margin: '8px 0' }}>Address</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>123 Innovation Drive, Tech City, TC 10001</p>
                </div>
                <div className="card" style={{ padding: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>⏰</span>
                  <h4 style={{ fontWeight: 600, margin: '8px 0' }}>Working Hours</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Mon - Sat: 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
