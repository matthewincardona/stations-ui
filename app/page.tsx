import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-3 mt-20">
        <h1 className="text-center text-4xl font-semibold mb-5">
          Find your next <span className="text-[#4C73F2]">entry-level</span> job
          or
          <span className="text-[#c9acac] hover:text-[#4C73F2] cursor-pointer">
            {" "}
            internship
          </span>
        </h1>
        <Filter />
        <div className="mt-12">
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
