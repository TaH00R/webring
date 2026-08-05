import MemberCard from "./MemberCard";
import { Member } from "@/types/member";

interface MemberGridProps {
  members: Member[];
}

export default function MemberGrid({ members }: MemberGridProps) {
  return (
    <div className="mt-10 flex flex-wrap gap-5">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}