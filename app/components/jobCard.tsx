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
}

export default function JobCard({
  title,
  company,
  postedTime,
  location,
  workType,
}: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl flex gap-8 justify-between flex-col">
      <div>
        <span className="line-clamp-2">
          <p className="text-xl font-semibold ">{title}</p>
        </span>

        <span className="flex gap-2 mt-2">
          <Building2 className="text-[#4A5565]" />
          <p className="text-[#4A5565] text-base">{company}</p>
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="flex gap-2 items-center rounded-full border-[#ccc9c9] border py-1 px-4">
          <MapPin className="w-4" />
          {location}
        </span>
        <span className="flex gap-2 items-center rounded-full border-[#ccc9c9] border py-1 px-4">
          <Briefcase className="w-4" />
          {workType}
        </span>
        <span className="flex gap-2 items-center rounded-full border-[#ccc9c9] border py-1 px-4">
          <Clock className="w-4" />
          {postedTime}
        </span>
      </div>
    </div>
  );
}
