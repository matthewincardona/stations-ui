import Navbar from "./components/navbar";
import JobsList from "./components/jobsList";

export default function Home() {
  return (
    <div className="p-3">
      <Navbar />
      <JobsList />
    </div>
  );
}
