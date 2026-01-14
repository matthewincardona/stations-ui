import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  date_posted: string;
  location: string;
  workType: string;
  jobUrl: string;
}

export default function JobCard({
  id,
  title,
  company,
  date_posted,
  location,
  workType,
  jobUrl,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`} className="block">
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          rounded-3xl bg-[#fbfbfb] border-gray-200 border
          transition-all duration-200 ease-out
          hover:shadow-lg hover:border-[#FB7D0E]
          p-8 h-46 flex flex-col justify-between
        "
      >
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <h3 className="font-semibold text-xl leading-snug line-clamp-2">
              {title}
            </h3>

            {/* Company */}
            <p className="text-[#4A5565] text-base truncate">{company}</p>
          </div>

          {/* Posted time badge */}
          <p className="text-sm">{date_posted}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex gap-1.5 items-center rounded-full bg-gray-100 py-2 px-3">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </span>

          <span className="flex gap-1.5 items-center rounded-full bg-gray-100 py-2 px-3">
            <Briefcase className="w-3.5 h-3.5" />
            {workType}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
