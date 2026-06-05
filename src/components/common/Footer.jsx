import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiZap } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', color: 'rgba(255,255,255,0.6)', padding: '60px 0 30px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <div className="grid-4" style={{ gap: 40 }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '-0.5px', fontWeight: 800 }}>
              <img src="/logo.png" alt="ElevateIQ" style={{ height: 32, width: 'auto' }} />
            </h3>
            <p style={{ lineHeight: 1.8, fontSize: 14 }}>Empowering tomorrow's leaders with world-class online education and career development programs.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: '1.1rem', fontWeight: 700 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses" className="footer-link">Courses</Link>
              <Link to="/placements" className="footer-link">Placements</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: '1.1rem', fontWeight: 700 }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses" className="footer-link">Full Stack Dev</Link>
              <Link to="/courses" className="footer-link">Data Science</Link>
              <Link to="/courses" className="footer-link">Cloud Architecture</Link>
              <Link to="/courses" className="footer-link">Cybersecurity</Link>
              <Link to="/courses" className="footer-link">UI/UX Design</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: '1.1rem', fontWeight: 700 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiMail style={{ color: 'var(--primary-light)' }} /> info@elevateiq.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiPhone style={{ color: 'var(--primary-light)' }} /> +1 (555) 123-4567</span>
              <span style={{ display: 'flex', alignItems: 'start', gap: 8 }}><FiMapPin style={{ color: 'var(--primary-light)', marginTop: 4, flexShrink: 0 }} /> 123 Innovation Drive, Tech City</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 40, paddingTop: 30, textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          &copy; {new Date().getFullYear()} EduVance Pro. All rights reserved.
        </div>
      </div>
      <style>{`
        .footer-link { transition: var(--transition); }
        .footer-link:hover { color: white; }
      `}</style>
    </footer>
  );
}
