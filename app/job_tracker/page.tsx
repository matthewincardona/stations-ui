"use client";

import { columns } from "./columns";
import { JobTrackerClient } from "@/app/job_tracker/JobTrackerClient";
import { CloudBackupBanner } from "./CloudBackupBanner";
import { useAuth } from "@/app/lib/auth-context";

export default function JobTrackerPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10">
      <CloudBackupBanner />
      <JobTrackerClient columns={columns} userId={user?.id} />
    </div>
  );
}
