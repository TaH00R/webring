import Image from "next/image";
import type { ReactNode } from "react";

import type { LeaderboardEntry } from "@/hooks/useLeaderboard";

interface LeaderboardPanelProps {
  title: string;
  icon: ReactNode;
  entries: LeaderboardEntry[];
  unit: string;
  accent: string;
  loading: boolean;
}

const MEDALS = ["#FFD54A", "#C9D3E0", "#D98A4B"];

export default function LeaderboardPanel({
  title,
  icon,
  entries,
  unit,
  accent,
  loading,
}: LeaderboardPanelProps) {
  return (
    <div className="min-w-0 flex-1 border border-[#2B3A52] bg-[#1A2233]/60 backdrop-blur-sm">
      <div
        className="flex items-center gap-2 border-b border-[#2B3A52] px-5 py-4"
        style={{ boxShadow: `inset 0 2px 0 ${accent}` }}
      >
        <span style={{ color: accent }}>{icon}</span>
        <h3 className="font-mono text-lg font-bold text-[#F1F5FF]">{title}</h3>
        <span className="ml-auto font-mono text-xs text-[#6E7F9E]">
          last 7 days
        </span>
      </div>

      <div className="divide-y divide-[#2B3A52]">
        {loading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3">
              <div className="size-5 shrink-0 animate-pulse rounded bg-[#233046]" />
              <div className="size-8 shrink-0 animate-pulse rounded-full bg-[#233046]" />
              <div className="h-4 w-32 animate-pulse rounded bg-[#233046]" />
            </div>
          ))}

        {!loading && entries.length === 0 && (
          <p className="px-5 py-8 text-center font-mono text-sm text-[#6E7F9E]">
            No activity yet this week.
          </p>
        )}

        {!loading &&
          entries.slice(0, 10).map((entry, index) => (
            <a
              key={entry.github}
              href={entry.portfolio || `https://github.com/${entry.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 transition-colors duration-150 hover:bg-[#20304a]"
            >
              <span
                className="w-5 shrink-0 text-center font-mono text-sm font-bold"
                style={{ color: MEDALS[index] ?? "#6E7F9E" }}
              >
                {index + 1}
              </span>

              <Image
                src={`https://github.com/${entry.github}.png`}
                alt={entry.name}
                width={32}
                height={32}
                unoptimized
                className="size-8 shrink-0 rounded-full border border-[#2B3A52] object-cover"
              />

              <span className="min-w-0 flex-1 truncate font-mono text-sm text-[#F1F5FF]">
                {entry.name}
              </span>

              <span
                className="shrink-0 font-mono text-xs font-semibold"
                style={{ color: accent }}
              >
                {entry.count} {unit}
              </span>
            </a>
          ))}
      </div>
    </div>
  );
}
