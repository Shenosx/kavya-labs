export function HeroVisual() {
  const nodes = [
    { cx: 200, cy: 200, r: 6, primary: true, delay: "0s" },
    { cx: 80, cy: 280, r: 4, delay: "0.5s" },
    { cx: 320, cy: 120, r: 4, delay: "1s" },
    { cx: 120, cy: 320, r: 3.5, delay: "1.5s" },
    { cx: 280, cy: 160, r: 3.5, delay: "2s" },
    { cx: 160, cy: 80, r: 3, delay: "0.75s" },
    { cx: 340, cy: 280, r: 3, delay: "1.25s" },
    { cx: 60, cy: 160, r: 3, delay: "1.75s" },
    { cx: 240, cy: 340, r: 3, delay: "2.25s" },
  ];

  return (
    <div
      className="relative aspect-square w-full lg:ml-auto"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-2xl border border-border bg-surface/60 shadow-glow backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_0_80px_rgba(124,108,240,0.2)]" />

      <svg
        className="absolute inset-0 h-full w-full animate-float"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c6cf0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c6cf0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="400" y2="400">
            <stop stopColor="#7c6cf0" stopOpacity="0.6" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={40 + i * 40}
            y1="20"
            x2={40 + i * 40}
            y2="380"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="20"
            y1={40 + i * 40}
            x2="380"
            y2={40 + i * 40}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
          />
        ))}

        <path
          d="M80 280 Q160 180 200 200 T320 120"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
          className="animate-flow"
          fill="none"
        />
        <path
          d="M120 320 L200 200 L280 160"
          stroke="rgba(124,108,240,0.35)"
          strokeWidth="1"
          className="animate-signal"
          fill="none"
        />
        <path
          d="M160 80 L200 200 L340 280"
          stroke="rgba(124,108,240,0.25)"
          strokeWidth="1"
          className="animate-signal"
          style={{ animationDelay: "1s" }}
          fill="none"
        />
        <path
          d="M60 160 L200 200 L240 340"
          stroke="rgba(124,108,240,0.2)"
          strokeWidth="1"
          className="animate-signal"
          style={{ animationDelay: "2s" }}
          fill="none"
        />

        <rect
          x="48"
          y="48"
          width="72"
          height="72"
          rx="12"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          fill="rgba(124,108,240,0.06)"
          transform="rotate(-8 84 84)"
          className="animate-drift"
        />
        <rect
          x="280"
          y="260"
          width="56"
          height="56"
          rx="10"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          fill="rgba(99,179,237,0.05)"
          transform="rotate(12 308 288)"
          className="animate-drift-delay"
        />

        {nodes.map((node, i) => (
          <g key={i}>
            {node.primary && (
              <circle cx={node.cx} cy={node.cy} r="24" fill="url(#node-glow)" />
            )}
            <circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.primary ? "#7c6cf0" : "rgba(244,245,247,0.85)"}
              className={node.primary ? "animate-pulse-soft" : "animate-drift"}
              style={node.primary ? undefined : { animationDelay: node.delay }}
            />
          </g>
        ))}

        <g style={{ transformOrigin: "200px 200px" }} className="animate-rotate-slow">
          <circle
            cx="200"
            cy="200"
            r="48"
            stroke="rgba(124,108,240,0.25)"
            strokeWidth="1"
            strokeDasharray="4 8"
            fill="none"
          />
        </g>
      </svg>

      <div className="pointer-events-none absolute -right-2 top-8 h-16 w-16 rounded-full bg-accent/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-12 -left-4 h-20 w-20 rounded-full bg-[#6366f1]/10 blur-3xl" />
    </div>
  );
}
