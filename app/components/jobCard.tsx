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
    <div className="bg-white">
      <div className="flex justify-between">
        <div>
          <p className="text-xl font-semibold ">{title}</p>
          <div>
            <Building2 />
            <p>{company}</p>
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
