"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { format } from "date-fns";
import { createApplication, JobApplication } from "@/app/lib/db/applications";

interface CreateApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (application: JobApplication) => void;
  userId?: string;
}

export function CreateApplicationModal({
  isOpen,
  onClose,
  onCreate,
  userId,
}: CreateApplicationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    link: "",
    applied_date: format(new Date(), "yyyy-MM-dd"),
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.title || !formData.company) {
        setError("Title and Company are required");
        setIsLoading(false);
        return;
      }

      const application = await createApplication({
        user_id: userId || null,
        title: formData.title,
        company: formData.company,
        link: formData.link,
        applied_date: formData.applied_date,
        notes: formData.notes,
      });

      onCreate(application);
      setFormData({
        title: "",
        company: "",
        link: "",
        applied_date: format(new Date(), "yyyy-MM-dd"),
        notes: "",
      });
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create application",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg overflow-y-auto rounded-[28px] bg-white shadow-card">
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
                      New application
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                      Add application details
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-2xl p-2 text-gray-500 transition hover:bg-gray-100"
                  >
                    <X size={24} />
                  </button>
                </div>

                {error && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Job title *</span>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Product Designer"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        required
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Company *</span>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corp"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Applied date</span>
                      <input
                        type="date"
                        name="applied_date"
                        value={formData.applied_date}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                      />
                    </label>
                    <label className="space-y-2 text-sm font-medium text-gray-700">
                      <span>Job link</span>
                      <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)]"
                      />
                    </label>
                  </div>

                  <label className="space-y-2 text-sm font-medium text-gray-700">
                    <span>Notes</span>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Add any notes about this application..."
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-softer outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(18,151,217,0.18)] resize-none"
                    />
                  </label>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-blue-700 disabled:bg-blue-400"
                    >
                      <Plus size={18} />
                      Add application
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading}
                      className="flex-1 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 disabled:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
