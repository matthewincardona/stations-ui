import Filter from "./components/Filter";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-10 space-y-10">
      <section className="rounded-4xl border border-gray-200 bg-white shadow-card p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-900 shadow-softer">
              Your next opportunity starts here
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Find your next entry-level job or internship with confidence.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
                Swipe through thoughtfully curated roles, filter by title,
                level, and location, and keep your application progress
                organized in one friendly place.
              </p>
            </div>
          </div>
          <div>
            <img src="/assets/hero.svg" alt="" />
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-gray-200 bg-gray-50 p-6 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Job search</h2>
            <p className="mt-1 text-sm text-gray-600">
              Filter open roles by title, experience level, and location.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Filter />
        </div>
      </section>

      <section className="space-y-6">
        <JobsList />
      </section>

      <a
        href="https://forms.gle/pSUDzXGWXQimAgce6"
        className="fixed right-6 bottom-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-cyan shadow-soft transition hover:bg-orange-600"
        target="_blank"
        rel="noreferrer"
      >
        Feedback
      </a>
    </main>
  );
}
