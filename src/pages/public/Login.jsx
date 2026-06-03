import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiLogIn, FiUser, FiShield, FiBookOpen, FiBriefcase, FiMail, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { FaChalkboardTeacher, FaUserGraduate, FaUserTie, FaUserCog } from 'react-icons/fa';
import Toast from '../../components/common/Toast';
import Logo from '../../components/common/Logo';

const roles = [
  { id: 'student', label: 'Student', icon: FaUserGraduate, color: '#2563eb', email: 'student@test.com', desc: 'Courses, tests, assignments & progress' },
  { id: 'trainer', label: 'Trainer', icon: FaChalkboardTeacher, color: '#0d9488', email: 'trainer@test.com', desc: 'Manage classes, tests & student progress' },
  { id: 'employee', label: 'Employee', icon: FaUserTie, color: '#f59e0b', email: 'employee@test.com', desc: 'Attendance, leaves, tickets & meetings' },
  { id: 'admin', label: 'Admin', icon: FaUserCog, color: '#ef4444', email: 'admin@test.com', desc: 'Full platform management & analytics' },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [form, setForm] = useState({ email: 'student@test.com', password: 'test123' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const role = roles.find(r => r.id === selectedRole);
    setForm({ email: role.email, password: 'test123' });
    setErrors({});
  }, [selectedRole]);

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
        setToast({ message: `Welcome back, ${user.name}!`, type: 'success' });
        setTimeout(() => navigate(`/${user.role}-dashboard`), 800);
      } catch {
        setToast({ message: 'Invalid email or password. Try a demo account.', type: 'error' });
      }
    }
  };

  const currentRole = roles.find(r => r.id === selectedRole);
  const RoleIcon = currentRole?.icon;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: 20, position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(37,99,235,0.06)', top: '-150px', right: '-150px' }} />
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(13,148,136,0.05)', bottom: '-100px', left: '-100px' }} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card"
        style={{ maxWidth: 460, width: '100%', padding: 32, position: 'relative', zIndex: 1, border: '1px solid var(--gray-200)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Logo style={{ color: 'var(--primary)', justifyContent: 'center', marginBottom: 12 }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Welcome Back</h2>
          <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Select your role to sign in</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {roles.map(role => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px',
                  borderRadius: 8, border: isSelected ? `2px solid ${role.color}` : '2px solid var(--gray-200)',
                  background: isSelected ? `${role.color}0d` : 'transparent',
                  cursor: 'pointer', transition: 'var(--transition)', textAlign: 'left',
                }}
              >
                <Icon size={18} color={isSelected ? role.color : 'var(--gray-400)'} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? role.color : 'var(--gray-600)' }}>
                    {role.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{
          background: `${currentRole?.color}06`, borderRadius: 8, padding: '10px 14px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${currentRole?.color}20`
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `${currentRole?.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {RoleIcon && <RoleIcon size={18} color={currentRole?.color} />}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: currentRole?.color }}>{currentRole?.label} Portal</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>{currentRole?.desc}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <div style={{ position: 'relative' }}>
              <FiMail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', zIndex: 1 }} />
              <input type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={errors.email ? 'error' : ''}
                placeholder="you@example.com"
                style={{ paddingLeft: 36, background: 'var(--gray-50)' }}
              />
            </div>
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)', zIndex: 1 }} />
              <input type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={errors.password ? 'error' : ''}
                placeholder="••••••••"
                style={{ paddingLeft: 36, background: 'var(--gray-50)' }}
              />
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> Signing in...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <FiLogIn size={16} /> Sign in as {currentRole?.label}
              </span>
            )}
          </button>
        </form>

        <div style={{ marginTop: 20, padding: '14px', background: 'var(--gray-50)', borderRadius: 8, border: '1px solid var(--gray-200)' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 8, textAlign: 'center' }}>
            <FiAlertCircle size={12} style={{ marginRight: 4 }} /> Demo Accounts
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {roles.map(role => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button key={role.id} onClick={() => setSelectedRole(role.id)}
                  style={{
                    padding: '4px 10px', borderRadius: 6, border: `1px solid ${isSelected ? role.color : 'var(--gray-200)'}`,
                    background: isSelected ? `${role.color}10` : 'white',
                    cursor: 'pointer', fontSize: 11, color: isSelected ? role.color : 'var(--gray-500)',
                    display: 'flex', alignItems: 'center', gap: 4, transition: 'var(--transition)'
                  }}
                >
                  <Icon size={12} /> {role.label}
                </button>
              );
            })}
          </div>
          <p style={{ marginTop: 6, fontSize: 11, color: 'var(--gray-400)', textAlign: 'center' }}>
            Password: <strong>test123</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
