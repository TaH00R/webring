import { NextResponse } from "next/server";

import members from "@/data/members.json";
import type { Member } from "@/types/member";

const REVALIDATE_SECONDS = 1800;

interface LeaderboardEntry {
  name: string;
  github: string;
  portfolio?: string;
  count: number;
}

function last7Dates(): Set<string> {
  const dates = new Set<string>();
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - i);
    dates.add(date.toISOString().split("T")[0]);
  }

  return dates;
}

async function getWeeklyGithubCount(
  username: string,
  week: Set<string>
): Promise<number> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: REVALIDATE_SECONDS } }
    );

    if (!res.ok) return 0;

    const data = await res.json();
    const contributions: { date: string; count: number }[] =
      data?.contributions ?? [];

    return contributions.reduce(
      (sum, day) => (week.has(day.date) ? sum + day.count : sum),
      0
    );
  } catch {
    return 0;
  }
}

const leetcodeCalendarQuery = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        submissionCalendar
      }
    }
  }
`;

async function getWeeklyLeetCodeCount(
  username: string,
  week: Set<string>
): Promise<number> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: leetcodeCalendarQuery,
        variables: { username },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) return 0;

    const result = await res.json();
    const raw = result?.data?.matchedUser?.userCalendar?.submissionCalendar;

    if (!raw) return 0;

    const calendar: Record<string, number> = JSON.parse(raw);
    let total = 0;

    for (const [timestamp, count] of Object.entries(calendar)) {
      const date = new Date(Number(timestamp) * 1000)
        .toISOString()
        .split("T")[0];

      if (week.has(date)) total += Number(count);
    }

    return total;
  } catch {
    return 0;
  }
}

export async function GET() {
  const allMembers = members as Member[];
  const week = last7Dates();

  const results = await Promise.all(
    allMembers.map(async (member) => {
      const [githubCount, leetcodeCount] = await Promise.all([
        getWeeklyGithubCount(member.github, week),
        member.leetcode
          ? getWeeklyLeetCodeCount(member.leetcode, week)
          : Promise.resolve(0),
      ]);

      return {
        name: member.name,
        github: member.github,
        portfolio: member.portfolio,
        githubCount,
        leetcodeCount,
        hasLeetcode: Boolean(member.leetcode),
      };
    })
  );

  const githubLeaderboard: LeaderboardEntry[] = results
    .filter((r) => r.githubCount > 0)
    .map((r) => ({
      name: r.name,
      github: r.github,
      portfolio: r.portfolio,
      count: r.githubCount,
    }))
    .sort((a, b) => b.count - a.count);

  const leetcodeLeaderboard: LeaderboardEntry[] = results
    .filter((r) => r.hasLeetcode && r.leetcodeCount > 0)
    .map((r) => ({
      name: r.name,
      github: r.github,
      portfolio: r.portfolio,
      count: r.leetcodeCount,
    }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    github: githubLeaderboard,
    leetcode: leetcodeLeaderboard,
    updatedAt: new Date().toISOString(),
  });
}
