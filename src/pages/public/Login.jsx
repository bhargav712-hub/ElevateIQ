import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';

const roles = [
  { id: 'student', label: 'Student', icon: '🎓', color: '#6c5ce7', email: 'student@test.com', desc: 'Access courses, tests, assignments & more' },
  { id: 'trainer', label: 'Trainer', icon: '👩‍🏫', color: '#00cec9', email: 'trainer@test.com', desc: 'Manage courses, classes & student progress' },
  { id: 'employee', label: 'Employee', icon: '👨‍💼', color: '#fd79a8', email: 'employee@test.com', desc: 'Clock in/out, leaves, tickets & meetings' },
  { id: 'admin', label: 'Admin', icon: '👩‍💻', color: '#fdcb6e', email: 'admin@test.com', desc: 'Full platform management & analytics' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [form, setForm] = useState({ email: 'student@test.com', password: 'test123' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const selectRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    setSelectedRole(roleId);
    setForm({ email: role.email, password: 'test123' });
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      try {
        const user = await login(form.email, form.password);
        setToast({ message: `Welcome back, ${user.name}! Redirecting to ${selectedRole} portal...`, type: 'success' });
        setTimeout(() => navigate(`/${user.role}-dashboard`), 800);
      } catch {
        setToast({ message: 'Invalid email or password. Try the demo accounts below.', type: 'error' });
      }
    }
  };

  const currentRole = roles.find(r => r.id === selectedRole);

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: 20, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(108,92,231,0.08)', top: '-100px', right: '-100px'
      }} />
      <div style={{
        position: 'absolute', width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(0,206,201,0.08)', bottom: '-50px', left: '-50px'
      }} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ maxWidth: 480, width: '100%', padding: 36, position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: 6 }}>⚡ EduVance Pro</Link>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Select your role to sign in</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {roles.map(role => (
            <button
              key={role.id}
              onClick={() => selectRole(role.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                borderRadius: 12, border: selectedRole === role.id ? `2px solid ${role.color}` : '2px solid var(--gray-200)',
                background: selectedRole === role.id ? `${role.color}15` : 'transparent',
                cursor: 'pointer', transition: 'var(--transition)', textAlign: 'left',
              }}
              onMouseEnter={e => { if (selectedRole !== role.id) e.target.style.borderColor = 'var(--gray-300)'; }}
              onMouseLeave={e => { if (selectedRole !== role.id) e.target.style.borderColor = 'var(--gray-200)'; }}
            >
              <span style={{ fontSize: '1.5rem' }}>{role.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: selectedRole === role.id ? role.color : 'var(--dark)' }}>
                  {role.label}
                </div>
                <div style={{ fontSize: 11, color: selectedRole === role.id ? role.color : 'var(--gray-400)', opacity: 0.8 }}>
                  {role.desc.split(',')[0]}
                </div>
              </div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'var(--gray-100)', borderRadius: 12, padding: 16, marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--gray-200)'
          }}>
            <span style={{ fontSize: '2rem' }}>{currentRole?.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: currentRole?.color }}>{currentRole?.label} Portal</div>
              <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{currentRole?.desc}</div>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={errors.email ? 'error' : ''}
              placeholder="you@example.com"
              style={{ background: 'var(--gray-100)' }}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className={errors.password ? 'error' : ''}
              placeholder="••••••••"
              style={{ background: 'var(--gray-100)' }}
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> Signing in...
              </span>
            ) : (
              <span>Sign in as {currentRole?.label} →</span>
            )}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: 'var(--gray-500)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 13 }}>🔑 Demo Quick Login</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {roles.map(role => (
              <button
                key={role.id}
                onClick={() => selectRole(role.id)}
                style={{
                  padding: '4px 10px', borderRadius: 6, border: '1px solid var(--gray-200)',
                  background: selectedRole === role.id ? `${role.color}15` : 'var(--gray-100)',
                  cursor: 'pointer', fontSize: 11, color: 'var(--gray-600)', transition: 'var(--transition)'
                }}
              >
                {role.icon} {role.label}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-400)' }}>
            Password for all: <strong>test123</strong>
          </p>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center', borderTop: '1px solid var(--gray-200)', paddingTop: 16 }}>
          <Link to="/register" style={{ color: 'var(--primary)', fontSize: 14, fontWeight: 600 }}>
            Don't have an account? Register →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
