import { Triangle } from "lucide-react";

export default function Filter() {
  return (
    <div className="max-w-400 mx-auto mt-10 flex items-center justify-between">
      <div className="flex gap-3">
        <div className="flex gap-2">
          <p className="text-xl m-auto">Help me find jobs for</p>
          <span className="flex gap-2 rounded-full bg-[#4C73F2] text-white px-4 py-1.5">
            <p className="text-base">UX Design</p>
            <Triangle className="rotate-180 w-4" />
          </span>
        </div>
        <div className="flex gap-2">
          <p className="text-xl m-auto">in beautiful</p>
          <span className="flex gap-2 rounded-full bg-[#4C73F2] text-white px-4 py-1.5">
            <p className="text-base">New York City</p>
            <Triangle className="rotate-180 w-4" />
          </span>
        </div>
      </div>
      <div>12 jobs found</div>
    </div>
  );
}
