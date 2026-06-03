import { useState } from 'react';
import Toast from '../../components/common/Toast';

export default function AdminContent() {
  const [toast, setToast] = useState(null);

  const sections = [
    { id: 'hero', title: 'Hero Section', content: 'Tagline: Empowering Tomorrow\'s Leaders Today', status: 'published' },
    { id: 'about', title: 'About Us', content: 'Platform description and mission statement', status: 'published' },
    { id: 'stats', title: 'Achievements', content: '15K+ students, 92% placement, etc.', status: 'published' },
    { id: 'testimonials', title: 'Testimonials', content: 'Student success stories and reviews', status: 'draft' },
  ];

  return (
    <div className="animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🌐 Website Content</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Manage all public website content</p>

      <div className="grid-2">
        {sections.map((sec, i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700 }}>{sec.title}</h3>
                <span className={`badge ${sec.status === 'published' ? 'badge-success' : 'badge-warning'}`}>{sec.status}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 16 }}>{sec.content}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" onClick={() => setToast({ message: `Editing ${sec.title}...`, type: 'info' })}>Edit</button>
                <button className="btn btn-outline btn-sm" onClick={() => setToast({ message: `${sec.title} ${sec.status === 'published' ? 'unpublished' : 'published'}!`, type: 'success' })}>
                  {sec.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
