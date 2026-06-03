export default function StudentExamSlots() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>📅 Exam Slot Booking</h1>
      <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>Book your exam slots for module assessments</p>
      <div className="card" style={{ padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>📅</div>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Exam slots are managed through Tests & Exams</h3>
        <p style={{ color: 'var(--gray-500)', fontSize: 14 }}>Navigate to Tests & Exams section to view and book available slots.</p>
      </div>
    </div>
  );
}
