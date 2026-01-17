"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const jobLevels = [
  { label: "Entry Level", value: "entry" },
  { label: "Internship", value: "intern" },
];

const jobTitles = [
  { label: "UX Designer", value: "ux_designer" },
  { label: "Frontend Developer", value: "frontend_developer" },
  { label: "Software Engineer", value: "software_engineer" },
];

const Select = ({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block min-w-46" ref={dropdownRef}>
      <button
        type="button"
        className="flex gap-2 items-center justify-between w-full rounded-lg bg-[#4166e0] text-white px-4 py-2 text-base cursor-pointer transition-transform duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg"
          >
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function FilterContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const level = searchParams.get("level") || "entry";
  const title = searchParams.get("title") || "ux_designer";

  return (
    <div className="max-w-400 mx-auto mt-2 flex items-center justify-center">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-xl text-gray-600">Search for</p>
          <Select
            options={jobLevels}
            value={level}
            onChange={(value) => handleFilterChange("level", value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl text-gray-600">positions as a</p>
          <div className="text-nowrap">
            <Select
              options={jobTitles}
              value={title}
              onChange={(value) => handleFilterChange("title", value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Filter() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <FilterContent />
    </Suspense>
  );
}
