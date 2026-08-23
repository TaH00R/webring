import { NextResponse } from "next/server";

const query = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      userCalendar {
        activeYears
        streak
        totalActiveDays
        submissionCalendar
      }
    }
  }
`;

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ username: string }>;
  }
) {
  try {
    const { username } = await params;

    const response = await fetch(
      "https://leetcode.com/graphql",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query,
          variables: {
            username,
          },
        }),

        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch LeetCode data",
        },
        {
          status: response.status,
        }
      );
    }

    const result = await response.json();

    if (result.errors) {
      console.error(
        "LeetCode GraphQL errors:",
        result.errors
      );

      return NextResponse.json(
        {
          error: "Failed to fetch LeetCode data",
        },
        {
          status: 500,
        }
      );
    }

    const user = result?.data?.matchedUser;

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const submissions =
      user.submitStatsGlobal?.acSubmissionNum ?? [];

    const getStat = (difficulty: string) => {
      return submissions.find(
        (item: {
          difficulty: string;
          count: number;
          submissions: number;
        }) => item.difficulty === difficulty
      );
    };

    const all = getStat("All");

    const solved = all?.count ?? 0;

    const easy =
      getStat("Easy")?.count ?? 0;

    const medium =
      getStat("Medium")?.count ?? 0;

    const hard =
      getStat("Hard")?.count ?? 0;

    const totalSubmissions =
      all?.submissions ?? 0;

    const submissionCalendar =
      user.userCalendar?.submissionCalendar;

    let calendarData: Record<string, number> = {};

    if (submissionCalendar) {
      try {
        calendarData = JSON.parse(
          submissionCalendar
        );
      } catch (error) {
        console.error(
          "Failed to parse LeetCode calendar:",
          error
        );
      }
    }

    const calendar = Object.entries(calendarData)
      .map(([timestamp, count]) => {
        const date = new Date(
          Number(timestamp) * 1000
        )
          .toISOString()
          .split("T")[0];

        return {
          date,
          count: Number(count),
        };
      })
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime()
      );

    return NextResponse.json({
      solved,
      total: solved,

      attempting: 0,

      easy,
      medium,
      hard,

      totalSubmissions,

      calendar,

      activeYears:
        user.userCalendar?.activeYears ?? [],

      streak:
        user.userCalendar?.streak ?? 0,

      totalActiveDays:
        user.userCalendar?.totalActiveDays ?? 0,
    });
  } catch (error) {
    console.error(
      "LeetCode API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}