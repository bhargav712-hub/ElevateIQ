import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--gray-900)', color: 'rgba(255,255,255,0.7)', padding: '60px 0 30px' }}>
      <div className="container">
        <div className="grid-4" style={{ gap: 40 }}>
          <div>
            <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              ⚡ EduVance Pro
            </h3>
            <p style={{ lineHeight: 1.8, fontSize: 14 }}>Empowering tomorrow's leaders with world-class online education and career development programs.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses">Courses</Link>
              <Link to="/placements">Placements</Link>
              <Link to="/career">Career</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16 }}>Programs</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <Link to="/courses">Full Stack Dev</Link>
              <Link to="/courses">Data Science</Link>
              <Link to="/courses">Cloud Architecture</Link>
              <Link to="/courses">Cybersecurity</Link>
              <Link to="/courses">UI/UX Design</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', marginBottom: 16 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <span>📧 info@eduvancepro.com</span>
              <span>📞 +1 (555) 123-4567</span>
              <span>📍 123 Innovation Drive, Tech City</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 40, paddingTop: 30, textAlign: 'center', fontSize: 13 }}>
          &copy; 2026 EduVance Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
