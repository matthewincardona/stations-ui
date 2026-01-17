"use client";

import JobCard from "./JobCard";
import { timeAgo } from "../lib/utils/dateUtils";
// import SkeletonLoader from "./animatedSkeletonLoader";
import SVGLoader from "./SkeletonLoader";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import InfiniteScroll from "react-infinite-scroll-component";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
);

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  date_posted: string;
  job_url: string;
  job_url_direct: string;
  company_logo: string;
  skills: string;
  summary: string;
}

export function parseSupabaseDate(dateString?: string) {
  if (!dateString) return null;

  // Step 1: Replace the space with T
  let iso = dateString.replace(" ", "T");

  // Step 2: Ensure timezone format becomes +00:00
  iso = iso.replace(/\+(\d{2})(?!:)/, "+$1:00");

  const date = new Date(iso);
  return isNaN(date.getTime()) ? null : date;
}

function JobsListContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [openJobId, setOpenJobId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "entry";
  const title = searchParams.get("title") || "ux_designer";

  const toggleOpen = (id: string) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  const fetchData = async (page: number, level: string, title: string) => {
    try {
      setLoading(true);
      const limit = 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("jobs")
        .select("*", { count: "exact" })
        .gt(`role_scores->>${title}`, "0.7")
        .gt(`seniority_scores->>${level}`, "0.7")
        .order("date_posted", { ascending: false })
        .range(from, to);

      const { data, count, error } = await query;

      if (error) {
        console.error("Error fetching jobs:", error);
        setFetchError("Could not fetch jobs");
        return;
      }

      if (page === 1) {
        setJobs(data || []);
      } else {
        setJobs((prevItems) => [...prevItems, ...(data || [])]);
      }

      if (count !== null) {
        setTotalJobs(count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setJobs([]);
    setPage(1);
    fetchData(1, level, title);
  }, [level, title]);

  const handleLoadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, level, title);
  };

  return (
    <div className="mt-6 max-w-4xl m-auto">
      {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}
      <InfiniteScroll
        dataLength={jobs.length} //This is important field to render the next data
        next={handleLoadMoreData}
        hasMore={totalJobs > jobs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center my-16">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-col gap-4">
          {loading && jobs.length === 0
            ? Array.from({ length: 9 }, (_, i) => <SVGLoader key={i} />)
            : jobs.map(
                (
                  {
                    id,
                    title,
                    company_name,
                    date_posted,
                    location,
                    job_url,
                    job_url_direct,
                    skills,
                    summary,
                  },
                  index,
                ) => (
                  <JobCard
                    id={id}
                    key={id + index}
                    title={title}
                    company={company_name}
                    date_posted={timeAgo(parseSupabaseDate(date_posted))}
                    location={location}
                    jobUrl={job_url ? job_url : job_url_direct}
                    workType={""}
                    skills={skills}
                    summary={summary}
                    expanded={openJobId === id}
                    onToggle={() => toggleOpen(id)}
                  />
                ),
              )}
        </div>
      </InfiniteScroll>
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
