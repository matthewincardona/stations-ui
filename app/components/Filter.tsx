"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const jobLevels = [
  { label: "Entry Level", value: "entry" },
  { label: "Internship", value: "intern" },
];

const jobTitles = [
  { label: "UX Designer", value: "ux_designer" },
  { label: "Frontend Developer", value: "frontend_developer" },
  { label: "Software Engineer", value: "software_engineer" },
  { label: "Mobile Developer", value: "mobile_developer" },
  { label: "Graphic Designer", value: "graphic_designer" },
];

const locations = [
  { label: "New York, NY", value: "New York, NY" },
  { label: "Seattle, WA", value: "Seattle, WA" },
  { label: "San Francisco, CA", value: "San Francisco, CA" },
  { label: "San Jose, CA", value: "San Jose, CA" },
  { label: "Austin, TX", value: "Austin, TX" },
  { label: "Boston, MA", value: "Boston, MA" },
  { label: "Los Angeles, CA", value: "Los Angeles, CA" },
  { label: "Chicago, IL", value: "Chicago, IL" },
  { label: "Denver, CO", value: "Denver, CO" },
  { label: "Redmond, WA", value: "Redmond, WA" },
];

const MultiSelect = ({
  options,
  selected,
  onChange,
  label,
}: {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div
      className={`relative inline-block min-w-[220px] ${isOpen ? "z-50" : "z-10"}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 shadow-softer transition hover:border-blue-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
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
            className="absolute z-50 mt-2 w-full rounded-3xl border border-gray-200 bg-white shadow-hover overflow-hidden"
          >
            <ul className="py-2">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => handleSelect(option.value)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
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

  const getArrayFromParams = (paramName: string) => {
    const param = searchParams.get(paramName);
    return param ? param.split(";") : [];
  };

  const levels = getArrayFromParams("level");
  const titles = getArrayFromParams("title");
  const locationsState = getArrayFromParams("location");

  const handleFilterChange = (filterType: string, values: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (values.length > 0) {
      params.set(filterType, values.join(";"));
    } else {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const totalSelected = levels.length + titles.length + locationsState.length;

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("level");
    params.delete("title");
    params.delete("location");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <MultiSelect
          options={jobLevels}
          selected={levels}
          onChange={(selected) => handleFilterChange("level", selected)}
          label="Job Level"
        />
        <MultiSelect
          options={jobTitles}
          selected={titles}
          onChange={(selected) => handleFilterChange("title", selected)}
          label="Job Title"
        />
        <MultiSelect
          options={locations}
          selected={locationsState}
          onChange={(selected) => handleFilterChange("location", selected)}
          label="Location"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() =>
              handleFilterChange(
                "level",
                levels.filter((v) => v !== level),
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            {jobLevels.find((l) => l.value === level)?.label}
            <X size={14} />
          </button>
        ))}
        {titles.map((title) => (
          <button
            key={title}
            type="button"
            onClick={() =>
              handleFilterChange(
                "title",
                titles.filter((v) => v !== title),
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            {jobTitles.find((t) => t.value === title)?.label}
            <X size={14} />
          </button>
        ))}
        {locationsState.map((location) => (
          <button
            key={location}
            type="button"
            onClick={() =>
              handleFilterChange(
                "location",
                locationsState.filter((v) => v !== location),
              )
            }
            className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            {locations.find((l) => l.value === location)?.label}
            <X size={14} />
          </button>
        ))}

        {totalSelected >= 2 && (
          <button
            onClick={clearAllFilters}
            className="ml-auto rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700"
          >
            Clear all
          </button>
        )}
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
