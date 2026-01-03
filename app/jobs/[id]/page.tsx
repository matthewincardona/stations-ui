"use client";

import JobDetail from "../../components/JobDetail";
import { useParams, useRouter } from "next/navigation";

export default function JobPage() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        className="mb-6 py-2 px-5 bg-[#F5F5F5] rounded-full"
        onClick={() => router.back()}
      >
        Back
      </button>

      <JobDetail id={id as string} />
    </div>
  );
}
