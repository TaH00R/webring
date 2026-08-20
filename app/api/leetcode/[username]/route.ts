import { NextRequest, NextResponse } from "next/server";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const PROGRESS_QUERY = `
  query userProfileUserQuestionProgressV2($userSlug: String!) {
    userProfileUserQuestionProgressV2(userSlug: $userSlug) {
      numAcceptedQuestions { difficulty count }
      numFailedQuestions { difficulty count }
      numUntouchedQuestions { difficulty count }
    }
  }
`;

const ALL_QUESTIONS_QUERY = `
  query allQuestionsCount {
    allQuestionsCount { difficulty count }
  }
`;

async function queryLeetCode(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(LEETCODE_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }, // cache 1hr, avoid hammering LeetCode
  });
  if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`);
  return res.json();
}

const sum = (entries: { count: number }[] = []) =>
  entries.reduce((t, e) => t + e.count, 0);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  if (!username) return NextResponse.json({ error: "Missing username" }, { status: 400 });

  try {
    const [progressData, questionsData] = await Promise.all([
      queryLeetCode(PROGRESS_QUERY, { userSlug: username }),
      queryLeetCode(ALL_QUESTIONS_QUERY),
    ]);

    const progress = progressData?.data?.userProfileUserQuestionProgressV2;
    if (!progress) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const byDifficulty = (arr: { difficulty: string; count: number }[] = []) =>
      Object.fromEntries(arr.map((e) => [e.difficulty.toLowerCase(), e.count]));

    const solvedByDiff = byDifficulty(progress.numAcceptedQuestions);

    return NextResponse.json({
      solved: sum(progress.numAcceptedQuestions),
      total: sum(questionsData?.data?.allQuestionsCount),
      attempting: sum(progress.numFailedQuestions),
      easy: solvedByDiff.easy ?? 0,
      medium: solvedByDiff.medium ?? 0,
      hard: solvedByDiff.hard ?? 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch LeetCode stats" }, { status: 502 });
  }
}