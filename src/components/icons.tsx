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

export function IconGoogle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
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
