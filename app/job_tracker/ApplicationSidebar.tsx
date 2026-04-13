"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!isOpen) {
      setIsEditing(false);
      setFormData(application);
    }
  }, [isOpen, application]);

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-lg"
          >
            <div className="p-8 space-y-8">
              <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-900">
                    {isEditing ? "Edit Application" : "Application Details"}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    View or update anything about this application.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-3xl border border-gray-200 bg-gray-50 p-3 text-gray-600 transition hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>

              {error && (
                <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <div className="space-y-8">
                <section className="rounded-[28px] border border-gray-200 bg-gray-50 p-6 shadow-soft">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Job Information
                    </h3>
                  </div>
                  <div className="space-y-5">
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Job title</span>
                      {isEditing && formData ? (
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        />
                      ) : (
                        <p className="text-gray-900 text-base font-medium">
                          {application.title}
                        </p>
                      )}
                    </label>

                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Company</span>
                      {isEditing && formData ? (
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        />
                      ) : (
                        <p className="text-gray-900 text-base font-medium">
                          {application.company}
                        </p>
                      )}
                    </label>
                  </div>
                </section>

                <section className="rounded-[28px] border border-blue-100 bg-blue-50 p-6 shadow-soft">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Application Details
                    </h3>
                  </div>
                  <div className="space-y-5">
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Applied date</span>
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
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        />
                      ) : (
                        <p className="text-gray-900 text-base">
                          {format(
                            new Date(application.applied_date),
                            "EEEE, MMMM dd, yyyy",
                          )}
                        </p>
                      )}
                    </label>

                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Job link</span>
                      {isEditing && formData ? (
                        <input
                          type="url"
                          name="link"
                          value={formData.link}
                          onChange={handleInputChange}
                          placeholder="https://..."
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        />
                      ) : (
                        <a
                          href={application.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-700"
                        >
                          {application.link || "No link provided"}
                        </a>
                      )}
                    </label>
                  </div>
                </section>

                <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-6 shadow-soft">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Notes
                    </h3>
                  </div>
                  {isEditing && formData ? (
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)] resize-none"
                      placeholder="Add any notes about this application..."
                    />
                  ) : (
                    <div className="min-h-[160px] space-y-3 text-gray-900">
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
                                className="list-disc list-inside text-gray-900 ml-4"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal list-inside text-gray-900 ml-4"
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
                        <span className="text-gray-500 italic">
                          No notes yet.
                        </span>
                      )}
                    </div>
                  )}
                </section>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t sm:flex-row">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-green-700 disabled:bg-green-400"
                    >
                      <Save size={18} />
                      Save changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                      className="flex-1 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleOpenEdit}
                      className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-red-400"
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
