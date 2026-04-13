"use client";

import { columns } from "./columns";
import { JobTrackerClient } from "@/app/job_tracker/JobTrackerClient";
import { CloudBackupBanner } from "./CloudBackupBanner";
import { useAuth } from "@/app/lib/auth-context";

export default function JobTrackerPage() {
  const { user } = useAuth();

  return (
    <main className="container mx-auto max-w-6xl px-6 py-10">
      <CloudBackupBanner />
      <div className="rounded-[30px] border border-gray-200 bg-white p-8 shadow-card">
        <JobTrackerClient columns={columns} userId={user?.id} />
      </div>
    </main>
  );
}
