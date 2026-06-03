import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', phone: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be 6+ characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        await register(form);
        setToast({ message: 'Account created successfully!', type: 'success' });
        setTimeout(() => navigate(`/${form.role}-dashboard`), 500);
      } catch {
        setToast({ message: 'Registration failed. Try again.', type: 'error' });
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: 20 }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ maxWidth: 480, width: '100%', padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Link to="/" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: 8 }}>⚡ EduVance Pro</Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Create Account</h2>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={errors.name ? 'error' : ''} placeholder="John Doe" />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={errors.email ? 'error' : ''} placeholder="you@example.com" />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555-000-0000" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={errors.password ? 'error' : ''} placeholder="Minimum 6 characters" />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label>I want to join as</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="student">🎓 Student</option>
              <option value="trainer">👩‍🏫 Trainer</option>
              <option value="employee">👨‍💼 Employee</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Create Account →</button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link to="/login" style={{ color: 'var(--primary)', fontSize: 14 }}>Already have an account? Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}
