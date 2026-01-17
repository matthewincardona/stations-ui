"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

const jobLevels = [
  { label: "Entry Level", value: "entry" },
  { label: "Intern", value: "intern" },
];

const jobTitles = [
  { label: "UX Designer", value: "ux_designer" },
  { label: "Frontend Developer", value: "frontend_developer" },
  { label: "Software Engineer", value: "software_engineer" },
];

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
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <p className="text-xl">Search for</p>
          <select
            className="rounded-full bg-[#0E8AC7] text-white px-4 py-1.5 text-base appearance-none"
            onChange={(e) => handleFilterChange("level", e.target.value)}
            value={level}
          >
            {jobLevels.map((level) => (
              <option
                key={level.value}
                value={level.value}
                className="bg-white text-black"
              >
                {level.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xl">jobs in</p>
          <select
            className="rounded-full bg-[#0E8AC7] text-white px-4 py-1.5 text-base appearance-none"
            onChange={(e) => handleFilterChange("title", e.target.value)}
            value={title}
          >
            {jobTitles.map((title) => (
              <option
                key={title.value}
                value={title.value}
                className="bg-white text-black"
              >
                {title.label}
              </option>
            ))}
          </select>
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
