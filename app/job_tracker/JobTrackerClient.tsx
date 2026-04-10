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

  // Update display when applications change
  useEffect(() => {
    setDisplayApplications(applications);
  }, [applications]);

  // Sync to cloud when userId becomes available (user logged in)
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
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sync Status Messages */}
      {syncError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          {syncError}
        </div>
      )}

      {isLocalOnly && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg">
          <p className="text-sm">
            <strong>Local Mode:</strong> Your applications are saved locally.
            Sign up to sync them to the cloud.
          </p>
        </div>
      )}

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
      <WeeklyStats applications={displayApplications} />

      {/* Applications Table */}
      <DataTable
        columns={columns}
        data={displayApplications}
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
        userId={userId}
      />
    </div>
  );
}
