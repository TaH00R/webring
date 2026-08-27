"use client";

import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import LeaderboardPanel from "@/components/LeaderboardPanel";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

export default function Leaderboard() {
  const { data, loading, error } = useLeaderboard();

  return (
    <div className="mt-10 animate-fade-in-up">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-mono text-2xl font-bold text-[#F1F5FF]">
            Weekly Leaderboard
          </h2>
          <p className="mt-1 font-mono text-sm text-[#9AA8C7]">
            Most active members over the last 7 days.
          </p>
        </div>

        {data && !loading && (
          <p className="font-mono text-xs text-[#6E7F9E]">
            Updated {timeAgo(data.updatedAt)}
          </p>
        )}
      </div>

      {error ? (
        <p className="border border-[#2B3A52] bg-[#1A2233] px-5 py-8 text-center font-mono text-sm text-[#6E7F9E]">
          Couldn&apos;t load the leaderboard right now. Try again later.
        </p>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <LeaderboardPanel
            title="GitHub"
            icon={<FaGithub size={20} />}
            entries={data?.github ?? []}
            unit="contributions"
            accent="#5B8CFF"
            loading={loading}
          />

          <LeaderboardPanel
            title="LeetCode"
            icon={<SiLeetcode size={20} />}
            entries={data?.leetcode ?? []}
            unit="solved"
            accent="#FFA116"
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
