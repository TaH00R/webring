export default function SearchBar() {
  return (
    <input
      type="text"
      placeholder="search members..."
      className="
        mt-10
        w-full
        border
        border-[#2B3A52]
        bg-[#1A2233]
        px-5
        py-4
        font-mono
        text-[#F1F5FF]
        placeholder:text-[#7082A5]
        outline-none
        transition-colors
        duration-200
        focus:border-[#5B8CFF]
      "
    />
  );
}