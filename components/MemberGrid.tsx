import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

interface MemberGridProps {
  members: Member[];
  onMemberClick: (member: Member) => void;
}

export default function MemberGrid({ members, onMemberClick }: MemberGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:[&>*]:w-44">
      {members.map((member, index) => (
        <MemberCard
          key={member.github}
          member={member}
          onClick={onMemberClick}
          style={{ animationDelay: `${Math.min(index, 20) * 40}ms` }}
        />
      ))}
    </div>
  );
}