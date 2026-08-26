"use client";

import { useEffect, useState } from "react";

export interface LeaderboardEntry {
  name: string;
  github: string;
  portfolio?: string;
  count: number;
}

interface LeaderboardData {
  github: LeaderboardEntry[];
  leetcode: LeaderboardEntry[];
  updatedAt: string;
}

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/leaderboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
