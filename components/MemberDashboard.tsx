"use client";

import { useEffect, useState } from "react";

import type { Member } from "@/types/member";

import { X, ExternalLink } from "lucide-react";

import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import { GitHubCalendar } from "react-github-calendar";

import LeetCodeRing from "@/components/LeetCodeRing";
import LeetCodeCalendar from "@/components/LeetCodeCalendar";

import backgrounds from "@/data/backgrounds.json";

interface MemberDashboardProps {
  member: Member;
  onClose: () => void;
}

function hashUsername(username: string) {
  let hash = 0;

  for (let i = 0; i < username.length; i++) {
    hash = (hash << 5) - hash + username.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
}

export default function MemberDashboard({
  member,
  onClose,
}: MemberDashboardProps) {
  const [showLeetCode, setShowLeetCode] = useState(false);

  const memberBackground = `/backgrounds/${member.github}.gif`;

  const fallbackBackground =
    backgrounds.length > 0
      ? backgrounds[hashUsername(member.github) % backgrounds.length]
      : null;

  const [background, setBackground] = useState(memberBackground);

  const techStack =
    member.techStack && member.techStack.length > 0
      ? member.techStack
      : ["A+", "B", "Holy C", "D", "R", "Fortran"];

  const githubUrl = `https://github.com/${member.github}`;

  const leetcodeUrl = member.leetcode
    ? `https://leetcode.com/u/${member.leetcode}/`
    : null;

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setBackground(memberBackground);
    };

    image.onerror = () => {
      if (fallbackBackground) {
        setBackground(fallbackBackground);
      }
    };

    image.src = memberBackground;

    return () => {
      image.onload = null;
      image.onerror = null;
    };

  }, [memberBackground, fallbackBackground]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };


    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };


  }, [onClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;


    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };


  }, []);

  return (<div
    onClick={onClose}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#1A2333]"
    > <div className="absolute right-4 top-4 z-10 flex gap-2"> <a
      href={githubUrl}
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
    > <FaGithub size={15} />


      <span className="hidden sm:inline">
        GitHub
      </span>
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

            <span className="hidden sm:inline">
              Portfolio
            </span>
          </a>
        )}

        {leetcodeUrl && (
          <a
            href={leetcodeUrl}
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
            <SiLeetcode size={15} />

            <span className="hidden sm:inline">
              LeetCode
            </span>
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
        className="h-40 bg-[#111827] bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      <div className="grid grid-cols-[140px_1fr] gap-0 p-6 pl-1 pr-2 sm:pl-5 sm:pr-5">
        <div className="flex w-35 flex-col items-center">
          <img
            src={`https://github.com/${member.github}.png`}
            alt={member.name}
            className="
            -mt-16
            mb-4
            size-24
            rounded-full
            border-4
            border-[#1A2333]
            object-cover
          "
          />

          <div className="ml-3 w-full">
            <h2 className="font-mono text-2xl font-bold text-[#F1F5FF]">
              {member.name}
            </h2>

            <div className="group relative w-[120px]">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                relative z-20
                block w-fit
                max-w-[110px]
                truncate
                border border-transparent
                bg-transparent
                px-0
                font-mono text-sm
                text-[#8593B2]
                transition-all
                duration-300
                ease-out
                hover:max-w-[500px]
                hover:border-[#2B3A52]
                hover:bg-[#1A2233]
                hover:text-[#F1F5FF]
              "
              >
                {member.github}
              </a>
            </div>

            <p className="font-mono text-sm text-[#9AA8C7]">
              Year: {member.year}
            </p>
          </div>

          {member.leetcode && leetcodeUrl && (
            <a
              href={leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
              mt-4
              flex
              flex-col
              items-center
              text-[#9AA8C7]
              transition-colors
              hover:text-[#F1F5FF]
            "
            >
              <LeetCodeRing username={member.leetcode} />

              <p className="mt-2 text-center font-mono text-sm">
                LeetCode stats
              </p>
            </a>
          )}
        </div>

        <div className="ml-1 min-w-0 sm:ml-6">
          <h3 className="mb-3 font-mono text-sm font-semibold text-[#F1F5FF]">
            Tech Stack
          </h3>

          <div className="mb-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="
                border
                border-[#2B3A52]
                bg-[#1A2233]
                px-2.5
                py-1
                font-mono
                text-xs
                text-[#9AA8C7]
              "
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLeetCode(false)}
              className={`font-mono text-sm font-semibold transition-colors ${!showLeetCode
                  ? "text-[#F1F5FF]"
                  : "text-[#6F7FA3] hover:text-[#9AA8C7]"
                }`}
            >
              GitHub Activity
            </button>

            {member.leetcode && (
              <>
                <span className="text-[#3A4663]">|</span>

                <button
                  onClick={() => setShowLeetCode(true)}
                  className={`font-mono text-sm font-semibold transition-colors ${showLeetCode
                      ? "text-[#F1F5FF]"
                      : "text-[#6F7FA3] hover:text-[#9AA8C7]"
                    }`}
                >
                  LeetCode Activity
                </button>
              </>
            )}
          </div>

          <div className="mt-2 sh-[170px] overflow-x-auto text-[#9AA8C7]">
            {showLeetCode && member.leetcode ? (
              <LeetCodeCalendar username={member.leetcode} />
            ) : (
              <GitHubCalendar
                username={member.github}
                colorScheme="dark"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>


  );
}