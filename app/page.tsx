"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import MemberGrid from "@/components/MemberGrid";
import YearFilter from "@/components/YearFilter";

import members from "@/data/members.json";
import type { Member } from "@/types/member";

import MemberDashboard from "@/components/MemberDashboard";
import { FaUserPlus } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa6";
import IIITGLogo from "../components/IIITGLogo";

const allMembers: Member[] = members;

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const filteredMembers = allMembers.filter((member) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      member.name.toLowerCase().includes(query) ||
      member.github.toLowerCase().includes(query) ||
      member.techStack?.some((tech) => tech.toLowerCase().includes(query));

    const matchesYear = selectedYear === "All" || member.year === selectedYear;

    return matchesSearch && matchesYear;
  });

  return (
    <main className="min-h-screen bg-[#121826] text-[#F1F5FF]">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl">
              <span>IIITG </span>
              <span className="text-[#8BC5FF]">Index</span>
            </h1>

            <p className="mt-5 max-w-3xl font-mono text-base leading-relaxed text-[#9AA8C7] sm:text-lg">
              a collection of student portfolios & github profiles.{" "}
              <span className="whitespace-nowrap font-semibold text-[#8BC5FF]">
                {filteredMembers.length === allMembers.length
                  ? `${allMembers.length} members`
                  : `Showing ${filteredMembers.length} of ${allMembers.length} members`}
              </span>
            </p>
          </div>
          <div className="shrink-0 mt-2 grid grid-cols-2 gap-x-5 gap-y-2 text-[#9AA8C7]">
            <a
              href="https://discord.gg/FCPj699MQU"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IIITG Discord"
              className="flex justify-center transition-colors hover:text-[#5B8CFF]"
            >
              <FaDiscord size={30} />
            </a>

            <a
              href="https://iiitg.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IIITG Website"
              className="flex justify-center transition-colors hover:text-[#5B8CFF]"
            >
              <IIITGLogo className="size-7" />
            </a>

            <a
              href="https://forms.gle/zp9j25Vc8pjD7zua9"
              target="_blank"
              rel="noopener noreferrer"
              className="
                  mt-2
                  col-span-2
                  flex items-center justify-center gap-2
                  border border-[#2B3A52]
                  px-3 py-2
                  font-mono text-xs
                  text-[#9AA8C7]
                  transition-colors
                  hover:border-[#5B8CFF]
                  hover:text-[#F1F5FF]
                "
            >
              <FaUserPlus size={30} />
              <span>Join</span>
            </a>
          </div>
        </div>
        <div className="mt-10 h-px w-full bg-[#2B3A52]" />

        <SearchBar value={search} onChange={setSearch} />

        <YearFilter value={selectedYear} onChange={setSelectedYear} />

        <MemberGrid
          members={filteredMembers}
          onMemberClick={setSelectedMember}
        />
        {selectedMember && (
          <MemberDashboard
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </main>
  );
}
