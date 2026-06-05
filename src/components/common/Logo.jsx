import { Link } from 'react-router-dom';

export default function Logo({ size = 'default', showText = true, style = {} }) {
  const sizes = {
    small: { icon: 24, text: '1rem', gap: 8 },
    default: { icon: 32, text: '1.25rem', gap: 10 },
    large: { icon: 40, text: '1.6rem', gap: 12 },
  };
  const s = sizes[size] || sizes.default;

  return (
    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: s.gap, ...style }}>
      <svg width={s.icon} height={s.icon} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="url(#logoGrad)" />
        <path d="M20 8L28 14V22L20 28L12 22V14L20 8Z" fill="white" fillOpacity="0.9" />
        <path d="M20 16L24 19V24L20 27L16 24V19L20 16Z" fill="white" />
        <circle cx="20" cy="20" r="2" fill="var(--primary)" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span style={{ fontWeight: 800, fontSize: s.text, letterSpacing: '-0.02em', color: 'inherit' }}>
          EduVance
        </span>
      )}
    </Link>
  );
}
