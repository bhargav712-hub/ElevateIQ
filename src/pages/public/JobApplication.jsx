import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign, FiSend, FiCheck, FiUsers, FiStar, FiTrendingUp } from 'react-icons/fi';
import Toast from '../../components/common/Toast';

const jobListings = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp', location: 'Remote', type: 'Full-Time', salary: '$120K - $150K', posted: '2 days ago', tags: ['React', 'Node.js', 'TypeScript'], logo: 'T' },
  { id: 2, title: 'Data Scientist', company: 'DataFlow Inc', location: 'San Francisco, CA', type: 'Full-Time', salary: '$130K - $160K', posted: '1 week ago', tags: ['Python', 'TensorFlow', 'SQL'], logo: 'D' },
  { id: 3, title: 'Cloud Engineer', company: 'CloudBase', location: 'Seattle, WA', type: 'Contract', salary: '$110K - $140K', posted: '3 days ago', tags: ['AWS', 'Kubernetes', 'Terraform'], logo: 'C' },
  { id: 4, title: 'UI/UX Designer', company: 'DesignLab', location: 'Remote', type: 'Full-Time', salary: '$90K - $120K', posted: '5 days ago', tags: ['Figma', 'Prototyping', 'Design Systems'], logo: 'D' },
  { id: 5, title: 'Frontend Developer Intern', company: 'StartupXYZ', location: 'Hybrid', type: 'Internship', salary: '$3K/mo', posted: '1 day ago', tags: ['React', 'CSS', 'JavaScript'], logo: 'S' },
  { id: 6, title: 'DevOps Engineer', company: 'InfraPro', location: 'Austin, TX', type: 'Full-Time', salary: '$125K - $155K', posted: '1 week ago', tags: ['Docker', 'CI/CD', 'Linux'], logo: 'I' },
];

const stats = [
  { icon: FiBriefcase, value: '150+', label: 'Job Openings' },
  { icon: FiUsers, value: '500+', label: 'Hiring Partners' },
  { icon: FiStar, value: '92%', label: 'Placement Rate' },
  { icon: FiTrendingUp, value: '$110K', label: 'Avg Salary' },
];

export default function JobApplication() {
  const [toast, setToast] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', resume: '', coverLetter: '' });
  const [errors, setErrors] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);

  const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

  const openApply = (job) => {
    setSelectedJob(job);
    setErrors({});
    setForm({ name: '', email: '', phone: '', resume: '', coverLetter: '' });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setAppliedJobs([...appliedJobs, selectedJob.id]);
      setToast({ message: `Applied to ${selectedJob.title} at ${selectedJob.company}! We'll reach out soon.`, type: 'success' });
      setSelectedJob(null);
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-hero">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Job Openings</h1>
          <p>Find your dream role at top companies hiring our talent</p>
        </motion.div>
      </div>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          <div className="grid-4" style={{ marginBottom: 40 }}>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} className="stat-card" {...fadeUp} transition={{ delay: i * 0.08 }}>
                  <div className="stat-icon"><Icon size={24} /></div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </motion.div>
              );
            })}
          </div>

          <div className="grid-2">
            {jobListings.map((job, i) => {
              const Icon = job.icon;
              const applied = appliedJobs.includes(job.id);
              return (
                <motion.div key={job.id} className="card" {...fadeUp} transition={{ delay: i * 0.05 }}
                  style={{ cursor: applied ? 'default' : 'pointer' }}>
                  <div className="card-body">
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 800, fontSize: 18, flexShrink: 0
                      }}>{job.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h3 style={{ fontWeight: 700, fontSize: 15 }}>{job.title}</h3>
                            <p style={{ fontSize: 13, color: 'var(--gray-500)' }}>{job.company}</p>
                          </div>
                          <span className={`badge ${job.type === 'Full-Time' ? 'badge-primary' : job.type === 'Internship' ? 'badge-success' : 'badge-warning'}`}>
                            {job.type}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: 'var(--gray-500)', flexWrap: 'wrap' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiMapPin size={12} /> {job.location}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiDollarSign size={12} /> {job.salary}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={12} /> {job.posted}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                          {job.tags.map((tag, ti) => (
                            <span key={ti} className="badge badge-primary" style={{ fontSize: 11 }}>{tag}</span>
                          ))}
                        </div>
                        <div style={{ marginTop: 12 }}>
                          {applied ? (
                            <span className="btn btn-success btn-sm" style={{ pointerEvents: 'none' }}>
                              <FiCheck size={14} /> Applied
                            </span>
                          ) : (
                            <button className="btn btn-primary btn-sm" onClick={() => openApply(job)}>
                              Apply Now →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedJob && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'
        }} onClick={() => setSelectedJob(null)}>
          <div style={{
            background: 'white', borderRadius: 16, padding: 32, maxWidth: 520, width: '90%', maxHeight: '85vh', overflow: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Apply for {selectedJob.title}</h3>
              <button onClick={() => setSelectedJob(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--gray-400)' }}>&times;</button>
            </div>

            <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: 14, marginBottom: 20, border: '1px solid var(--gray-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{selectedJob.logo}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedJob.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{selectedJob.company} • {selectedJob.location}</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={errors.name ? 'error' : ''} placeholder="John Doe" />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={errors.email ? 'error' : ''} placeholder="john@example.com" />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={errors.phone ? 'error' : ''} placeholder="+1 555-000-0000" />
                {errors.phone && <div className="form-error">{errors.phone}</div>}
              </div>
              <div className="form-group">
                <label>Resume Link / Portfolio</label>
                <input value={form.resume} onChange={e => setForm({ ...form, resume: e.target.value })} placeholder="https://linkedin.com/in/yourprofile or upload link" />
              </div>
              <div className="form-group">
                <label>Cover Letter</label>
                <textarea value={form.coverLetter} onChange={e => setForm({ ...form, coverLetter: e.target.value })} rows={3} placeholder="Briefly tell us why you're a good fit..." />
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">
                <FiSend size={16} /> Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
