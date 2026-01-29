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
    "Posted Today": [],
    Yesterday: [],
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
    if (date >= today) groups["Posted Today"].push(job);
    else if (date >= yesterday) groups["Yesterday"].push(job);
    else if (date >= thisWeek) groups["This Week"].push(job);
    else if (date >= thisMonth) groups["This Month"].push(job);
    else groups["Older"].push(job);
  });

  const groupOrder = [
    "Posted Today",
    "Yesterday",
    "This Week",
    "This Month",
    "Older",
  ];

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
            : groupOrder.map((groupTitle) => {
                const groupJobs = groups[groupTitle];
                if (groupJobs.length === 0) return null;

                return (
                  <div key={groupTitle} className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-500 mt-4 sticky top-0 bg-white z-10 py-2">
                      {groupTitle}
                    </h3>
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
                          isNew={groupTitle === "Posted Today"}
                        />
                      ),
                    )}
                  </div>
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
