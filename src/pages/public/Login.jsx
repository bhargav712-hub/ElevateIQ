import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import Toast from '../../components/common/Toast';
import { FiBookOpen, FiAward, FiBriefcase, FiSliders } from 'react-icons/fi';

const roles = [
  { id: 'student', label: 'Student', icon: FiAward, color: 'var(--primary)', selectedBg: 'rgba(37, 99, 235, 0.15)', email: 'student@test.com', desc: 'Access courses, tests, assignments & more' },
  { id: 'trainer', label: 'Trainer', icon: FiBookOpen, color: 'var(--secondary)', selectedBg: 'rgba(6, 182, 212, 0.15)', email: 'trainer@test.com', desc: 'Manage courses, classes & student progress' },
  { id: 'employee', label: 'Employee', icon: FiBriefcase, color: 'var(--accent)', selectedBg: 'rgba(244, 63, 94, 0.15)', email: 'employee@test.com', desc: 'Clock in/out, leaves, tickets & meetings' },
  { id: 'admin', label: 'Admin', icon: FiSliders, color: 'var(--warning)', selectedBg: 'rgba(245, 158, 11, 0.15)', email: 'admin@test.com', desc: 'Full platform management & analytics' },
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
  const CurrentRoleIcon = currentRole?.icon;

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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: 480,
          width: '100%',
          padding: 36,
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
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 6 }}>
            <img src="/logo.png" alt="ElevateIQ" style={{ height: 40, width: 'auto' }} />
          </Link>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Select your role to sign in</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {roles.map(role => {
            const RoleIcon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => selectRole(role.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                  borderRadius: 12, border: isSelected ? `2px solid ${role.color}` : '2px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? role.selectedBg : 'transparent',
                  cursor: 'pointer', transition: 'var(--transition)', textAlign: 'left',
                  color: 'white'
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              >
                <span style={{ display: 'inline-flex', fontSize: '1.4rem', color: isSelected ? role.color : 'var(--gray-400)' }}><RoleIcon /></span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? role.color : 'white' }}>
                    {role.label}
                  </div>
                  <div style={{ fontSize: 11, color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--gray-400)', opacity: 0.8 }}>
                    {role.desc.split(',')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)', borderRadius: 12, padding: 16, marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {CurrentRoleIcon && (
              <span style={{ display: 'inline-flex', fontSize: '2rem', color: currentRole?.color }}>
                <CurrentRoleIcon />
              </span>
            )}
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: currentRole?.color }}>{currentRole?.label} Portal</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{currentRole?.desc}</div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Email</label>
            <input
              type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={errors.email ? 'error' : ''}
              placeholder="you@example.com"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label style={{ color: 'var(--gray-300)' }}>Password</label>
            <input
              type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className={errors.password ? 'error' : ''}
              placeholder="••••••••"
              style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white' }}
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

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 12, color: 'var(--gray-400)' }}>
          <p style={{ fontWeight: 600, marginBottom: 8, fontSize: 13, color: 'white' }}>🔑 Demo Quick Login</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {roles.map(role => {
              const RoleIcon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => selectRole(role.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? role.selectedBg : 'rgba(255, 255, 255, 0.03)',
                    cursor: 'pointer', fontSize: 11, color: isSelected ? role.color : 'var(--gray-300)', transition: 'var(--transition)'
                  }}
                >
                  <span style={{ display: 'inline-flex' }}><RoleIcon /></span>
                  {role.label}
                </button>
              );
            })}
          </div>
          <p style={{ marginTop: 8, fontSize: 11, color: 'var(--gray-500)' }}>
            Password for all: <strong style={{ color: 'white' }}>test123</strong>
          </p>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 16 }}>
          <Link to="/register" style={{ color: 'var(--primary-light)', fontSize: 14, fontWeight: 600 }}>
            Don't have an account? Register →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
