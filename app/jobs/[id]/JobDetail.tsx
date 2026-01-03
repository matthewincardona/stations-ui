import { getJobById } from "../../lib/db/getJobById";
import { motion } from "framer-motion";

export default async function JobDetail({ id }: { id: string }) {
  const job = await getJobById(id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <article className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-[#1E1E1E] prose-p:text-[#2C2C2C] prose-p:leading-[1.7] prose-li:leading-[1.7]">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{job.title}</h1>
          <p className="text-xl text-gray-700 mt-2">{job.company_name}</p>

          <div className="mt-4 text-gray-600 text-sm space-y-1">
            <p>{job.location}</p>
            <p>{job.job_type}</p>
            <p>Posted {job.posted_at}</p>
          </div>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
          <p className="whitespace-pre-wrap text-[1.1rem] leading-[1.75] tracking-wide text-[#333]">
            {job.description_md}
          </p>
        </section>

        {job.job_url && (
          <a
            href={job.job_url}
            target="_blank"
            className="inline-block mt-12 bg-[#4C73F2] text-white py-3 px-10 rounded-full text-lg hover:opacity-90 transition"
          >
            Apply Now
          </a>
        )}
      </article>
    </motion.div>
  );
}
