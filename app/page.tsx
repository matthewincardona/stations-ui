import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-3 mt-12">
        <h1 className="text-center font-semibold">
          Find your next entry-level job or internship
        </h1>
        <Filter />
        <div className="mt-10">
          <JobsList />
        </div>
      </div>
      <a
        href="https://forms.gle/pSUDzXGWXQimAgce6"
        className="text-white py-2 px-4 rounded-sm bg-[#4166e0] hover:opacity-80 transition-all absolute bottom-10 right-10"
        target="_blank"
      >
        Feedback
      </a>
    </div>
  );
}
