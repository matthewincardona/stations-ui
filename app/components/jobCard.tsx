import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  postedTime: string;
  location: string;
  workType: string;
  jobUrl: string;
}

export default function JobCard({
  id,
  title,
  company,
  postedTime,
  location,
  workType,
  jobUrl,
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          bg-white rounded-2xl border border-[#E5E5E5]
          transition-all duration-200 ease-out
          hover:shadow-lg hover:border-[#4C73F2]
          hover:-translate-y-0.5
          p-5 h-full flex flex-col justify-between
        "
      >
        {/* Posted time badge */}
        <div className="mb-3">
          <span className="inline-block text-[0.7rem] text-[#4C73F2] bg-[#e9eeff] font-medium px-2 py-0.5 rounded-full">
            {postedTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[1.15rem] leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Company */}
        <div className="flex items-center gap-2 mt-2">
          <Building2 className="text-[#4A5565] w-4 h-4" />
          <p className="text-[#4A5565] text-sm truncate">{company}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4 text-xs">
          <span className="flex gap-1.5 items-center rounded-full bg-[#F7F7F7] border border-[#DDD] py-1 px-2">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </span>

          <span className="flex gap-1.5 items-center rounded-full bg-[#F7F7F7] border border-[#DDD] py-1 px-2">
            <Briefcase className="w-3.5 h-3.5" />
            {workType}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
