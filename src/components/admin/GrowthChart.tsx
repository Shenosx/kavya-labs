"use client";

import { useMemo, useState } from "react";
import type { DateRangeKey } from "@/lib/admin-data";
import { getGrowthData } from "@/lib/admin-data";

type GrowthChartProps = {
  range?: DateRangeKey;
  title?: string;
  subtitle?: string;
};

export function GrowthChart({
  range = "30d",
  title = "User growth",
  subtitle = "New users over the last 30 days",
}: GrowthChartProps) {
  const data = useMemo(() => getGrowthData(range), [range]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const width = 640;
  const height = 220;
  const padding = { top: 20, right: 16, bottom: 36, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - (d.value / maxValue) * chartH;
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padding.left} ${padding.top + chartH} L ${points[0]?.x ?? padding.left} ${padding.top + chartH} Z`;

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <section
      className="rounded-xl border border-border bg-surface-elevated/30 p-5 sm:p-6"
      aria-labelledby="growth-chart-title"
    >
      <div className="mb-6">
        <h2 id="growth-chart-title" className="text-base font-semibold text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto min-w-[320px] w-full"
          role="img"
          aria-label={`Line chart showing user growth across ${data.length} days`}
        >
          {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
            const y = padding.top + chartH - tick * chartH;
            return (
              <g key={tick}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#9aa0ae"
                  fontSize="10"
                >
                  {Math.round(maxValue * tick)}
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="rgba(124,108,240,0.12)" />
          <path
            d={linePath}
            fill="none"
            stroke="#7c6cf0"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r={hoverIndex === i ? 5 : 3}
                fill={hoverIndex === i ? "#7c6cf0" : "#f4f5f7"}
                className="transition-all duration-150"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
                onFocus={() => setHoverIndex(i)}
                onBlur={() => setHoverIndex(null)}
                tabIndex={0}
                role="presentation"
              />
            </g>
          ))}

          {points
            .filter((_, i) => i % Math.ceil(data.length / 6) === 0 || i === data.length - 1)
            .map((p, i) => (
              <text
                key={i}
                x={p.x}
                y={height - 10}
                textAnchor="middle"
                fill="#9aa0ae"
                fontSize="10"
              >
                {p.label}
              </text>
            ))}

          {hovered && (
            <g>
              <rect
                x={hovered.x - 36}
                y={hovered.y - 36}
                width="72"
                height="28"
                rx="6"
                fill="#161922"
                stroke="rgba(255,255,255,0.1)"
              />
              <text
                x={hovered.x}
                y={hovered.y - 18}
                textAnchor="middle"
                fill="#f4f5f7"
                fontSize="11"
                fontWeight="600"
              >
                {hovered.value} users
              </text>
            </g>
          )}
        </svg>
      </div>
    </section>
  );
}
