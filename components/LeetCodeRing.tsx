"use client";
import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

interface LeetCodeRingProps {
  username?: string;
}

const SIZE = 120;
const CENTER = SIZE / 2;
const RADIUS = 46;
const STROKE_WIDTH = 8;

const ARC_START = 135;
const ARC_TOTAL = 270;
const ARC_END = ARC_START + ARC_TOTAL;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) };
}

function arcPath(start: number, end: number, radius: number) {
  const p1 = polar(start, radius);
  const p2 = polar(end, radius);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${p1.x} ${p1.y} A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y}`;
}

function buildStops(easyPct: number, mediumPct: number) {
  const EPS = 3;
  const cum1 = easyPct;
  const cum2 = easyPct + mediumPct;

  const stops = [
    { offset: 0, color: "#00B8A3" },
    { offset: Math.max(cum1 - EPS, 0), color: "#00B8A3" },
    { offset: Math.min(cum1 + EPS, 100), color: "#FFA116" },
    { offset: Math.max(cum2 - EPS, Math.min(cum1 + EPS, 100)), color: "#FFA116" },
    { offset: Math.min(cum2 + EPS, 100), color: "#EF4747" },
    { offset: 100, color: "#EF4747" },
  ];

  for (let i = 1; i < stops.length; i++) {
    if (stops[i].offset < stops[i - 1].offset) stops[i].offset = stops[i - 1].offset;
  }
  return stops;
}

export default function LeetCodeRing({ username }: LeetCodeRingProps) {
  const { stats, loading } = useLeetCodeStats(username);

  if (!username || loading || !stats) return null;

  const { solved, total, attempting, easy, medium, hard } = stats;
  const solvedTotal = easy + medium + hard || 1;

  const easyPct = (easy / solvedTotal) * 100;
  const mediumPct = (medium / solvedTotal) * 100;

  const stops = buildStops(easyPct, mediumPct);
  const gradStart = polar(ARC_START, RADIUS);
  const gradEnd = polar(ARC_END, RADIUS);

  return (
    <div>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <defs>
          <linearGradient
            id="lc-ring-gradient"
            gradientUnits="userSpaceOnUse"
            x1={gradStart.x}
            y1={gradStart.y}
            x2={gradEnd.x}
            y2={gradEnd.y}
          >
            {stops.map((s, i) => (
              <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>

        <path
          d={arcPath(ARC_START, ARC_END, RADIUS)}
          fill="none"
          stroke="url(#lc-ring-gradient)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />

        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          className="font-mono font-bold fill-slate-100 text-[22px]"
        >
          {solved}
          <tspan className="font-medium fill-slate-400 text-xs">/{total}</tspan>
        </text>

        <text x={CENTER} y={CENTER + 14} textAnchor="middle" className="font-mono text-[10px]">
          <tspan className="fill-green-500">✓</tspan>{" "}
          <tspan className="fill-slate-400">Solved</tspan>
        </text>

        <text
          x={CENTER}
          y={SIZE - 8}
          textAnchor="middle"
          className="font-mono fill-slate-400 text-[9px]"
        >
          {attempting} Attempting
        </text>
      </svg>
    </div>
  );
}