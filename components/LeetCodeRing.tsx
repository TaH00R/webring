"use client";

import { useId } from "react";

import { useLeetCodeStats } from "@/hooks/useLeetCodeStats";

interface LeetCodeRingProps {
  username?: string;
}

const SIZE = 120;
const CENTER = SIZE / 2;

const RADIUS = 46;
const STROKE_WIDTH = 8;

const ARC_START = 135;
const ARC_TOTAL = 270;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;

  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function arcPath(
  start: number,
  end: number,
  radius: number
) {
  const p1 = polar(start, radius);
  const p2 = polar(end, radius);

  const largeArc =
    end - start > 180 ? 1 : 0;

  return `
    M ${p1.x} ${p1.y}
    A ${radius} ${radius} 0 ${largeArc} 1 ${p2.x} ${p2.y}
  `;
}

export default function LeetCodeRing({
  username,
}: LeetCodeRingProps) {
  const { stats, loading } =
    useLeetCodeStats(username);

  if (!username || loading || !stats) {
    return null;
  }

  const {
    solved,
    total,
    easy,
    medium,
    hard,
  } = stats;

  const solvedTotal =
    easy + medium + hard;

  if (solvedTotal === 0) {
    return null;
  }

  const easyAngle =
    (easy / solvedTotal) * ARC_TOTAL;

  const mediumAngle =
    (medium / solvedTotal) * ARC_TOTAL;

  const hardAngle =
    (hard / solvedTotal) * ARC_TOTAL;

  const easyStart = ARC_START;
  const easyEnd =
    easyStart + easyAngle;

  const mediumStart = easyEnd;
  const mediumEnd =
    mediumStart + mediumAngle;

  const hardStart = mediumEnd;
  const hardEnd =
    hardStart + hardAngle;

  return (
    <div className="flex justify-center">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        {/* Background ring */}

        <path
          d={arcPath(
            ARC_START,
            ARC_START + ARC_TOTAL,
            RADIUS
          )}
          fill="none"
          stroke="#2B3A52"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
        />

        {/* Easy */}

        {easy > 0 && (
          <path
            d={arcPath(
              easyStart,
              easyEnd,
              RADIUS
            )}
            fill="none"
            stroke="#00B8A3"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        )}

        {/* Medium */}

        {medium > 0 && (
          <path
            d={arcPath(
              mediumStart,
              mediumEnd,
              RADIUS
            )}
            fill="none"
            stroke="#FFA116"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        )}

        {/* Hard */}

        {hard > 0 && (
          <path
            d={arcPath(
              hardStart,
              hardEnd,
              RADIUS
            )}
            fill="none"
            stroke="#EF4747"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
        )}

        {/* Solved count */}

        <text
          x={CENTER}
          y={CENTER - 4}
          textAnchor="middle"
          className="
            font-mono
            font-bold
            fill-[#F1F5FF]
            text-[22px]
          "
        >
          {solved}

          <tspan
            className="
              font-medium
              fill-[#8593B2]
              text-xs
            "
          >
            /{total}
          </tspan>
        </text>

        {/* Solved label */}

        <text
          x={CENTER}
          y={CENTER + 15}
          textAnchor="middle"
          className="
            font-mono
            fill-[#9AA8C7]
            text-[10px]
          "
        >
          Solved
        </text>

        {/* Difficulty labels */}

        <text
          x={CENTER}
          y={SIZE - 8}
          textAnchor="middle"
          className="
            font-mono
            fill-[#8593B2]
            text-[9px]
          "
        >
          {easy} E · {medium} M · {hard} H
        </text>
      </svg>
    </div>
  );
}