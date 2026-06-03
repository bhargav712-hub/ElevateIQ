export default function StudentCertificates() {
  const certificates = [
    { id: 1, title: 'Full Stack Web Development', issued: '2026-04-15', id_no: 'EDU-FSD-2026-001', completed: true },
    { id: 2, title: 'JavaScript Mastery', issued: '2026-03-20', id_no: 'EDU-JS-2026-042', completed: true },
  ];

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>🏆 Certificates</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Download your course completion certificates</p>

      <div className="grid-2">
        {certificates.map(cert => (
          <div key={cert.id} className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 16 }}>🏆</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{cert.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 4 }}>Certificate ID: {cert.id_no}</p>
              <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>Issued: {cert.issued}</p>
              <button className="btn btn-primary">⬇ Download Certificate</button>
            </div>
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <div className="icon">📜</div>
            <h3>No certificates yet</h3>
            <p>Complete your courses to earn certificates</p>
          </div>
        )}
      </div>
    </div>
  );
}
