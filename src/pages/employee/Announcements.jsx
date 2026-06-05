export default function EmployeeAnnouncements() {
  const announcements = [
    { title: '🔴 Office Holiday on June 15', date: 'June 2, 2026', author: 'Admin', content: 'The office will remain closed on June 15th in observance of the national holiday.', priority: 'high' },
    { title: '🔵 New Placement Drive - Google', date: 'June 1, 2026', author: 'Placement Team', content: 'Google is hiring! Refer eligible students with 85%+ marks. Deadline: June 10.', priority: 'high' },
    { title: '🟢 Team Outing This Friday', date: 'May 30, 2026', author: 'HR', content: 'Team outing to Adventure Park this Friday. Please confirm participation by Wednesday.', priority: 'low' },
    { title: '🔵 Quarterly Review Meeting', date: 'May 28, 2026', author: 'Management', content: 'Quarterly performance review on June 5th at 10 AM in the Board Room. All employees must attend.', priority: 'medium' },
    { title: '🟢 New Training Modules Available', date: 'May 25, 2026', author: 'Academics', content: 'New training modules on React 19 and TypeScript are now available in the learning portal.', priority: 'low' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📢 Announcements</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Company updates and announcements</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {announcements.map((ann, i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700, fontSize: 15 }}>{ann.title}</h3>
                {ann.priority === 'high' && <span className="badge badge-danger">🔴 High Priority</span>}
                {ann.priority === 'medium' && <span className="badge badge-warning">🔵 Medium</span>}
                {ann.priority === 'low' && <span className="badge badge-primary">🟢 Info</span>}
              </div>
              <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 8, lineHeight: 1.6 }}>{ann.content}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: 'var(--gray-400)' }}>
                <span>👤 {ann.author}</span>
                <span>📅 {ann.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
