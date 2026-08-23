import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

interface MemberGridProps {
  members: Member[];
  onMemberClick: (member: Member) => void;
}

export default function MemberGrid({ members, onMemberClick }: MemberGridProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 sm:flex sm:flex-wrap sm:[&>*]:w-44">
      {members.map((member) => (
        <MemberCard key={member.github} member={member} onClick={onMemberClick}/>
      ))}
    </div>
  );
}