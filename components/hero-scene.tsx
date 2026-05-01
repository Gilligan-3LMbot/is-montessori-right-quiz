export function HeroScene() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-[#f8f2e7] p-4 shadow-[0_24px_80px_rgba(36,63,57,0.16)]">
      <div className="absolute inset-x-6 top-4 h-24 rounded-full bg-[#d7b06b]/30 blur-3xl" />
      <svg
        viewBox="0 0 520 420"
        className="relative h-auto w-full"
        role="img"
        aria-label="Illustrated Montessori-inspired learning scene"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbf6ec" />
            <stop offset="100%" stopColor="#efe4cf" />
          </linearGradient>
          <linearGradient id="table" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d5f55" />
            <stop offset="100%" stopColor="#243f39" />
          </linearGradient>
          <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d7b06b" />
            <stop offset="100%" stopColor="#bb9657" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="520" height="420" rx="32" fill="url(#bg)" />
        <ellipse cx="120" cy="88" rx="92" ry="44" fill="#f4ead4" />
        <ellipse cx="394" cy="68" rx="72" ry="34" fill="#f1e3c1" />
        <ellipse cx="264" cy="378" rx="214" ry="20" fill="#dbc8a1" opacity="0.45" />

        <rect x="70" y="128" width="144" height="148" rx="18" fill="#eedfbe" stroke="#ddc695" />
        <rect x="88" y="148" width="108" height="18" rx="9" fill="#dcb362" opacity="0.65" />
        <rect x="88" y="184" width="94" height="14" rx="7" fill="#9ab18a" opacity="0.9" />
        <rect x="88" y="208" width="80" height="14" rx="7" fill="#7f9e7e" opacity="0.85" />
        <rect x="88" y="232" width="66" height="14" rx="7" fill="#d8b15b" opacity="0.85" />

        <rect x="224" y="218" width="214" height="28" rx="14" fill="url(#table)" />
        <rect x="244" y="236" width="18" height="98" rx="9" fill="#184036" />
        <rect x="402" y="236" width="18" height="98" rx="9" fill="#184036" />

        <ellipse cx="338" cy="170" rx="44" ry="50" fill="#f3c9a5" />
        <path d="M296 162c8-38 70-45 84 2-12 14-33 20-56 20-12 0-21-2-28-6z" fill="#23463f" />
        <rect x="323" y="210" width="34" height="58" rx="17" fill="#c78f64" />
        <path d="M278 262c14-28 46-43 80-41 28 1 52 12 68 33l-26 16c-9-14-23-22-44-22-18 0-32 7-42 22z" fill="#d2aa58" />
        <rect x="292" y="282" width="26" height="72" rx="13" fill="#c78f64" />
        <rect x="352" y="282" width="26" height="72" rx="13" fill="#c78f64" />
        <path d="M290 264l-58-22c-12-4-21 11-12 20l60 54 18-24z" fill="#6c8e67" />
        <path d="M400 262l42 10c10 2 13 16 4 22l-52 38-16-22z" fill="#d8b15b" />

        <rect x="286" y="182" width="96" height="24" rx="12" fill="#f8f1e2" stroke="#ddc695" />
        <circle cx="312" cy="194" r="8" fill="#6c8e67" />
        <circle cx="336" cy="194" r="8" fill="#d8b15b" />
        <circle cx="360" cy="194" r="8" fill="#b97c5d" />

        <path d="M420 110c18-14 46-10 58 9" stroke="#6b8b64" strokeWidth="10" strokeLinecap="round" fill="none" />
        <path d="M430 126c16-11 40-8 50 8" stroke="#88a37b" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="448" cy="146" r="8" fill="#d8b15b" />

        <circle cx="116" cy="94" r="14" fill="url(#accent)" opacity="0.9" />
        <circle cx="154" cy="86" r="8" fill="#6c8e67" opacity="0.9" />
        <circle cx="186" cy="106" r="10" fill="#b97c5d" opacity="0.7" />
      </svg>
    </div>
  );
}
