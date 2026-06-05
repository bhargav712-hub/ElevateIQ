export default function StudentCertificates() {
  const certificates = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issued: "2026-04-15",
      id_no: "EDU-FSD-2026-001",
      file: "public/courses/fullstack-certificate.jpg",
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      issued: "2026-03-20",
      id_no: "EDU-JS-2026-042",
      file: "public/courses/javascript-certificate.jpg",
    },
  ];

  const downloadCertificate = (file, title) => {
    const link = document.createElement("a");
    link.href = file;
    link.download = `${title}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: "1.8rem", fontWeight: 800 }}>
        🏆 Certificates
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="card"
            style={{
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src={cert.file}
                alt={cert.title}
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  marginBottom: "15px",
                }}
              />

              <h3>{cert.title}</h3>
              <p>
                <strong>Certificate ID:</strong> {cert.id_no}
              </p>
              <p>
                <strong>Issued:</strong> {cert.issued}
              </p>

              <button
                className="btn btn-primary"
                onClick={() =>
                  downloadCertificate(cert.file, cert.title)
                }
              >
                ⬇ Download Certificate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}