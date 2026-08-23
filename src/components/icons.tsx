export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-border-strong"
      />
      <path
        d="M11 9v14"
        stroke="url(#logo-k-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 16l7.5-7"
        stroke="url(#logo-k-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 16l7.5 7"
        stroke="url(#logo-k-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="10" r="1.5" fill="#7c6cf0" className="animate-pulse-soft" />
      <defs>
        <linearGradient id="logo-k-gradient" x1="11" y1="9" x2="20" y2="23">
          <stop stopColor="#f4f5f7" />
          <stop offset="1" stopColor="#7c6cf0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function IconBrain({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3c-1.5 0-2.8.8-3.5 2C7.8 4.8 6.5 4 5 4 3.3 4 2 5.3 2 7c0 1 .5 1.9 1.2 2.5C2.5 10.2 2 11.1 2 12c0 1.8 1.3 3 3 3 .8 0 1.5-.3 2-.8.5 2 2.2 3.5 4.3 3.8-.1.4-.3.7-.3 1 0 1.1.9 2 2 2s2-.9 2-2c0-.3-.1-.6-.3-1 2.1-.3 3.8-1.8 4.3-3.8.5.5 1.2.8 2 .8 1.7 0 3-1.2 3-3 0-.9-.5-1.8-1.2-2.5.7-.6 1.2-1.5 1.2-2.5 0-1.7-1.3-3-3-3-1.5 0-2.8.8-3.5 2C14.8 3.8 13.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconScale({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 18h16M6 14l3-8 3 8M12 14l3-8 3 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 18v2M20 18v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconUsers({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 20c.5-2.2 2.3-4 4.5-4 1.5 0 2.8.7 3.7 1.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconZap({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2 4 14h7l-1 8 10-14h-7l1-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
