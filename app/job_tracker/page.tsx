import Navbar from "@/app/components/Navbar";
import { columns } from "./columns";
import { fetchApplications } from "@/app/lib/db/applications";
import { JobTrackerClient } from "@/app/job_tracker/JobTrackerClient";

async function getApplications() {
  try {
    const applications = await fetchApplications();
    return applications;
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return [];
  }
}

export default async function JobTrackerPage() {
  const initialData = await getApplications();

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <JobTrackerClient columns={columns} initialData={initialData} />
      </div>
    </>
  );
}
