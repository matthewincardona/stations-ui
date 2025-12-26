import JobCard from "./jobCard";

const dummyJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Boston, MA",
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
  {
    id: 4,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 6,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
  {
    id: 7,
    title: "Product Manager",
    company: "Innovate Inc",
    location: "San Francisco, CA",
    postedTime: "24 hours ago",
    workType: "Remote",
  },
];

export default function JobsList() {
  return (
    <div className="mt-8 bg-[#F5F5F5] p-8 max-w-400 m-auto rounded-xl">
      <h1 className="mb-4">Jobs List</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:grid-rows-3 gap-4">
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
      <div className="">
        <p>pagination goes here</p>
      </div>
    </div>
  );
}
