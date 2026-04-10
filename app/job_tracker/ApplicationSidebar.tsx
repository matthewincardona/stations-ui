"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Save } from "lucide-react";
import { format } from "date-fns";
import { Application } from "./columns";
import {
  updateApplication,
  deleteApplication,
} from "@/app/lib/db/applications";

interface ApplicationSidebarProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: Application) => void;
  onDelete: (id: string) => void;
}

export function ApplicationSidebar({
  application,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: ApplicationSidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenEdit = () => {
    if (application) {
      setFormData(application);
      setIsEditing(true);
      setError(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    setIsLoading(true);
    setError(null);

    try {
      const updated = await updateApplication(formData.id, {
        title: formData.title,
        company: formData.company,
        link: formData.link,
        applied_date: formData.applied_date,
        notes: formData.notes,
      });
      onSave(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!application || !confirm("Are you sure you want to delete this entry?"))
      return;

    setIsLoading(true);
    setError(null);

    try {
      await deleteApplication(application.id);
      onDelete(application.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && application && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white z-50 overflow-y-auto shadow-lg"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {isEditing ? "Edit Application" : "Application Details"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-md transition"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Fields */}
              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  {isEditing && formData ? (
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{application.title}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  {isEditing && formData ? (
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{application.company}</p>
                  )}
                </div>

                {/* Applied Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Applied Date
                  </label>
                  {isEditing && formData ? (
                    <input
                      type="date"
                      name="applied_date"
                      value={formData.applied_date.split("T")[0]}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          applied_date: new Date(e.target.value)
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {format(
                        new Date(application.applied_date),
                        "MMM dd, yyyy",
                      )}
                    </p>
                  )}
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Link
                  </label>
                  {isEditing && formData ? (
                    <input
                      type="url"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..."
                    />
                  ) : (
                    <a
                      href={application.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {application.link || "No link"}
                    </a>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  {isEditing && formData ? (
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Add any notes about this application..."
                    />
                  ) : (
                    <p className="text-gray-900 break-words whitespace-pre-wrap">
                      {application.notes || "No notes"}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md font-medium transition flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 py-2 px-4 rounded-md font-medium transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleOpenEdit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-4 rounded-md font-medium transition flex items-center justify-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
