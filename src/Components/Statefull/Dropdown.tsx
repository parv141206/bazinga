import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function Dropdown({
  title,
  children,
}: {
  title?: string | null;
  children?: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between gap-3 rounded-md  bg-green-900 px-3 py-1 text-white dark:bg-gray-800"
      >
        {title}
        <IoIosArrowDown
          className={`text-lg ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>
      {isExpanded && (
        <div className="absolute my-1 flex w-full flex-col items-start justify-center gap-3 rounded-md  bg-green-900 p-3 text-white dark:bg-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}
