"use client";

import JobCard from "./JobCard";
import { timeAgo } from "../lib/utils/dateUtils";
// import SkeletonLoader from "./animatedSkeletonLoader";
import SVGLoader from "./SkeletonLoader";
import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import InfiniteScroll from "react-infinite-scroll-component";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  date_posted: string;
  job_type: string;
  job_url: string;
  company_logo: string;
}

function parseSupabaseDate(dateString?: string) {
  if (!dateString) return null;

  // Split off the timezone part
  const [datetimePart] = dateString.split("+");
  // Replace space with T to make it ISO 8601 compatible
  const isoString = datetimePart.replace(" ", "T") + "Z";

  const date = new Date(isoString);
  return isNaN(date.getTime()) ? null : date;
}

function JobsListContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchData = async (page: number) => {
    try {
      const limit = 10;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, count, error } = await supabase
        .from("jobs")
        .select("*", { count: "exact" })
        .order("date_posted", { ascending: false }) // Newest first
        .range(from, to);

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
    let subscribed = true;
    (async () => {
      if (subscribed) {
        await fetchData(1);
      }
    })();
    return () => {
      subscribed = false;
    };
  }, []);

  const handleLoadMoreData = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchData(nextPage);
      return nextPage;
    });
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
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="flex flex-col gap-4">
          {loading
            ? Array.from({ length: 9 }, (_, i) => <SVGLoader key={i} />)
            : jobs.map(
                ({
                  id,
                  title,
                  company_name,
                  date_posted,
                  location,
                  job_type,
                  job_url,
                }) => (
                  <JobCard
                    id={id}
                    key={id}
                    title={title}
                    company={company_name}
                    date_posted={timeAgo(date_posted)}
                    location={location}
                    workType="Hybrid"
                    jobUrl={job_url}
                  />
                )
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
