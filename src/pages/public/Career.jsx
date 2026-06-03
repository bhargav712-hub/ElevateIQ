import { useState } from 'react';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';

export default function Career() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'job', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const jobs = [
    { title: 'Senior React Developer', type: 'Full-Time', location: 'Remote', dept: 'Engineering' },
    { title: 'Data Science Intern', type: 'Internship', location: 'Hybrid', dept: 'Data' },
    { title: 'Placement Coordinator', type: 'Full-Time', location: 'On-site', dept: 'Placement' },
    { title: 'UI/UX Designer', type: 'Contract', location: 'Remote', dept: 'Design' },
    { title: 'MERN Stack Developer', type: 'Full-Time', location: 'Remote', dept: 'Engineering' },
    { title: 'Cloud Engineer', type: 'Full-Time', location: 'Hybrid', dept: 'Cloud' },
  ];

  const internships = [
    { title: 'Frontend Development Intern', duration: '3 Months', stipend: '$500/mo', spots: 5 },
    { title: 'Python/ML Intern', duration: '3 Months', stipend: '$600/mo', spots: 3 },
    { title: 'Digital Marketing Intern', duration: '2 Months', stipend: '$400/mo', spots: 4 },
    { title: 'Content Writing Intern', duration: '2 Months', stipend: '$300/mo', spots: 6 },
  ];

  const projectTraining = [
    { title: 'E-Commerce Platform', tech: 'MERN Stack', duration: '4 Weeks', mentor: 'Senior Dev' },
    { title: 'AI Chatbot', tech: 'Python + NLP', duration: '4 Weeks', mentor: 'ML Engineer' },
    { title: 'Cloud Migration Project', tech: 'AWS/Azure', duration: '3 Weeks', mentor: 'Cloud Architect' },
    { title: 'Mobile App - Fitness Tracker', tech: 'React Native', duration: '4 Weeks', mentor: 'Mobile Lead' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setToast({ message: `Application submitted for ${form.type}! We'll contact you soon.`, type: 'success' });
      setForm({ name: '', email: '', phone: '', type: 'job', message: '' });
    }
  };

  const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

  const tabItems = [
    { key: 'jobs', label: '💼 Jobs', count: jobs.length },
    { key: 'internships', label: '🎓 Internships', count: internships.length },
    { key: 'projects', label: '🛠 Project Training', count: projectTraining.length },
  ];

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Career & Opportunities</h1>
          <p>Explore jobs, internships, and project training programs</p>
        </motion.div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
            {tabItems.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-outline'}`}
                style={{ borderRadius: 50 }}>
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {activeTab === 'jobs' && (
            <div className="grid-2">
              {jobs.map((job, i) => (
                <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.08 }} style={{ cursor: 'pointer' }}>
                  <div className="card-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{job.title}</h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                          <span className="badge badge-primary">{job.type}</span>
                          <span className="badge badge-success">{job.location}</span>
                          <span className="badge badge-warning">{job.dept}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => { setForm({ ...form, type: 'job', message: `Applying for: ${job.title}` }); setActiveTab('jobs'); }} className="btn btn-primary btn-sm">Apply Now</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'internships' && (
            <div className="grid-2">
              {internships.map((item, i) => (
                <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <div className="card-body">
                    <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                      <span className="badge badge-primary">📅 {item.duration}</span>
                      <span className="badge badge-success">💰 {item.stipend}</span>
                      <span className="badge badge-warning">🎯 {item.spots} spots</span>
                    </div>
                    <button onClick={() => { setForm({ ...form, type: 'internship', message: `Applying for: ${item.title}` }); }} className="btn btn-primary btn-sm">Apply</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="grid-2">
              {projectTraining.map((item, i) => (
                <motion.div key={i} className="card" {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <div className="card-body">
                    <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                      <span className="badge badge-primary">🛠 {item.tech}</span>
                      <span className="badge badge-success">⏱ {item.duration}</span>
                      <span className="badge badge-warning">👨‍🏫 {item.mentor}</span>
                    </div>
                    <button onClick={() => { setForm({ ...form, type: 'project', message: `Interested in: ${item.title}` }); }} className="btn btn-primary btn-sm">Enroll</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section-gradient">
        <div className="container">
          <div className="grid-2" style={{ gap: 40, alignItems: 'flex-start' }}>
            <motion.div {...fadeUp}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 16, color: 'white' }}>Why Join EduVance Pro?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '📈', title: 'Career Growth', desc: 'Fast-track your career with hands-on experience' },
                  { icon: '🤝', title: 'Mentorship', desc: 'Learn from industry experts with 10+ years experience' },
                  { icon: '🌍', title: 'Global Exposure', desc: 'Work on projects with teams worldwide' },
                  { icon: '🏆', title: 'Certification', desc: 'Get certified and boost your resume' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                    <div>
                      <h4 style={{ fontWeight: 600, color: 'white' }}>{item.title}</h4>
                      <p style={{ fontSize: 13, opacity: 0.7, color: 'white' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="card" style={{ padding: 32 }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 20 }}>Apply Now</h3>
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
                    <label>I'm interested in</label>
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="job">Full-Time Job</option>
                      <option value="internship">Internship</option>
                      <option value="project">Project Training</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message / Cover Letter</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about yourself..." />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Submit Application →</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
