"use client";

import JobCard from "./JobCard";
// import SkeletonLoader from "./animatedSkeletonLoader";
import SVGLoader from "./SkeletonLoader";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  postedTime: string;
  workType: string;
  job_url: string;
}

function JobsListContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const rangeLower = (page - 1) * 9;
    const rangeUpper = page * 9 - 1;
    getJobs(rangeLower, rangeUpper);
  }, [page]);

  const prevPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page - 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextPage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  async function getJobs(rangeLower: number, rangeUpper: number) {
    setLoading(true);
    setFetchError(null);

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .limit(9)
      .range(rangeLower, rangeUpper);

    if (error) {
      console.error("Error fetching jobs:", error);
      setFetchError("Could not fetch jobs");
      setJobs([]);
      return;
    }

    setLoading(false);
    setJobs(data || []);
  }

  return (
    <div className="mt-6 bg-[#F5F5F5] p-8 max-w-400 m-auto rounded-xl">
      <h1 className="mb-4 ">Jobs List</h1>
      {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:grid-rows-[repeat(3,minmax(208px,auto))] md:grid-rows-[repeat(3,minmax(208px,auto))] gap-4">
        {/* {loading && Array.from({ length: 9 }, (_, i) => <SVGLoader key={i} />)} */}
        {loading
          ? Array.from({ length: 9 }, (_, i) => <SVGLoader key={i} />)
          : jobs.map(
              ({
                id,
                title,
                company_name,
                postedTime,
                location,
                workType,
                job_url,
              }) => (
                <JobCard
                  key={id}
                  title={title}
                  company={company_name}
                  postedTime="24 hours ago"
                  location={location}
                  workType="Hybrid"
                  jobUrl={job_url}
                />
              )
            )}
      </div>
      <div className="flex justify-end mt-8 gap-4">
        {page !== 1 && (
          <button
            className="bg-white rounded-full py-2 px-6 cursor-pointer hover:border-[#4C73F2] transition duration-200 ease-in-out border border-[#00000000]"
            onClick={() => prevPage()}
          >
            Prev
          </button>
        )}

        <button
          className="bg-white rounded-full py-2 px-6 cursor-pointer hover:border-[#4C73F2] transition duration-200 ease-in-out border border-[#00000000]"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function JobsList() {
  return (
    <Suspense>
      <JobsListContent />
    </Suspense>
  );
}
