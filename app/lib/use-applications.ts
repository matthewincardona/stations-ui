import { useEffect, useState } from "react";
import { Application } from "../job_tracker/columns";
import {
  fetchApplications,
  syncLocalApplicationsToCloud,
  JobApplication,
} from "./db/applications";

const LOCAL_STORAGE_KEY = "job_tracker_applications";

export function useApplications(userId?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLocalOnly, setIsLocalOnly] = useState(!userId);

  // Load applications (from cloud if authenticated, from local storage if not)
  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userId) {
          // Load from cloud
          const cloudApps = await fetchApplications(userId);
          setApplications(cloudApps);
          setIsLocalOnly(false);
          // Optionally, also update local storage as a backup
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloudApps));
        } else {
          // Load from local storage
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            setApplications(JSON.parse(stored));
          }
          setIsLocalOnly(true);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load applications",
        );
        // Fall back to local storage on error
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [userId]);

  // Save applications to appropriate storage
  const saveApplications = (newApps: Application[]) => {
    setApplications(newApps);

    if (userId) {
      // Update cloud storage would happen via the API functions
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newApps));
    } else {
      // Save to local storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newApps));
    }
  };

  // Sync local applications to cloud when user logs in
  const syncToCloud = async (userId: string) => {
    try {
      // Only sync if there are local apps and no cloud apps yet
      const cloudApps = await fetchApplications(userId);

      if (cloudApps.length === 0 && applications.length > 0) {
        // Sync local apps to cloud
        const synced = await syncLocalApplicationsToCloud(
          userId,
          applications.map(
            (app): JobApplication => ({ ...app, user_id: userId }),
          ),
        );
        setApplications(synced);
        setIsLocalOnly(false);
        return synced;
      } else if (cloudApps.length > 0) {
        // Use cloud apps instead
        setApplications(cloudApps);
        setIsLocalOnly(false);
        return cloudApps;
      }
    } catch (err) {
      console.error("Failed to sync to cloud:", err);
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    isLocalOnly,
    saveApplications,
    syncToCloud,
  };
}
