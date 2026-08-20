"use client";

import type { Member } from "@/types/member";
import { X } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GitHubCalendar } from "react-github-calendar";

interface MemberDashboardProps {
  member: Member;
  onClose: () => void;
}

export default function MemberDashboard({
  member,
  onClose,
}: MemberDashboardProps) {
  const background = `/backgrounds/${member.github}.gif`;
  const techStack = ["C", "C++", "GoLang", "JavaScript"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-3xl overflow-hidden bg-[#1A2333]">        
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex h-8 items-center gap-2
              border border-[#2B3A52]
              bg-[#1A2233]
              px-3
              font-mono text-xs
              text-[#9AA8C7]
              transition-colors
              hover:border-[#5B8CFF]
              hover:text-[#F1F5FF]
            "
          >
            <FaGithub size={15} />
            GitHub
          </a>

          {member.portfolio && (
            <a
              href={member.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex h-8 items-center gap-2
                border border-[#2B3A52]
                bg-[#1A2233]
                px-3
                font-mono text-xs
                text-[#9AA8C7]
                transition-colors
                hover:border-[#5B8CFF]
                hover:text-[#F1F5FF]
              "
            >
              <ExternalLink size={15} />
              Portfolio
            </a>
          )}

          <button
            onClick={onClose}
            className="
              flex size-8 items-center justify-center
              border border-[#2B3A52]
              bg-[#1A2233]
              text-[#9AA8C7]
              transition-colors
              hover:border-[#5B8CFF]
              hover:text-[#F1F5FF]
            "
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div
          className="h-40 bg-white bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
          onError={(e) => {
            e.currentTarget.style.backgroundImage = "none";
          }}
        />

        <div className="grid grid-cols-[140px_1fr] gap-0 p-6">
          <div>
            <img
              src={`https://github.com/${member.github}.png`}
              alt={member.name}
              className="-mt-16 mb-4 size-24 rounded-full border-4 border-[#1A2333] object-cover"
            />

            <h2 className="font-mono text-2xl font-bold">
              {member.name}
            </h2>
            <div className="group relative max-w-[160px]">
              <a
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative z-20
                  block w-fit max-w-[120px]
                  truncate
                  border border-transparent
                  bg-transparent
                  px-0
                  font-mono text-sm text-[#8593B2]
                  transition-all duration-300 ease-out
                  hover:max-w-[500px]
                  hover:border-[#2B3A52]
                  hover:bg-[#1A2233]
                  hover:text-[#F1F5FF]
                "
              >
                {member.github}
              </a>
            </div>

            <p className="mt-1 font-mono text-sm text-[#9AA8C7]">
              Year: {member.year}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="mb-3 font-mono text-sm font-semibold text-[#F1F5FF]">
              Tech Stack
            </h3>

            <div className="mb-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    border border-[#2B3A52]
                    bg-[#1A2233]
                    px-2.5 py-1
                    font-mono text-xs
                    text-[#9AA8C7]
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="mb-4 font-mono text-sm font-semibold text-[#F1F5FF]">
              GitHub Activity
            </h3>
            <div className="overflow-x-auto">
              <GitHubCalendar
                username={member.github}
                colorScheme="dark"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
