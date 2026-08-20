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
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
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
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => !cancelled && setStats(data))
      .catch(() => !cancelled && setStats(null))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { stats, loading };
}