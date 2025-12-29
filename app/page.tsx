import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <div className="p-3">
      <Navbar />
      <Filter />
      <JobsList />
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
