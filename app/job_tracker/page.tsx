import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchApplications } from "@/app/lib/db/applications";
import { JobTrackerClient } from "./JobTrackerClient";

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
    <div className="container mx-auto py-10">
      <JobTrackerClient columns={columns} initialData={initialData} />
    </div>
  );
}
