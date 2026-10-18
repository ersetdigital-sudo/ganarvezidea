const PATHS = {
  pln: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  pulsa: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  data: (
    <>
      <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19.5" r=".6" />
    </>
  ),
  bpjs: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
      <path d="M12 9v6M9 12h6" />
    </>
  ),
  pdam: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  wallet: (
    <>
      <path d="M3 7a2 2 0 0 1 2-2h13v4" />
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M16 13.5h2" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="m8 3 4 4 4-4" />
    </>
  ),
  car: (
    <>
      <path d="M5 16h14M4 16l1.5-5A2 2 0 0 1 7.4 9.5h9.2a2 2 0 0 1 1.9 1.5L20 16v3h-3v-2H7v2H4z" />
      <circle cx="7.5" cy="13.5" r=".5" />
      <circle cx="16.5" cy="13.5" r=".5" />
    </>
  ),
  id: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.6-1.5 1.7-2 3-2s2.4.5 3 2M14 10h4M14 13h3" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  pin: (
    <>
      <path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
};

export default function Icon({ name, className, style }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {PATHS[name]}
    </svg>
  );
}

export function ServiceIcon({ name, className = "" }) {
  return (
    <div className={`ico i-${name} ${className}`}>
      <Icon name={name} style={{ width: "52%", height: "52%" }} />
    </div>
  );
}
