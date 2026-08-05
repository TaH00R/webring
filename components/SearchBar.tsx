interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="search members..."
      className="
        mt-10
        w-full
        border
        border-[#2B3A52]
        bg-[#1A2233]
        px-5
        py-3
        font-mono
        text-[#F1F5FF]
        placeholder:text-[#7082A5]
        outline-none
        transition-colors
        duration-200
        focus:border-[#5B8CFF]
        focus:shadow-[0_0_0_1px_#5B8CFF]
      "
    />
  );
}