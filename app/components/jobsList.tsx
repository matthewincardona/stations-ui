import JobCard from "./jobCard";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Data Systems",
    location: "New York, NY",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
];

export default function JobsList() {
  return (
    <div className="mt-8 bg-[#F5F5F5] p-8 max-w-7xl m-auto rounded-xl">
      <h1>Jobs List</h1>
      <div>
        {dummyJobs.map(
          ({ id, title, company, postedTime, location, workType }) => (
            <JobCard
              key={id}
              title={title}
              company={company}
              postedTime={postedTime}
              location={location}
              workType={workType}
            />
          )
        )}
      </div>
    </div>
  );
}
