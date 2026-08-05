"use client";

import { useMemo, useState } from "react";
import { members } from "@/data/members";

export default function YearFilter() {
  const [selectedYear, setSelectedYear] = useState<string>("All");

  const years = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(members.map((member) => member.year)))
        .sort((a, b) => b - a)
        .map(String),
    ];
  }, []);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {years.map((year) => {
        const active = selectedYear === year;

        return (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`
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
  );
}