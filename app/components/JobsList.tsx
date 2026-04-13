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
  const level = searchParams.get("level") || "";
  const title = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";

  const toggleOpen = (id: string) => {
    setOpenJobId((prev) => (prev === id ? null : id));
  };

  async function loadPage(
    pageNum: number,
    level: string,
    title: string,
    location: string,
  ) {
    try {
      setLoading(true);
      const result = await fetchJobs(pageNum, level, title, location);

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
    loadPage(1, level, title, location);
  }, [level, title, location]);

  const handleLoadMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPage(nextPage, level, title, location);
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);
  const thisMonth = new Date(today);
  thisMonth.setDate(thisMonth.getDate() - 30);

  const groups: Record<string, Job[]> = {
    Latest: [],
    "This Week": [],
    "This Month": [],
    Older: [],
  };

  jobs.forEach((job) => {
    const date = parseSupabaseDate(job.date_posted);
    if (!date) {
      groups["Older"].push(job);
      return;
    }

    const localDate = new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
    );

    if (localDate >= yesterday) groups["Latest"].push(job);
    else if (localDate >= thisWeek) groups["This Week"].push(job);
    else if (localDate >= thisMonth) groups["This Month"].push(job);
    else groups["Older"].push(job);
  });

  const groupOrder = ["Latest", "This Week", "This Month", "Older"];

  return (
    <div className="mt-6 space-y-10">
      {fetchError && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800">
          {fetchError}
        </div>
      )}

      <InfiniteScroll
        dataLength={jobs.length}
        next={handleLoadMoreData}
        hasMore={totalJobs > jobs.length}
        loader={
          <div className="py-10 text-center text-sm text-gray-500">
            Loading more jobs…
          </div>
        }
        endMessage={
          <p className="text-center py-10 text-sm text-gray-600">
            <b>You have seen it all.</b>
          </p>
        }
      >
        <div className="grid gap-6">
          {loading && jobs.length === 0
            ? Array.from({ length: 6 }, (_, i) => <SVGLoader key={i} />)
            : groupOrder.map((groupTitle) => {
                const groupJobs = groups[groupTitle];
                if (groupJobs.length === 0) return null;

                return (
                  <section key={groupTitle} className="space-y-4">
                    <div className="sticky top-0 z-10 rounded-3xl border border-gray-200 bg-white/95 px-5 py-4 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
                      {groupTitle}
                    </div>
                    <div className="grid gap-6">
                      {groupJobs.map(
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
                            key={`${id}-${index}`}
                            title={title}
                            company={company_name}
                            date_posted={timeAgo(
                              parseSupabaseDate(date_posted),
                            )}
                            location={location}
                            jobUrl={job_url || job_url_direct || "#"}
                            workType={""}
                            skills={skills}
                            summary={summary}
                            expanded={openJobId === id}
                            onToggle={() => toggleOpen(id)}
                          />
                        ),
                      )}
                    </div>
                  </section>
                );
              })}
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
