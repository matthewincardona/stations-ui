"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Save } from "lucide-react";
import { format } from "date-fns";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
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
            className="fixed inset-0 bg-black/50 z-40 min-h-screen"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-50 overflow-y-auto shadow-lg"
          >
            <div className="p-8 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {isEditing ? "Edit Application" : "Application Details"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Job Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Information
                </h3>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    {isEditing && formData ? (
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {application.title}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    {isEditing && formData ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {application.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Application Details
                </h3>
                <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {/* Applied Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {format(
                          new Date(application.applied_date),
                          "EEEE, MMMM dd, yyyy",
                        )}
                      </p>
                    )}
                  </div>

                  {/* Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Link
                    </label>
                    {isEditing && formData ? (
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        placeholder="https://..."
                      />
                    ) : (
                      <a
                        href={application.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all font-medium"
                      >
                        {application.link || "No link"}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  {isEditing && formData ? (
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-sm font-mono"
                      placeholder="Add any notes about this application... (supports markdown!)"
                    />
                  ) : (
                    <div className="min-h-32 text-gray-900 space-y-2">
                      {application.notes ? (
                        <Markdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                          rehypePlugins={[rehypeRaw]}
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-2xl font-bold mt-4 mb-2 text-gray-900"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-xl font-bold mt-4 mb-2 text-gray-900"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-lg font-bold mt-4 mb-2 text-gray-900"
                                {...props}
                              />
                            ),
                            h4: ({ node, ...props }) => (
                              <h4
                                className="text-base font-bold mt-3 mb-1 text-gray-900"
                                {...props}
                              />
                            ),
                            h5: ({ node, ...props }) => (
                              <h5
                                className="font-bold mt-3 mb-1 text-gray-900"
                                {...props}
                              />
                            ),
                            h6: ({ node, ...props }) => (
                              <h6
                                className="font-bold mt-3 mb-1 text-gray-700"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                className="text-gray-900 leading-relaxed"
                                {...props}
                              />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-bold text-gray-900"
                                {...props}
                              />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                className="text-blue-600 underline hover:text-blue-700"
                                target="_blank"
                                rel="noopener noreferrer"
                                {...props}
                              />
                            ),
                            code: ({ node, className, children, ...props }) =>
                              !className ? (
                                <code
                                  className="bg-gray-200 px-2 py-0.5 rounded text-sm font-mono text-gray-800"
                                  {...props}
                                >
                                  {children}
                                </code>
                              ) : (
                                <code
                                  className="bg-gray-200 px-2 py-1 rounded text-sm font-mono text-gray-800 block overflow-x-auto my-2"
                                  {...props}
                                >
                                  {children}
                                </code>
                              ),
                            pre: ({ node, ...props }) => (
                              <pre
                                className="bg-gray-200 p-3 rounded overflow-x-auto my-2"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc list-inside text-gray-900 ml-2"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal list-inside text-gray-900 ml-2"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="text-gray-900" {...props} />
                            ),
                            blockquote: ({ node, ...props }) => (
                              <blockquote
                                className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-2"
                                {...props}
                              />
                            ),
                            table: ({ node, ...props }) => (
                              <table
                                className="border-collapse border border-gray-300 my-2 w-full"
                                {...props}
                              />
                            ),
                            th: ({ node, ...props }) => (
                              <th
                                className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold text-gray-900"
                                {...props}
                              />
                            ),
                            td: ({ node, ...props }) => (
                              <td
                                className="border border-gray-300 px-3 py-2 text-gray-900"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {application.notes}
                        </Markdown>
                      ) : (
                        <span className="text-gray-400 italic">No notes</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 py-3 px-4 rounded-lg font-semibold transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleOpenEdit}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
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
