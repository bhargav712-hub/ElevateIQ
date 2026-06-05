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
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-800) 100%)',
      padding: 20, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(37, 99, 235, 0.08)', top: '-100px', right: '-100px',
        filter: 'blur(50px)'
      }} />
      <div style={{
        position: 'absolute', width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(6, 182, 212, 0.08)', bottom: '-50px', left: '-50px',
        filter: 'blur(40px)'
      }} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 480,
          width: '100%',
          padding: 40,
          position: 'relative',
          zIndex: 1,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(37, 99, 235, 0.1)',
          borderRadius: 'var(--radius-lg)',
          color: 'white'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 8 }}>
            <img src="/logo.png" alt="ElevateIQ" style={{ height: 40, width: 'auto' }} />
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Create Account</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Full Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={errors.name ? 'error' : ''}
              placeholder="John Doe"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={errors.email ? 'error' : ''}
              placeholder="you@example.com"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Phone</label>
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="+1 555-000-0000"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
          </div>
          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className={errors.password ? 'error' : ''}
              placeholder="Minimum 6 characters"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>I want to join as</label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              style={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            >
              <option value="student">🎓 Student</option>
              <option value="trainer">👩‍🏫 Trainer</option>
              <option value="employee">👨‍💼 Employee</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Create Account →</button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 16 }}>
          <Link to="/login" style={{ color: 'var(--primary-light)', fontSize: 14, fontWeight: 600 }}>
            Already have an account? Sign in →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
