import { useState, useRef, useEffect } from "react";
import iconMap from "./iconMap";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const PlatformDropdown: React.FC<DropdownProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const platforms = Object.keys(iconMap);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = Math.min(240, platforms.length * 40); // max height ~240px
      setDropUp(spaceBelow < dropdownHeight);
    }
  }, [isOpen, platforms.length]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700 text-sm p-2 rounded-md flex justify-between items-center focus:ring-2 focus:ring-indigo-500"
      >
        {value || "Platform (e.g. GitHub)"}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <ul
          className={`absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-md max-h-60 overflow-auto ${
            dropUp ? "bottom-full mb-1" : "mt-1"
          }`}
        >
          {platforms.map((platform) => (
            <li
              key={platform}
              onClick={() => {
                onChange(platform);
                setIsOpen(false);
              }}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-600"
            >
              <span className="mr-2">{iconMap[platform]}</span>
              {platform}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlatformDropdown;
