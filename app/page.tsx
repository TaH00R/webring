"use client";
import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import MemberGrid from "@/components/MemberGrid";
import YearFilter from "@/components/YearFilter";

import members from "@/data/members.json";
import type { Member } from "@/types/member";
const allMembers: Member[] = members;

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesYear = selectedYear === "All" || member.year === selectedYear;

    return matchesSearch && matchesYear;
  });

  return (
    <main className="min-h-screen bg-[#121826] text-[#F1F5FF]">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <h1 className="font-mono text-5xl font-bold tracking-tight">
          <span>IIITG </span>
          <span className="text-[#8BC5FF]">Index</span>
        </h1>

        <p className="mt-5 font-mono text-lg text-[#9AA8C7]">
          a collection of student portfolios & github profiles.{" "}
          <span className="font-semibold text-[#8BC5FF]">
            {filteredMembers.length === members.length
              ? `${members.length} members`
              : `Showing ${filteredMembers.length} of ${members.length} members`}
          </span>
        </p>

        <div className="mt-10 h-px w-full bg-[#2B3A52]" />

        <SearchBar value={search} onChange={setSearch} />

        <YearFilter value={selectedYear} onChange={setSelectedYear} />

        <MemberGrid members={filteredMembers} />
      </div>
    </main>
  );
}
