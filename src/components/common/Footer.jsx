import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', color: 'rgba(255,255,255,0.7)', padding: '60px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <Logo style={{ color: 'white', marginBottom: 16 }} />
            <p style={{ lineHeight: 1.8, fontSize: 14, maxWidth: 320 }}>Empowering tomorrow's leaders with world-class online education and career development programs.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: 14 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses">Courses</Link>
              <Link to="/placements">Placements</Link>
              <Link to="/jobs">Jobs</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: 14 }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses">Full Stack Dev</Link>
              <Link to="/courses">Data Science</Link>
              <Link to="/courses">Cloud Architecture</Link>
              <Link to="/courses">Cybersecurity</Link>
              <Link to="/courses">UI/UX Design</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16, fontSize: 14 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiMail size={14} /> info@eduvance.com</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiPhone size={14} /> +1 (555) 123-4567</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiMapPin size={14} /> 123 Innovation Drive</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, textAlign: 'center', fontSize: 13 }}>
          &copy; 2026 EduVance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
