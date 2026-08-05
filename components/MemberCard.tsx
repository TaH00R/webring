"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Member } from "@/types/member";

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const githubUrl = `https://github.com/${member.github}`;
  const cardUrl = member.portfolio || githubUrl;

  const displayUrl = member.portfolio
    ? new URL(member.portfolio).hostname
    : `github.com/${member.github}`;

  return (
    <div
      onClick={() =>
        window.open(cardUrl, "_blank", "noopener,noreferrer")
      }
      className="
        group
        w-44
        cursor-pointer
        border
        border-[#2B3A52]
        bg-[#1A2233]
        p-3
        transition-all
        duration-200
        hover:border-[#5B8CFF]
      "
    >
      <div className="mb-3 flex items-start justify-between">
        <Image
          src={`https://github.com/${member.github}.png`}
          alt={member.name}
          width={40}
          height={40}
          className="border border-[#2B3A52] object-cover"
          unoptimized
        />

        <ExternalLink
          size={15}
          className="text-[#6E7F9E] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>

      <h3 className="truncate font-mono text-[15px] font-semibold text-white">
        {member.name}
      </h3>

      <p className="mt-1 truncate font-mono text-sm text-[#9AA8C7]">
        {displayUrl}
      </p>

      <div className="mt-6 flex items-center">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#8B95B6] transition-colors hover:text-white"
          aria-label={`${member.name}'s GitHub`}
        >
          <FaGithub size={18} />
        </a>
      </div>
    </div>
  );
}