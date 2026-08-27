"use client";

import { useMemo } from "react";
import members from "@/data/members.json";

interface YearFilterProps {
  value: number | "All";
  onChange: (year: number | "All") => void;
}

export default function YearFilter({
  value,
  onChange,
}: YearFilterProps) {
  const years = useMemo<(number | "All")[]>(() => {
    return [
      "All",
      ...Array.from(
        new Set(members.map((member) => member.year))
      ).sort((a, b) => b - a),
    ];
  }, []);

  return (
    <div className="relative mt-8">
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-none
          [scrollbar-width:none]
          [-ms-overflow-style:none]
        "
      >
        {years.map((year) => {
          const active = value === year;

          return (
            <button
              key={year}
              onClick={() => onChange(year)}
              className={`
                shrink-0
                whitespace-nowrap
                border
                px-4
                py-2
                text-sm
                font-mono
                transition-all
                duration-200
                cursor-pointer

                ${
                  active
                    ? "border-[#5B8CFF] bg-[#20314D] text-white"
                    : "border-[#2B3A52] text-[#9AA8C7] hover:border-[#5B8CFF] hover:text-white"
                }
              `}
            >
              {year}
            </button>
          );
        })}
      </div>

      
      <div
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          h-full
          w-10
          bg-gradient-to-l
          from-[#101827]
          to-transparent
        "
      />
    </div>
  );
}