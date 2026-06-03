import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import Logo from '../../components/common/Logo';

export default function Register() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      padding: 20
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ maxWidth: 460, width: '100%', padding: 40, textAlign: 'center' }}
      >
        <Logo style={{ color: 'var(--primary)', justifyContent: 'center', marginBottom: 20 }} />

        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <FiAlertCircle size={28} color="#f59e0b" />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>Registration Closed</h2>
        <p style={{ color: 'var(--gray-500)', fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          New account registrations are currently restricted.
          <br />
          Only students already enrolled in a course can access the platform.
        </p>

        <div style={{
          background: 'var(--gray-50)', borderRadius: 8, padding: 16,
          border: '1px solid var(--gray-200)', marginBottom: 24
        }}>
          <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6 }}>
            <strong>Already enrolled?</strong> Use the credentials provided by your trainer or institution.
            <br /><br />
            <strong>New student?</strong> Contact your course administrator or training coordinator to get your account set up.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Link to="/login" className="btn btn-primary btn-lg btn-block">
            <FiArrowLeft size={16} /> Back to Login
          </Link>
          <Link to="/contact" className="btn btn-outline btn-block">
            <FiMail size={16} /> Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
