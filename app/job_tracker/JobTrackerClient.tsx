"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Application } from "./columns";
import { DataTable } from "./data-table";
import { ApplicationSidebar } from "./ApplicationSidebar";
import { CreateApplicationModal } from "./CreateApplicationModal";
import { WeeklyStats } from "./WeeklyStats";
import { JobApplication } from "@/app/lib/db/applications";

interface JobTrackerClientProps {
  columns: ColumnDef<Application>[];
  initialData: Application[];
}

export function JobTrackerClient({
  columns,
  initialData,
}: JobTrackerClientProps) {
  const [applications, setApplications] = useState<Application[]>(initialData);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleRowClick = (app: Application) => {
    setSelectedApplication(app);
    setSidebarOpen(true);
  };

  const handleSaveApplication = (updated: JobApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updated.id ? updated : app)),
    );
    setSelectedApplication(updated);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  };

  const handleCreateApplication = (newApp: JobApplication) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Job Applications Tracker
        </h1>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition flex items-center gap-2"
        >
          <Plus size={20} />
          Add Application
        </button>
      </div>

      {/* Weekly Stats */}
      <WeeklyStats applications={applications} />

      {/* Applications Table */}
      <DataTable
        columns={columns}
        data={applications}
        onRowClick={handleRowClick}
      />

      {/* Application Details Sidebar */}
      <ApplicationSidebar
        application={selectedApplication}
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
          setSelectedApplication(null);
        }}
        onSave={handleSaveApplication}
        onDelete={handleDeleteApplication}
      />

      {/* Create Application Modal */}
      <CreateApplicationModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateApplication}
      />
    </div>
  );
}
