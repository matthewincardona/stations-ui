"use client";

import JobCard from "./JobCard";
import { timeAgo } from "../lib/utils/dateUtils";
import SVGLoader from "./SkeletonLoader";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchJobs, parseSupabaseDate, Job } from "../lib/db/jobs";

function JobsListContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
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

  async function loadPage(pageNum: number) {
    try {
      setLoading(true);
      const result = await fetchJobs(pageNum, level, title);

      if (pageNum === 1) {
        setJobs(result.data);
      } else {
        setJobs((prev) => [...prev, ...result.data]);
      }

      setTotalJobs(result.count);
    } catch (err) {
      console.error(err);
      setFetchError("Could not fetch jobs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setJobs([]);
    setPage(1);
    loadPage(1);
  }, [level, title]);

  const handleLoadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPage(nextPage);
  };

  return (
    <div className="mt-6 max-w-4xl m-auto">
      {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}
      <InfiniteScroll
        dataLength={jobs.length}
        next={handleLoadMoreData}
        hasMore={totalJobs > jobs.length}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center my-16">
            <b>You have seen it all</b>
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
