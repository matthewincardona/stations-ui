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
    <div className="relative inline-block min-w-52" ref={dropdownRef}>
      <button
        type="button"
        className="flex gap-2 items-center justify-between w-full rounded-lg bg-[#4166e0] text-white px-4 py-2 text-base cursor-pointer transition-transform duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
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
            className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg max-h-48 overflow-y-auto"
          >
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center"
                  onClick={() => handleSelect(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => {}}
                    className="mr-2"
                  />
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

  const getArrayFromParams = (paramName: string) => {
    const param = searchParams.get(paramName);
    return param ? param.split(";") : [];
  };

  const [levels, setLevels] = useState<string[]>(getArrayFromParams("level"));
  const [titles, setTitles] = useState<string[]>(getArrayFromParams("title"));
  const [locationsState, setLocationsState] = useState<string[]>(
    getArrayFromParams("location"),
  );

  const handleFilterChange = (filterType: string, values: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (values.length > 0) {
      params.set(filterType, values.join(";"));
    } else {
      params.delete(filterType);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setLevels(getArrayFromParams("level"));
    setTitles(getArrayFromParams("title"));
    setLocationsState(getArrayFromParams("location"));
  }, [searchParams]);

  const removeFilter = (filterType: string, value: string) => {
    let currentValues: string[];
    let setter: (values: string[]) => void;

    if (filterType === "level") {
      currentValues = levels;
      setter = setLevels;
    } else if (filterType === "title") {
      currentValues = titles;
      setter = setTitles;
    } else {
      currentValues = locationsState;
      setter = setLocationsState;
    }

    const newValues = currentValues.filter((v) => v !== value);
    setter(newValues);
    handleFilterChange(filterType, newValues);
  };

  const totalSelected = levels.length + titles.length + locationsState.length;

  const clearAllFilters = () => {
    setLevels([]);
    setTitles([]);
    setLocationsState([]);
    const params = new URLSearchParams(searchParams);
    params.delete("level");
    params.delete("title");
    params.delete("location");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="max-w-400 mx-auto mt-2 flex items-center justify-center">
        <div className="flex flex-wrap items-center gap-4">
          <MultiSelect
            options={jobLevels}
            selected={levels}
            onChange={(selected) => {
              setLevels(selected);
              handleFilterChange("level", selected);
            }}
            label="Job Level"
          />
          <MultiSelect
            options={jobTitles}
            selected={titles}
            onChange={(selected) => {
              setTitles(selected);
              handleFilterChange("title", selected);
            }}
            label="Job Title"
          />
          <MultiSelect
            options={locations}
            selected={locationsState}
            onChange={(selected) => {
              setLocationsState(selected);
              handleFilterChange("location", selected);
            }}
            label="Location"
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-4 flex flex-wrap items-center gap-2">
        {levels.map((level) => (
          <div
            key={level}
            className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            <span>{jobLevels.find((l) => l.value === level)?.label}</span>
            <button
              onClick={() => removeFilter("level", level)}
              className="ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {titles.map((title) => (
          <div
            key={title}
            className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            <span>{jobTitles.find((t) => t.value === title)?.label}</span>
            <button
              onClick={() => removeFilter("title", title)}
              className="ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {locationsState.map((location) => (
          <div
            key={location}
            className="flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            <span>{locations.find((l) => l.value === location)?.label}</span>
            <button
              onClick={() => removeFilter("location", location)}
              className="ml-2"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {totalSelected >= 3 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
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
