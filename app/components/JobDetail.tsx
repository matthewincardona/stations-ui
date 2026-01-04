"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getJobById } from "../lib/db/getJobById";
import JobDetailSkeleton from "@/app/components/JobDetailSkeleton";
import Markdown from "react-markdown";

interface Job {
  id: string;
  title: string;
  company_name: string;
  location: string;
  posted_at: string;
  job_type: string;
  job_url: string;
  description_md: string;
}

export default function JobDetail({ id }: { id: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getJobById(id);
        setJob(data);
      } catch {
        setError("Could not load this job");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <JobDetailSkeleton />;
  if (error || !job)
    return (
      <p className="text-center mt-10 text-red-600 text-lg">
        {error || "Job not found"}
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="m-auto bg-white p-10 max-h-180 overflow-y-auto">
        <div className="flex lg:flex-row md:flex-col items-start justify-between lg:gap-12 md:gap-0 md:mb-8">
          <div className="flex flex-col">
            <h1 className="text-wrap text-4xl font-semibold mb-2">
              {job.title}
            </h1>
            <p className="text-xl text-gray-700 mb-6">{job.company_name}</p>
          </div>
          <a
            href={job.job_url}
            target="_blank"
            className="text-nowrap text-center w-50 bg-[#FB7D0E] text-white py-3 px-10 rounded-full text-base hover:opacity-90 transition"
          >
            Apply Now
          </a>
        </div>
        <div className="flex flex-col gap-1 text-gray-600 text-sm mb-10">
          <p>{job.location}</p>
          <p>{job.job_type}</p>
          <p>Posted: {job.posted_at}</p>
        </div>

        <div>
          <h2 className="text-2xl font-medium mb-4">Job Description</h2>
          <Markdown>{job.description_md}</Markdown>
        </div>

        {/* <div className="absolute top-full left-[75%] -translate-y-24 flex justify-center h-12 w-48 inset-0 bg-[#FB7D0E] text-white py-3 px-10 rounded-full text-lg hover:opacity-90 transition">
          <a href={job.job_url} target="_blank" className="">
            Apply Now
          </a>
        </div> */}
      </div>
    </motion.div>
  );
}
