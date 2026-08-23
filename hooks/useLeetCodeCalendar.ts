"use client";

import { useEffect, useState } from "react";

export interface LeetCodeDay {
  date: string;
  count: number;
}

export function useLeetCodeCalendar(
  username?: string
) {
  const [calendar, setCalendar] = useState<
    LeetCodeDay[]
  >([]);

  const [loading, setLoading] =
    useState(Boolean(username));

  useEffect(() => {
    if (!username) {
      setCalendar([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);

    fetch(`/api/leetcode/${username}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Failed to fetch LeetCode data"
          );
        }

        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setCalendar(data.calendar ?? []);
        }
      })
      .catch((error) => {
        console.error(
          "LeetCode calendar error:",
          error
        );

        if (!cancelled) {
          setCalendar([]);
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
    calendar,
    loading,
  };
}