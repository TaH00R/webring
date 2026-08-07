import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

interface MemberGridProps {
  members: Member[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:[&>*]:w-44">
      {members.map((member) => (
        <MemberCard key={member.github} member={member} />
      ))}
    </div>
  );
}