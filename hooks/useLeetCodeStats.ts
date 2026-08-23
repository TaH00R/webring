"use client";

import { useEffect, useState } from "react";

export interface LeetCodeStats {
  solved: number;
  total: number;
  attempting: number;
  easy: number;
  medium: number;
  hard: number;
}

export function useLeetCodeStats(username?: string) {
  const [stats, setStats] = useState<LeetCodeStats | null>(
    null
  );

  const [loading, setLoading] = useState(!!username);

  useEffect(() => {
    if (!username) {
      setStats(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);

    fetch(`/api/leetcode/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch LeetCode stats");
        }

        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        setStats({
          solved: data.solved,
          total: data.total,
          attempting: data.attempting,
          easy: data.easy,
          medium: data.medium,
          hard: data.hard,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setStats(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return {
    stats,
    loading,
  };
}