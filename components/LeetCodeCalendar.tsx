"use client";

import { useMemo } from "react";

import { useLeetCodeCalendar } from "@/hooks/useLeetCodeCalendar";

interface LeetCodeCalendarProps {
  username?: string;
}

const CELL_SIZE = 12;
const GAP = 4;

function getColor(count: number, max: number) {
  if (count === 0) return "#161B22";

  const ratio = count / max;

  if (ratio <= 0.25) return "#5A431D";
  if (ratio <= 0.5) return "#8A641F";
  if (ratio <= 0.75) return "#C78520";

  return "#FFA116";
}

export default function LeetCodeCalendar({
  username,
}: LeetCodeCalendarProps) {
  const { calendar, loading } =
    useLeetCodeCalendar(username);

  const {
    weeks,
    months,
    maxCount,
    totalSubmissions,
  } = useMemo(() => {
    const submissionMap = new Map(
      calendar.map((day) => [
        day.date,
        day.count,
      ])
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(
      startDate.getDate() - 364
    );

    const days: {
      date: string;
      count: number;
      month: number;
    }[] = [];

    let max = 0;
    let total = 0;

    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);

      date.setDate(
        startDate.getDate() + i
      );

      const key = date
        .toISOString()
        .split("T")[0];

      const count =
        submissionMap.get(key) ?? 0;

      max = Math.max(max, count);
      total += count;

      days.push({
        date: key,
        count,
        month: date.getMonth(),
      });
    }

    const groupedWeeks: typeof days[] = [];

    for (let i = 0; i < days.length; i += 7) {
      groupedWeeks.push(
        days.slice(i, i + 7)
      );
    }

    const monthLabels: {
      name: string;
      weekIndex: number;
    }[] = [];

    let lastMonth = -1;

    groupedWeeks.forEach((week, index) => {
      const firstDay = week[0];

      if (
        firstDay &&
        firstDay.month !== lastMonth
      ) {
        monthLabels.push({
          name: new Date(
            `${firstDay.date}T00:00:00`
          ).toLocaleString("default", {
            month: "short",
          }),

          weekIndex: index,
        });

        lastMonth = firstDay.month;
      }
    });

    return {
      weeks: groupedWeeks,
      months: monthLabels,
      maxCount: max,
      totalSubmissions: total,
    };
  }, [calendar]);

  if (!username || loading) {
    return (
      <div className="font-mono text-sm text-[#6E7F9E]">
        Loading activity...
      </div>
    );
  }

  if (calendar.length === 0) {
    return (
      <div className="font-mono text-sm text-[#6E7F9E]">
        No LeetCode activity found.
      </div>
    );
  }

return (
  <div className="w-full min-w-0">

    <div className="overflow-x-auto">
      <div className="min-w-[680px]">

        {/* Month labels */}
        <div
          className="relative mb-2 h-5"
          style={{
            width: `${
              weeks.length * (CELL_SIZE + GAP) - GAP
            }px`,
          }}
        >
          {months.map((month) => (
            <span
              key={`${month.name}-${month.weekIndex}`}
              className="
                absolute
                font-mono
                text-sm
                text-[#9AA8C7]
              "
              style={{
                left: `${
                  month.weekIndex * (CELL_SIZE + GAP)
                }px`,
              }}
            >
              {month.name}
            </span>
          ))}
        </div>

        {/* Contribution graph */}
        <div
          className="flex"
          style={{
            gap: `${GAP}px`,
          }}
        >
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="flex flex-col"
              style={{
                gap: `${GAP}px`,
              }}
            >
              {week.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} submissions on ${day.date}`}
                  className="
                    rounded-[2px]
                    transition-transform
                    duration-150
                    hover:scale-125
                  "
                  style={{
                    width: `${CELL_SIZE}px`,
                    height: `${CELL_SIZE}px`,
                    backgroundColor: getColor(
                      day.count,
                      maxCount || 1
                    ),
                    boxShadow: "inset 0 0 0 0.5px #263244",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* Bottom info */}
    <div className="mt-1.5 flex flex-wrap items-center justify-between gap-3">
      <p className="min-w-0 font-mono text-sm text-[#9AA8C7]">
        {totalSubmissions} submissions in the last year
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-xs text-[#9AA8C7]">
          Less
        </span>

        <div className="flex gap-[3px]">
          {[0, 0.25, 0.5, 0.75, 1].map((level) => (
            <div
              key={level}
              className="rounded-[2px]"
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: getColor(
                  level === 0
                    ? 0
                    : Math.ceil(maxCount * level),
                  maxCount || 1
                ),
              }}
            />
          ))}
        </div>

        <span className="font-mono text-xs text-[#9AA8C7]">
          More
        </span>
      </div>
    </div>

  </div>
);
}