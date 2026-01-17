import { ChevronDown, MapPin } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  date_posted: string;
  location: string;
  workType: string;
  jobUrl: string; // fallback
  job_url_direct?: string; // preferred
  skills: string;
  summary: string;
  expanded: boolean;
  onToggle: () => void;
}

export default function JobCard({
  id,
  title,
  company,
  date_posted,
  location,
  workType,
  jobUrl,
  job_url_direct,
  skills,
  summary,
  expanded,
  onToggle,
}: JobCardProps) {
  const formattedSkills = Array.isArray(skills) ? skills.join(", ") : skills;

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
      rounded-3xl bg-[#fbfbfb] border-gray-200 border
      transition-all duration-200 ease-out
      hover:shadow-lg hover:border-[#FB7D0E]
    "
    >
      <button
        onClick={onToggle}
        className="cursor-pointer p-8 w-full text-left flex gap-4 justify-between items-start"
      >
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-[#4A5565] text-base truncate">{company}</p>

          <div className="flex text-sm gap-4">
            <p>{date_posted}</p>
            <span className="flex gap-1.5 items-center">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <motion.div
        style={{ overflow: "hidden" }}
        animate={{
          height: expanded ? contentRef.current?.scrollHeight : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <motion.div
          ref={contentRef}
          initial={false}
          animate={expanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-8 pt-0 text-gray-700 leading-relaxed space-y-1"
        >
          {summary && (
            <div>
              <p>
                <strong>Quick Overview</strong>
              </p>
              <p>{summary}</p>
            </div>
          )}

          {formattedSkills && (
            <p className="mt-4">Looking for skills in {formattedSkills}</p>
          )}

          <a
            href={jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto mt-8 text-white block bg-[#4166e0] w-fit py-2 px-4 rounded-lg"
          >
            Apply Now
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
