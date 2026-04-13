import { ChevronDown, MapPin, Code } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  date_posted: string;
  location: string;
  workType: string;
  jobUrl: string;
  job_url_direct?: string;
  skills: string;
  summary: string;
  expanded: boolean;
  onToggle: () => void;
}

export default function JobCard({
  title,
  company,
  date_posted,
  location,
  workType,
  jobUrl,
  skills,
  summary,
  expanded,
  onToggle,
}: JobCardProps) {
  const formattedSkills = Array.isArray(skills) ? skills.join(", ") : skills;
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card transition hover:shadow-hover focus-within:ring-2 focus-within:ring-blue-200"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-6 text-left"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 text-sm">
              {workType ? (
                <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-900">
                  {workType}
                </span>
              ) : null}
              <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                {location}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 leading-snug line-clamp-2">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{company}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{date_posted}</span>
            <ChevronDown
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      <motion.div
        style={{ overflow: "hidden" }}
        animate={{
          height: expanded ? contentRef.current?.scrollHeight : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          ref={contentRef}
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="border-t border-gray-100 bg-gray-50 px-6 py-5 text-gray-700"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">
                Quick Overview
              </p>
              <p className="text-sm leading-relaxed text-gray-600">
                {summary || "No overview available yet."}
              </p>
            </div>
            {formattedSkills ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Code className="h-4 w-4 text-cyan-500" />
                <p>Looking for skills in {formattedSkills}</p>
              </div>
            ) : null}
            <a
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-orange-600"
            >
              Apply Now
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
