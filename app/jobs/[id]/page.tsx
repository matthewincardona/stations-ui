"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import JobDetailSkeleton from "@/app/components/JobDetailSkeleton";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

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

function JobDetailContent() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchJob(id as string);
  }, [id]);

  async function fetchJob(jobId: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (error) {
      setError("Could not load this job");
      setLoading(false);
      return;
    }

    setJob(data);
    setLoading(false);
  }

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
      <div className="max-w-3xl m-auto bg-white p-10 rounded-3xl mt-10 shadow-lg border border-[#EAEAEA]">
        <button
          className="mb-8 py-2 px-5 bg-[#F5F5F5] rounded-full hover:bg-[#E8E8E8] transition"
          onClick={() => router.back()}
        >
          Back
        </button>

        <h1 className="text-4xl font-semibold leading-tight mb-2 text-[#222]">
          {job.title}
        </h1>

        <p className="text-xl text-gray-700 mb-6">{job.company_name}</p>

        <div className="flex flex-col gap-1 text-gray-600 text-sm mb-10">
          <p>{job.location}</p>
          <p>{job.job_type}</p>
          <p>Posted: {job.posted_at}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-medium mb-4 text-[#333]">
            Job Description
          </h2>
          <p className="whitespace-pre-wrap leading-relaxed text-[1.05rem] text-gray-800 tracking-wide">
            {job.description_md}
          </p>
        </div>

        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            className="inline-block mt-12 bg-[#4C73F2] text-white py-3 px-10 rounded-full text-lg hover:opacity-90 transition"
          >
            Apply Now
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function JobDetailPage() {
  return (
    <Suspense>
      <JobDetailContent />
    </Suspense>
  );
}
