import { Building2 } from "lucide-react";

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
    <div className="bg-white p-6 rounded-xl flex gap-6 flex-col">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-semibold ">{title}</p>
          <div className="flex gap-2 mt-2">
            <Building2 className="text-[#4A5565]" />
            <p className="text-[#4A5565]">{company}</p>
          </div>
        </div>
        <p>{postedTime}</p>
      </div>
      <div className="">
        <span className="">{location}</span>
        <span>{workType}</span>
      </div>
    </div>
  );
}
