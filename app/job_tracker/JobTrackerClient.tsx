"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { Application } from "./columns";
import { DataTable } from "./data-table";
import { ApplicationSidebar } from "./ApplicationSidebar";
import { CreateApplicationModal } from "./CreateApplicationModal";
import { WeeklyStats } from "./WeeklyStats";
import { JobApplication } from "@/app/lib/db/applications";
import { useApplications } from "@/app/lib/use-applications";

interface JobTrackerClientProps {
  columns: ColumnDef<Application>[];
  userId?: string;
}

export function JobTrackerClient({ columns, userId }: JobTrackerClientProps) {
  const { applications, loading, isLocalOnly, saveApplications, syncToCloud } =
    useApplications(userId);
  const [displayApplications, setDisplayApplications] =
    useState<Application[]>(applications);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    setDisplayApplications(applications);
  }, [applications]);

  useEffect(() => {
    const handleSync = async () => {
      if (userId && isLocalOnly && applications.length > 0) {
        try {
          setSyncError(null);
          const synced = await syncToCloud(userId);
          if (synced) {
            setDisplayApplications(synced);
          }
        } catch (err) {
          setSyncError(
            err instanceof Error
              ? err.message
              : "Failed to sync to cloud. Your work is still saved locally.",
          );
        }
      }
    };

    handleSync();
  }, [userId, isLocalOnly, applications.length, syncToCloud]);

  const handleRowClick = (app: Application) => {
    setSelectedApplication(app);
    setSidebarOpen(true);
  };

  const handleSaveApplication = (updated: Application) => {
    const newApps = displayApplications.map((app) =>
      app.id === updated.id ? updated : app,
    );
    setDisplayApplications(newApps as Application[]);
    saveApplications(newApps);
    setSelectedApplication(updated);
  };

  const handleDeleteApplication = (id: string) => {
    const newApps = displayApplications.filter((app) => app.id !== id);
    setDisplayApplications(newApps);
    saveApplications(newApps);
  };

  const handleCreateApplication = (newApp: JobApplication | Application) => {
    const newApps = [newApp as Application, ...displayApplications];
    setDisplayApplications(newApps);
    saveApplications(newApps as Application[]);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 rounded-3xl bg-gradient-to-r from-blue-200 to-cyan-200 animate-pulse" />
        <div className="h-64 rounded-3xl bg-gradient-to-r from-indigo-200 to-teal-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {syncError && (
        <div className="rounded-3xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-sm text-yellow-800">
          {syncError}
        </div>
      )}

      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
              Application dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent">
              Job Applications Tracker
            </h1>
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:from-blue-700 hover:to-cyan-700"
          >
            <Plus size={18} />
            Add Application
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-soft">
        <WeeklyStats applications={displayApplications} />
      </section>

      <section className="rounded-3xl border border-gray-200 p-6 shadow-soft">
        <DataTable
          columns={columns}
          data={displayApplications}
          onRowClick={handleRowClick}
        />
      </section>

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

      <CreateApplicationModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateApplication}
        userId={userId}
      />
    </div>
  );
}
