"use client";

import JobCard from "./jobCard";
import SkeletonLoader from "./animatedSkeletonLoader";
import SVGLoader from "./skeletonLoader";
import { useEffect, useState } from "react";
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

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company_name: "Tech Corp",
    location: "Boston, MA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company_name: "Data Systems",
    location: "New York, NY",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 3,
    title: "Product Manager",
    company_name: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 4,
    title: "Product Manager",
    company_name: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 5,
    title: "Product Manager",
    company_name: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 6,
    title: "Product Manager",
    company_name: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 7,
    title: "Product Manager",
    company_name: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
];

export default function JobsList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    setLoading(true);
    setFetchError(null);

    const { data, error } = await supabase.from("jobs").select("*").limit(9);

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
    <div className="mt-8 bg-[#F5F5F5] p-8 max-w-400 m-auto rounded-xl">
      <h1 className="mb-4">Jobs List</h1>
      {fetchError && <p className="text-red-600 mb-4">{fetchError}</p>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:grid-rows-[repeat(3,minmax(208px,auto))] md:grid-rows-[repeat(3,minmax(208px,auto))] gap-4">
        {loading && Array.from({ length: 9 }, (_, i) => <SVGLoader key={i} />)}
        {jobs.map(
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
      <div className="">
        <p>pagination goes here</p>
      </div>
    </div>
  );
}
