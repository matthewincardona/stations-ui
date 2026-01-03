import { Building2 } from "lucide-react";
import { MapPin } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Clock } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  postedTime: string;
  location: string;
  workType: string;
  jobUrl: string;
}

export default function JobCard({
  title,
  company,
  postedTime,
  location,
  workType,
  jobUrl,
}: JobCardProps) {
  return (
    <div className="bg-white rounded-xl hover:border-[#4C73F2] transition duration-200 ease-in-out border border-[#00000000]">
      <a href={jobUrl} target="_blank">
        <div className="p-4 h-full flex gap-4 justify-between flex-col">
          <div>
            <span className="flex mb-2 w-full text-xs">{postedTime}</span>

            <span className="line-clamp-1">
              <p className="text-lg font-semibold">{title}</p>
            </span>

            <span className="flex items-center gap-2 mt-1">
              <Building2 className="text-[#4A5565]" />
              <p className="text-[#4A5565] text-sm">{company}</p>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex gap-2 items-center rounded-full border-[#ccc9c9] border py-1 px-2">
              <MapPin className="w-4" />
              {location}
            </span>
            <span className="flex gap-2 items-center rounded-full border-[#ccc9c9] border py-1 px-2">
              <Briefcase className="w-4" />
              {workType}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
