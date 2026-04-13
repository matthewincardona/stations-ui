import Filter from "./components/Filter";
import JobsList from "./components/JobsList";

export default function Home() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-16 space-y-16">
      <section className="rounded-4xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-card p-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-2 text-sm font-medium text-cyan-900 shadow-softer">
              Your next opportunity starts here
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight bg-gradient-to-r from-blue-900 to-cyan-900 bg-clip-text text-transparent sm:text-5xl">
                Find your next entry-level job or internship with confidence.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700">
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

      <section className="rounded-3xl border-2 border-transparent bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 shadow-soft overflow-hidden">
        <div className="bg-gradient-to-r from-purple-100/50 to-pink-100/50 p-8 border-b border-purple-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent">
                Job search
              </h2>
              <p className="mt-2 text-sm text-purple-700">
                Filter open roles by title, experience level, and location.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Filter />
          </div>
        </div>

        <div className="p-8 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
          <JobsList />
        </div>
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
